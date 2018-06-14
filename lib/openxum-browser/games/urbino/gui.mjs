// lib/openxum-browser/games/urbino/gui.mjs
import OpenXum from '../../openxum/gui.mjs';
import Architecte from '../../../openxum-core/games/urbino/architect.mjs'
import Building from '../../../openxum-core/games/urbino/buildingType.mjs'
// ...

class Gui extends OpenXum.Gui {
    constructor(c, e, l, g) {
        super(c, e, l, g);
        this._deltaX = 0;
        this._deltaY = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        // Vos attributs...
    }




    draw() {
        // La méthode principale de la classe qui se charge de dessiner à l'écran
        // (le plateau, les pièces, les mouvements possibles, ...)

        // background
        this._context.strokeStyle = "#000000";
        this._context.fillStyle = "#4C3629";
        this._round_rect(0, 0, this._canvas.width, this._canvas.height, 17, true, true);

        this._draw_grid();
        console.log(this._canvas.width);
        console.log(this._canvas.height);
        this._draw_piece(117,228, Architecte);
        this._draw_piece(1,146, Architecte);

        // implémenter le reste du rendu ici
    }

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
        this._canvas.addEventListener("click", (e) => { let pos = this._get_click_position(e); if(pos.x >= 0 && pos.x < 9 && pos.y >= 0 && pos.y < 9) this._on_click(pos.x, pos.y); });

        this._deltaX = (this._canvas.width * 0.95 - 40 ) / 9;
        this._deltaY = (this._canvas.height * 0.95 - 40) / 9;
        this._offsetX = this._canvas.width / 2 - this._deltaX * 4.5 ;
        this._offsetY = this._canvas.height / 2 - this._deltaY * 4.5 ;

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
    }

    _draw_piece(x,y,piece)
    {

       let radius = (this._deltaX / 5); // Créer un rond de taille

        this._context.lineWidth = 1;
        this._context.beginPath();
        this._context.closePath();
        this._context.fill();
        this._context.stroke();

        if(piece == Architecte)
        {
            this._context.strokeStyle = "#2c29e6";
            this._context.fillStyle = "#3df541";


            this._context.moveTo( 51.81 , y);
            this._context.beginPath();
            this._context.arc(x, y-11, radius, 0.0, 2 * Math.PI);


            this._context.moveTo(x,y);
            this._context.lineTo(x - (radius -30), y + (radius * 2.2));
            this._context.lineTo(x + (radius -30), y + (radius * 2.2));
            this._context.lineTo(x,y);
            this._context.closePath();
            this._context.fill();
            this._context.stroke();

        }

        /*else
        {
            switch (piece.type()) {

                case HOUSE : break;
                case PALACE : break;
                case TOWER : break;
            }
        }*/


    }

    _get_click_position(e) {
        let rect = this._canvas.getBoundingClientRect();
        let x = (e.clientX - rect.left) * this._scaleX - this._offsetX;
        let y = (e.clientY - rect.top) * this._scaleY - this._offsetY;
        console.log(x);
        console.log(y);

        return { x: Math.floor(x / this._deltaX), y: Math.floor(y / this._deltaX) };
    }

   /* xIndex(x)
    {
        let indexX = x*51.81;
        return indexX;
    }

    yIndex(y)
    {
        let indexY = y*51.81;
        return indexY;
    }
    */
}



export default {
    Gui: Gui
};