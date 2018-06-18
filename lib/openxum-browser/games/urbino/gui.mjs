// lib/openxum-browser/games/urbino/gui.mjs
import OpenXum from '../../openxum/gui.mjs';
import Urbino from '../../../openxum-core/games/urbino/index.mjs'
import Architecte from '../../../openxum-core/games/urbino/architect.mjs'
import BuildingType from '../../../openxum-core/games/urbino/buildingType.mjs'
import Building from '../../../openxum-core/games/urbino/building.mjs'
import Coordinates from '../../../openxum-core/games/urbino/coordinates.mjs'
import Color from '../../../openxum-core/games/urbino/color.mjs'
import Phase from '../../../openxum-core/games/urbino/phase.mjs'
// ...



class Gui extends OpenXum.Gui {
    constructor(c, e, l, g) {
        super(c, e, l, g);
        this._deltaX = 0;
        this._deltaY = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        console.log(this._engine);

        this.moved = false;
        this._architects = [];

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

        this._engine._board[this._engine.getIndex(1,6 )] = new Building(Color.BLACK,BuildingType.HOUSE, new Coordinates(1, 6));
        let ar1 = new Architecte(new Coordinates(3,6));
        this._engine._board[this._engine.getIndex(3, 6)] = ar1;
        this._engine._architects[0] = ar1;
        let ar2 = new Architecte(new Coordinates(0,0));
        this._engine._board[this._engine.getIndex(8, 0)] = ar2;
        this._engine._architects[1] = ar2;
        this._engine.textBoard();


        //console.log(this._get_Intersection());
        this._choix_pion();
        this._get_Intersection();
        this._draw_all_pieces();
    }

    //Parcourir le tableau d'engine pour récupérer les coordonnées des pions

    get_move() {
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
        this._canvas.addEventListener("click", (e) => { let pos = this._get_click_position(e); if(pos.x >= 0 && pos.x < 11 && pos.y >= 0 && pos.y < 11); console.log(pos); this._on_click(pos.x, pos.y); });

        this._deltaX = (this._canvas.width * 0.95 - 40 ) / 9;
        this._deltaY = (this._canvas.height * 0.95 - 40) / 9;
        this._offsetX = this._canvas.width / 2 - this._deltaX * 4.5 ;
        this._offsetY = this._canvas.height / 2 - this._deltaY * 4.5 ;

        this.draw();
    }

    _choix_pion(){
        console.log('Sa mère la pute');
        this._draw_piece( new Building(Color.BLACK,BuildingType.HOUSE, new Coordinates(-1, 0)));
        this._draw_piece( new Building(Color.BLACK,BuildingType.PALACE, new Coordinates(-1, 1)));
        this._draw_piece( new Building(Color.BLACK,BuildingType.TOWER, new Coordinates(-1, 2)));

    }

    _on_click(x, y) {

           /* if (this._engine._phase == Phase.BUILDING) {

                if (!this.moved)
                {
                   // if (this._engine._board[x][y] !== this._architects &&) {

                        this._engine._phase = Phase.ARCHITECT;
                       // console.log(this._get_Intersection());
                       // console.log("C'est un architecte")

                   // }
                }
                else
                {
                    //On place le batiment
                    let possiblelist = this._engine.get_possible_move_list();
                    if(this._engine._manager.enoughPiece(this._engine.selectedBuildingType,this._engine.color))
                         this._engine.move(new Move(x,y,new Building(this._engine.color,this._engine.selectedBuildingType,x,y)));


                }


            }

            if(this._engine._phase == Phase.ARCHITECT){


            }*/

           if(x === -1 && y === 0)
           {

               this._draw_piece(new Building(Color.BLACK,BuildingType.HOUSE, new Coordinates(3, 3)));
           }
           
            if(x === -1 && y === 1)
            {
                 this._draw_piece(new Building(Color.BLACK,BuildingType.PALACE, new Coordinates(3, 3)));
            }

            if(x === -1 && y === 2)
            {
            this._draw_piece(new Building(Color.BLACK,BuildingType.TOWER, new Coordinates(3, 3)));
            }







           /* else {
                if (this._selected_piece !== undefined && this._engine._verify_moving(this._selected_piece, x, y)) {
                    this._move = new Move(this._selected_piece.clone(), new Coordinates(x, y));

                    //this._animate_move();
                }

                this.unselect();
            } */

            //this.draw();
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

        for(let i=0; i<9; ++i)
        {
            for(let j=0 ;j<9; j++)
            {
                if(this._engine._board[this._engine.getIndex(j, i)] !== 0)
                {
                    this._draw_piece(this._engine._board[this._engine.getIndex(j, i)]);
                    console.log("Maison");
                }

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

/*
    _draw_state() {
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                if (this._engine._board[x][y] !== undefined) {
                    let pt = this._compute_coordinates(x, y);
                    this._draw_piece(pt[0], pt[1], this._engine._board[x][y]);
                }
            }
        }

        if (this._selected_piece !== undefined) {
            this._draw_selected_piece();
        }
    }*/

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

        //Taille des traits
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
        let liste_view = this._engine.getIntersections();
        console.log("Inter : ");
        //console.log(this._engine._architects[0]);
        //console.log(this._engine._architects[1]);

        //console.log(this._engine._board);


        console.log("WO");
        this._engine.textBoardGivenCoordinates(liste_view);
        console.log(liste_view);

        for(let i=0; i<liste_view.length; i++)
        {
            console.log("Test numéro 2");
            console.log(liste_view[i].x());
            this._draw_point(liste_view[i]);
        }
    }

    _draw_point(liste)
    {
        console.log(liste.x());
        let x =this.xIndex(liste.x());
        let y =this.yIndex(liste.y());

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