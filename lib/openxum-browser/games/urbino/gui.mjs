// lib/openxum-browser/games/urbino/gui.mjs
import OpenXum from '../../openxum/gui.mjs';
import Urbino from '../../../openxum-core/games/urbino/index.mjs'
import Architecte from '../../../openxum-core/games/urbino/architect.mjs'
import BuildingType from '../../../openxum-core/games/urbino/buildingType.mjs'
import Building from '../../../openxum-core/games/urbino/building.mjs'
import Coordinates from '../../../openxum-core/games/urbino/coordinates.mjs'
import Color from '../../../openxum-core/games/urbino/color.mjs'
import Phase from '../../../openxum-core/games/urbino/phase.mjs'
import Move from '../../../openxum-core/games/urbino/move.mjs'
// ...

class Gui extends OpenXum.Gui {
  constructor(c, e, l, g) {
    super(c, e, l, g);
    this._deltaX = 0;
    this._deltaY = 0;
    this._offsetX = 0;
    this._offsetY = 0;
    this._selectedX;
    this._selectedY;

    console.log('GUI');
    console.log(this._engine);

    this.moved = false;
    this._architects = [];



  }

  test(){
    this._engine._phase = Phase.ARCHITECT;
    this._engine._selectedArchitect = 0;

    this._engine.move(new Move(3, 1, this._engine._architects[this._engine._selectedArchitect]));

    this._engine._selectedArchitect = 1;
    this._engine.move(new Move(5, 5, this._engine._architects[this._engine._selectedArchitect]));

    this._engine._phase = Phase.ARCHITECT;
  }


  draw() {
    // La méthode principale de la classe qui se charge de dessiner à l'écran
    // (le plateau, les pièces, les mouvements possibles, ...)

    // background
    this._context.strokeStyle = "#000000";
    this._context.fillStyle = "#5c2e14";
    this._context.lineWidth = 1;
    this._round_rect(0, 0, this._canvas.width, this._canvas.height, 17, true, true);

    this._draw_grid();



    //this._engine.placeArchitect(this._engine._architects[0], 3, 1);
    //this._engine.placeArchitect(this._engine._architects[1], 5, 5);

    this._draw_hud();
    this._get_Intersection();
    this._draw_all_pieces();
  }

  get_move() {

    if(this._engine._phase === Phase.ARCHITECT) {


      return (new Move(this._selectedX,this._selectedY ,this._engine._architects[this._engine._selectedArchitect]));
    }
    if(this._engine._phase === Phase.BUILDING){

      return (new Move(this._selectedX,this._selectedY ,new Building(this._engine._color,this._engine._selectedBuildingType,new Coordinates(this._selectedX,this._selectedY ))));
    }

    // Retourne le mouvement à effectuer par le manager pour le tour actuel
    // Un objet de type Move doit être construit ; si ce n'est pas le cas,
    // alors la méthode process_move sera invoquée
  }

  is_animate() {
    // Retourne true si le coup provoque des animations
    // (déplacement de pions, par exemple).
    return false;
  }

  is_remote() {
    // Indique si un joueur joue à distance
    return false;
  }

  move(move, color) {
    this._manager.play();
    // TODO !!!!!
  }

  unselect() {
    // Remet à zéro tous les attributs relatifs au coup qui vient d'être joué
  }

  set_canvas(c) {
    super.set_canvas(c);
    this._canvas.addEventListener("click", (e) => { let pos = this._get_click_position(e); if(pos.x >= 0 && pos.x < 11 && pos.y >= 0 && pos.y < 11);this._get_Intersection();this._on_click(pos.x, pos.y); });

    this._deltaX = (this._canvas.width * 0.95 - 40 ) / 9;
    this._deltaY = (this._canvas.height * 0.95 - 40) / 9;
    this._offsetX = this._canvas.width / 2 - this._deltaX * 4.5 ;
    this._offsetY = this._canvas.height / 2 - this._deltaY * 4.5 ;

    this.test();
    this.draw();
  }

