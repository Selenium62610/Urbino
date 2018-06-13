// lib/openxum-browser/games/urbino/gui.mjs
import OpenXum from '../../openxum/gui.mjs';
// ...

class Gui extends OpenXum.Gui {
    constructor(c, e, l, g) {
        super(c, e, l, g);

        // Vos attributs...
    }

    draw() {
        // La méthode principale de la classe qui se charge de dessiner à l'écran
        // (le plateau, les pièces, les mouvements possibles, ...)

        // background
        this._context.strokeStyle = "#000000";
        this._context.fillStyle = "#ffffff";
        this._round_rect(0, 0, this._canvas.width, this._canvas.height, 17, true, true);

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

        // Ajouts des événements
        // Par exemple, pour intercepter les clics de la souris
        this._canvas.addEventListener("click", (e) => {
            // ...
        });

        this.draw(); // Ne pas oublier de dessiner le plateau une première fois !
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


}

export default {
    Gui: Gui
};