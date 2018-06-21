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
    this._engine._phase = Phase.NONE;
  }


  draw() {

    this._context.strokeStyle = "#000000";
    this._context.fillStyle = "#5c2e14";
    this._context.lineWidth = 1;
    this._round_rect(0, 0, this._canvas.width, this._canvas.height, 17, true, true);

    this._draw_grid();
    this._draw_hud();
    this._get_Intersection();
    this._draw_all_pieces();
  }

  get_move() {

    if(this._manager._engine._phase === Phase.ARCHITECT) {
      return (new Move(this._selectedX,this._selectedY ,this._manager._engine._architects[this._engine._selectedArchitect]));
    }
    if(this._manager._engine._phase === Phase.BUILDING){
      console.log("COLOR IN GET MOVE"+this._manager._engine.current_color());
      return (new Move(this._selectedX,this._selectedY ,new Building(this._manager._engine.current_color(),this._manager._engine._selectedBuildingType,new Coordinates(this._selectedX,this._selectedY ))));
    }
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
    this._canvas.addEventListener("click", (e) => { let pos = this._get_click_position(e); if(pos.x >= 0 && pos.x < 9 && pos.y >= 0 && pos.y < 9);this._get_Intersection();this._on_click(pos.x, pos.y); });

    this._deltaX = (this._canvas.width * 0.95 - 40 ) / 9;
    this._deltaY = (this._canvas.height * 0.95 - 40) / 9;
    this._offsetX = this._canvas.width / 2 - this._deltaX * 4.5 ;
    this._offsetY = this._canvas.height / 2 - this._deltaY * 4.5 ;

    this.test();
    this.draw();
  }

  _on_click(x,y) {

    if (this.color() === this._manager._engine.current_color()){
        if (x === -1 && y === 0) {
          this._manager._engine._phase = Phase.BUILDING;
          this._manager._engine._selectedBuildingType = BuildingType.HOUSE;
          this.draw();
        }
        if (x === -1 && y === 1) {
          this._manager._engine._phase = Phase.BUILDING;
          this._manager._engine._selectedBuildingType = BuildingType.PALACE;
          this.draw();
        }
        if (x === -1 && y === 2) {
          this._manager._engine._phase = Phase.BUILDING;
          this._manager._engine._selectedBuildingType = BuildingType.TOWER;
          this.draw();
        }
        switch (this._manager._engine._phase) {
          case Phase.NONE:
            if (!this.moved) {
              for (let i = 0; i < this._manager._engine._architects.length; i++) {
                if (x == this._manager._engine._architects[i]._coord.x() && y == this._manager._engine._architects[i]._coord.y()) {
                  this._manager._engine._phase = Phase.ARCHITECT;
                  this._manager._engine._selectedArchitect = i;
                  this._get_Intersection();
                  this.moved = true;
                }
              }
            }
              break;
          case Phase.BUILDING:
            let interList = this._manager._engine.get_possible_move_list();
            for (let i = 0; i < interList.length; i++) {
              if (interList[i]._coord.x() == x && interList[i]._coord.y() == y)
              {
                this._selectedX = x;
                this._selectedY = y;
                this.moved = false;
                this._manager.play();
                this._color=this._manager._engine.current_color();
              }
            }
            break;
            case Phase.ARCHITECT:
            let liste_intersection = this._manager._engine.get_possible_move_list();

            for (let i = 0; i < liste_intersection.length; i++) {
              if (liste_intersection[i]._coord.x() == x && liste_intersection[i]._coord.y() == y) {
                this._selectedX = x;
                this._selectedY = y;
                this._manager._engine.textBoard();
                this.moved = true;
                this._manager.play();
                this.draw();
              }
            }
            break;
        }
        this.draw();
    }
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
    return y*55.722222 + 4.28125 + 55.722222;
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
    this._context.beginPath();
    this._draw_house(new Building(this._engine.current_color(),BuildingType.HOUSE, new Coordinates(-1, 0)),1);
    this._draw_palace(new Building(this._engine.current_color(),BuildingType.HOUSE, new Coordinates(-1, 1)),1);
    this._draw_tower(new Building(this._engine.current_color(),BuildingType.HOUSE, new Coordinates(-1, 2)),1);
  }

  _draw_architecte(x,y)
  {
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
  _draw_house(piece,coeff)
  {
    let x = this.xIndex(piece.coord().x());
    let y = this.yIndex(piece.coord().y());
    if(coeff != undefined)
      x = x+12.5;
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
    this._context.moveTo(x-10,y+15);
    this._context.lineTo(x-10,y);
    this._context.lineTo(x,y-10);
    this._context.lineTo(x+10,y);
    this._context.lineTo(x+10,y+15);
    this._context.lineTo(x-10,y+15);
    this._context.fill();
    this._context.stroke();
  }

  _draw_palace(piece,coeff)
  {
    let x = this.xIndex(piece.coord().x());
    let y = this.yIndex(piece.coord().y());
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
      if(coeff != undefined)
          x = x+12.5;
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

  _draw_tower(piece,coeff)
  {
    let x = this.xIndex(piece.coord().x());
    let y = this.yIndex(piece.coord().y());
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
      if(coeff != undefined)
          x = x+12.5;
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

  _get_click_position(e)
  {
    let rect = this._canvas.getBoundingClientRect();
    let x = (e.clientX - rect.left) * this._scaleX - this._offsetX;
    let y = (e.clientY - rect.top) * this._scaleY - this._offsetY;
    x = this.indexX(x);
    y = this.indexY(y);
    return { x,y };
  }

}



export default {
  Gui: Gui
};