  _on_click(x,y)
  {
    console.log("PHASE " + this._engine._phase);
    if (x === -1 && y === 0) {
      console.log("house clicked ");
      this._engine._phase = Phase.BUILDING;
      //this._draw_piece(new Building(Color.BLACK,BuildingType.HOUSE, new Coordinates(3, 3)));
      this._engine._selectedBuildingType = BuildingType.HOUSE;
      this.draw();


    }

    if (x === -1 && y === 1) {
      console.log("palace clicked ");
      this._engine._phase = Phase.BUILDING;
      //this._draw_piece(new Building(Color.BLACK,BuildingType.PALACE, new Coordinates(3, 3)));
      this._engine._selectedBuildingType = BuildingType.PALACE;

      this.draw();


    }

    if (x === -1 && y === 2) {
      console.log("tower clicked ");
      this._engine._phase = Phase.BUILDING;
      this._engine._selectedBuildingType = BuildingType.TOWER;
      // this._engine.color = this._color;
      this.draw();

      //this._draw_piece(new Building(Color.BLACK,BuildingType.TOWER, new Coordinates(3, 3)));
    }


    switch (this._engine._phase)
    {
      case Phase.NONE:
        for(let i = 0; i< this._engine._architects.length; i++)
        {

          if(x == this._engine._architects[i]._coord.x() && y == this._engine._architects[i]._coord.y())
          {
            console.log("ARCHITECTTTTTTT");
            this._engine._phase = Phase.ARCHITECT;
            this._engine._selectedArchitect=i;
            this._get_Intersection();
          }
        }

        break;
      case Phase.BUILDING:
        /*if(!this.moved)
         {
        for(let i = 0; i< this._engine._architects.length; i++)
        {

          if(x == this._engine._architects[i]._coord.x() && y == this._engine._architects[i]._coord.y())
          {
            console.log("ARCHITECTTTTTTT");
            this._engine._phase = Phase.ARCHITECT;
            this._engine._selectedArchitect=i;
            this._get_Intersection();
          }
        }
         }*/

        let interList = this._engine.get_possible_move_list();
        console.log(interList);
        for (let i = 0; i < interList.length; i++) {
          if (interList[i]._coord.x() == x && interList[i]._coord.y() == y) {
            console.log("intersectionnnnnn");
            this._selectedX = x;
            this._selectedY = y;
            /*this.moved=false;*/
            this._manager.play();
          }

        }


        break;
      case Phase.ARCHITECT:
        let liste_intersection = this._engine.get_possible_move_list();
        //console.log("Vérification placement");

        //console.log(this._engine._architects[this._engine._selectedArchitect]);

        for (let i = 0; i < liste_intersection.length; i++) {
          if (liste_intersection[i]._coord.x() == x && liste_intersection[i]._coord.y() == y) {
            console.log("click dans une case possible dans la phase architect");

            this._selectedX = x;
            this._selectedY = y;
            console.log(this._selectedX +"||||||||||||||" + this._selectedY);

            this._engine.textBoard();
            this.moved = true;
            this._manager.play();
            this.draw();
          }
        }

        break;
    }
    this.draw();


  }



  _draw_grid() {

    let i, j;

    this._context.lineWidth = 1;
    this._context.strokeStyle = "#d9ff0f";
    this._context.fillStyle = "#bd9f52";

    for (i = 0; i < 9; ++i) {
      for (j = 0; j < 9; ++j) {
        this._context.beginPath();

        this._context.moveTo(this._offsetX + i * this._deltaX, this._offsetY + j * this._deltaY);
        this._context.lineTo(this._offsetX + (i + 1) * this._deltaX - 2, this._offsetY + j * this._deltaY);
        this._context.lineTo(this._offsetX + (i + 1) * this._deltaX - 2, this._offsetY + (j + 1) * this._deltaY - 2);
        this._context.lineTo(this._offsetX + i * this._deltaX, this._offsetY + (j + 1) * this._deltaY - 2);
        this._context.moveTo(this._offsetX + i * this._deltaX, this._offsetY + j * this._deltaY);

        this._context.closePath();

        this._context.fill();

      }
    }

  }

  _draw_all_pieces()
  {

    for(let i=0; i<this._engine._board.length; ++i)
    {
      if(this._engine._board[i] != 0)
      {
        this._draw_piece(this._engine._board[i]);
      }

    }

  }


  _round_rect(x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    this._context.beginPath();
    this._context.moveTo(x + radius, y);
    this._context.lineTo(x + width - radius, y);
    this._context.quadraticCurveTo(x + width, y, x + width, y + radius);
    this._context.lineTo(x + width, y + height - radius);
    this._context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this._context.lineTo(x + radius, y + height);
    this._context.quadraticCurveTo(x, y + height, x, y + height - radius);
    this._context.lineTo(x, y + radius);
    this._context.quadraticCurveTo(x, y, x + radius, y);
    this._context.closePath();
    if (stroke) {
      this._context.stroke();
    }
    if (fill) {
      this._context.fill();
    }
  }

