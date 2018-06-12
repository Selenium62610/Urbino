"use strict";

import OpenXum from '../../openxum/gui.mjs';
import Urbino from '../../../openxum-core/games/urbino/index.mjs';

//Public method
draw() {
        this._compute_deltas();
        this._context.lineWidth = 1;

        // background
        this._context.strokeStyle = "#000000";
        this._context.fillStyle = "#ffffff";
        this._round_rect(0, 0, this._canvas.width, this._canvas.height, 17, true, true);

        this._draw_grid(); // Dessiner le tableau
        this._draw_coordinates(); // Coordonnées du tableau
        this._draw_state(); // Pièces
        this._draw_stack(); // Pile de l'intersection
        this._draw_claimed_colors(); // Couleurs réclamé par le joueur
        this._draw_possible_moves(); // Dessiner les mouvement possibles
    }
    
    // Définition des constantes pour le plateau
const begin_letter = ['C', 'E', 'G', 'G', 'H', 'H', 'C', 'H', 'G'];
const end_letter =   ['C', 'B', 'A', 'B', 'B', 'C', 'I', 'E', 'G'];

const begin_number = [3, 2, 1, 2, 2, 3, 3, 5, 7];
const end_number =   [3, 5, 7, 7, 8, 8, 9, 8, 7];

const begin_diagonal_letter = ['B', 'A', 'B', 'B', 'C', 'C', 'E'];
const begin_diagonal_number = [ 5,   3,   3,   2,   2,   1,   2,];

const end_diagonal_letter =   ['E', 'G', 'G', 'H', 'H', 'I', 'H'];
const end_diagonal_number =   [8,    9,   8,   8,   7,   7,   5];

// ...

_draw_grid() {
        let _pt_begin;
        let _pt_end;

        this._context.lineWidth = 1;
        this._context.strokeStyle = "#000000";
        this._context.fillStyle = "#ffffff";

        // #1 first step
        for (let l = 'A'.charCodeAt(0); l < 'J'.charCodeAt(0); ++l) {
            let index = l - 'A'.charCodeAt(0);

            _pt_begin = this._compute_coordinates(l, begin_number[index]);
            _pt_end = this._compute_coordinates(l, end_number[index]);

            this._context.moveTo(_pt_begin[0], _pt_begin[1]);
            this._context.lineTo(_pt_end[0], _pt_end[1]);
        }

        // #2 second step
        for (let n = 1; n < 9; ++n) {
            _pt_begin = this._compute_coordinates(begin_letter[n - 1].charCodeAt(0), n);
            _pt_end = this._compute_coordinates(end_letter[n - 1].charCodeAt(0), n);

            this._context.moveTo(_pt_begin[0], _pt_begin[1]);
            this._context.lineTo(_pt_end[0], _pt_end[1]);
        }

        // #3 third step
        for (let i = 0; i < 7; ++i) {
            _pt_begin = this._compute_coordinates(begin_diagonal_letter[i].charCodeAt(0),
                begin_diagonal_number[i]);
            _pt_end = this._compute_coordinates(end_diagonal_letter[i].charCodeAt(0),
                end_diagonal_number[i]);

            this._context.moveTo(_pt_begin[0], _pt_begin[1]);
            this._context.lineTo(_pt_end[0], _pt_end[1]);
        }
        this._context.stroke();
    }

export default {
  Gui: Gui
};
