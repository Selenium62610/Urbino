// lib/openxum-browser/games/lyngk/manager.mjs
import OpenXum from '../../openxum/manager.mjs';
import Urbino from '../../../openxum-core/games/urbino/index.mjs';
// ...

class Manager extends OpenXum.Manager {
    constructor(e, g, o, s) {
        super(e, g, o, s);
        this.that(this);
    }

    build_move() {
        // Retourne l'implémentation d'un mouvement par défaut du jeu
        return new Urbino.Move();
    }

    get_current_color() {
        // Retourne la couleur du joueur courant
        return this.engine().current_color() === Urbino.Color.WHITE ? 'White' : 'Black';
    }

    static get_name() {
        // Retourne le nom du jeu
        return 'urbino';
    }

    get_winner_color() {
        // Retourne sous forme d'une chaîne de caractères la couleur du vainqueur
        return this.engine().winner_is() === Urbino.Color.WHITE ? 'White' : 'Black';
    }

    process_move() {
        // À implémenter si le manager doit gérer des éléments annexes des coups
        // Par défaut, laisser vide
    }
}

export default {
    Manager: Manager
};