  _compute_coordinates(x, y) {
    return [this._offsetX + x * this._deltaX + (this._deltaX / 2) - 1, this._offsetY + y * this._deltaY + (this._deltaY / 2) - 1];
  }


  xIndex(x) {

    return x * 55.722222 + 4.28125 + 55.722222;
  }

  yIndex(y)
  {
    return y*(55.722222) + 4.28125 + 55.722222;
  }

  indexX(x)
  {
    return Math.floor(x/55.722222) ;
  }

  indexY(y)
  {
    return Math.floor(y/55.722222) ;
  }

  _draw_piece(piece)
  {
    this._context.lineWidth = 1;

    this._context.beginPath();

    //En fonction du type de pièce envoyé on fera soit un pion joueur soit un batiment
    if(piece instanceof Architecte)
    {
      this._draw_architecte(piece.coord().x(),piece.coord().y());
    }
    if(piece instanceof Building)
    {
      switch (piece.type()) {

        case BuildingType.HOUSE : this._draw_house(piece); break;
        case BuildingType.PALACE : this._draw_palace(piece); break;
        case BuildingType.TOWER : this._draw_tower(piece);break;
      }
    }
  }

  _draw_hud()
  {
    this._context.lineWidth = 1;

    this._context.beginPath();
    this._draw_hud_house(-1,0);
    this._draw_hud_palace(-1,1);
    this._draw_hud_tower(-1,2);
  }

  //The differents drawing
  _draw_architecte(x,y)
  {
    //Couleur bizarre
    this._context.strokeStyle = "#3df541";
    this._context.fillStyle = "#3df541";

    let radius = (this._deltaX / 5);

    this._context.beginPath();
    x = this.xIndex(x);
    y = this.yIndex(y);
    this._context.arc(x, y-5, radius, 0.0, 2 * Math.PI);
    this._context.closePath();



    this._context.moveTo(x,y);
    this._context.lineTo(x - (radius -30), y + (radius * 2.2));
    this._context.lineTo(x + (radius -30), y + (radius * 2.2));
    this._context.lineTo(x,y);
    this._context.closePath();
    this._context.fill();
    this._context.stroke();
  }
  _draw_house(piece)
  {

    //Je modifie les valeurs de x et y pour les centrer dans les cases du plateau
    let x = this.xIndex(piece.coord().x());
    let y = this.yIndex(piece.coord().y());

    //Si je recois la couleur blanche alors je change la couleur du pion en noir à bord blanc et inversement
    if(piece.color() === Color.BLACK)
    {
      this._context.strokeStyle = "#ffffff";
      this._context.fillStyle = "#000000";
    }
    else
    {
      this._context.strokeStyle = "#000000";
      this._context.fillStyle = "#ffffff";
    }

    //Création d'un pion en forme de maison
    this._context.moveTo(x-10,y+15);

    this._context.lineTo(x-10,y);
    this._context.lineTo(x,y-10);
    this._context.lineTo(x+10,y);
    this._context.lineTo(x+10,y+15);
    this._context.lineTo(x-10,y+15);

    this._context.fill();
    this._context.stroke();
  }

  _draw_hud_house(x,y)
  {

    this._context.strokeStyle = "#2645f5";
    this._context.fillStyle = "#2645f5";

    x = this.xIndex(x);
    y = this.yIndex(y);

    this._context.moveTo(x+2.5,y+15);

    this._context.lineTo(x+2.5,y);
    this._context.lineTo(x+12.5,y-10);
    this._context.lineTo(x+22.5,y);
    this._context.lineTo(x+22.5,y+15);
    this._context.lineTo(x+2.5,y+15);

    this._context.fill();
    this._context.stroke();
  }

  _draw_palace(piece)
  {
    //Je modifie les valeurs de x et y pour les centrer dans les cases du plateau
    let x = this.xIndex(piece.coord().x());
    let y = this.yIndex(piece.coord().y());
    //Si je recois la couleur blanche alors je change la couleur du pion en noir à bord blanc et inversement
    if(piece.color() === Color.BLACK)
    {
      this._context.strokeStyle = "#ffffff";
      this._context.fillStyle = "#000000";
    }
    else
    {
      this._context.strokeStyle = "#000000";
      this._context.fillStyle = "#ffffff";
    }
    //Création d'un pion en forme de palace
    this._context.moveTo(x,y+15);
    this._context.lineTo(x-15,y+15);
    this._context.lineTo(x-15,y-15);
    this._context.lineTo(x-7.5,y-15);
    this._context.lineTo(x-7.5,y-5);
    this._context.lineTo(x+7.5,y-5);
    this._context.lineTo(x+7.5,y-15);
    this._context.lineTo(x+15,y-15);
    this._context.lineTo(x+15,y+15);
    this._context.lineTo(x,y+15);
    this._context.fill();
    this._context.stroke();
  }

  _draw_hud_palace(x,y)
  {
    this._context.strokeStyle = "#000000";
    this._context.fillStyle = "#ffffff";

    x = this.xIndex(x);
    y = this.yIndex(y);

    //Création d'un pion en forme de palace
    this._context.moveTo(x+10,y+15);
    this._context.lineTo(x,y+15);
    this._context.lineTo(x,y-15);
    this._context.lineTo(x+7.5,y-15);
    this._context.lineTo(x+7.5,y-5);
    this._context.lineTo(x+17.5,y-5);
    this._context.lineTo(x+17.5,y-15);
    this._context.lineTo(x+25,y-15);
    this._context.lineTo(x+25,y+15);
    this._context.lineTo(x+10,y+15);
    this._context.fill();
    this._context.stroke();
  }

  _draw_hud_tower(x,y)
  {
    this._context.strokeStyle = "#000000";
    this._context.fillStyle = "#ffffff";

    x = this.xIndex(x);
    y = this.yIndex(y);

    this._context.moveTo(x+2.5,y+15);
    this._context.lineTo(x+2.5,y-15);
    this._context.lineTo(x+12.5,y-35);
    this._context.lineTo(x+22.5,y-15);
    this._context.lineTo(x+22.5,y+15);
    this._context.lineTo(x+2.5,y+15);
    this._context.fill();
    this._context.stroke();

    this._context.fill();
    this._context.stroke();
  }

  _draw_tower(piece)
  {
    //Je modifie les valeurs de x et y pour les centrer dans les cases du plateau
    let x = this.xIndex(piece.coord().x());
    let y = this.yIndex(piece.coord().y());
    //Si je recois la couleur blanche alors je change la couleur du pion en noir à bord blanc et inversement
    if(piece.color() === Color.BLACK)
    {
      this._context.strokeStyle = "#ffffff";
      this._context.fillStyle = "#000000";
    }
    else
    {
      this._context.strokeStyle = "#000000";
      this._context.fillStyle = "#ffffff";
    }
    //Création d'un pion en forme de tour
    this._context.moveTo(x-10,y+15);
    this._context.lineTo(x-10,y-15);
    this._context.lineTo(x,y-35);
    this._context.lineTo(x+10,y-15);
    this._context.lineTo(x+10,y+15);
    this._context.lineTo(x-10,y+15);
    this._context.fill();
    this._context.stroke();
  }


  _get_Intersection()
  {
    let liste_view = this._engine.get_possible_move_list();

    for(let i=0; i<liste_view.length; i++)
    {
      //console.log(liste_view[i]);
      this._draw_point(liste_view[i]);
    }
  }

  _draw_point(liste)
  {
    let x =this.xIndex(liste._coord.x());
    let y =this.yIndex(liste._coord.y());

    this._context.strokeStyle = "#f5110f";
    this._context.fillStyle = "#f03";

    this._context.beginPath();

    this._context.moveTo(x,y+2.6);
    this._context.arc(x, y+2.6, 5.2, 0.0, 2 * Math.PI);
    this._context.fill();
    this._context.stroke();
    this._context.closePath();

  }

  _get_click_position(e) {
    let rect = this._canvas.getBoundingClientRect();
    let x = (e.clientX - rect.left) * this._scaleX - this._offsetX;
    let y = (e.clientY - rect.top) * this._scaleY - this._offsetY;
    x = this.indexX(x);
    y = this.indexY(y);
    console.log(x);
    console.log(y);

    return { x,y };
  }



}



export default {
  Gui: Gui
};