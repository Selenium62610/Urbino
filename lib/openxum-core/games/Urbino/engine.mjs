"use strict";

import OpenXum from '../../openxum/engine.mjs';
import Manager from './manager.mjs';
import Architect from './architect.mjs';

class Engine extends OpenXum.Engine {
    constructor(t, c) {
        super();

        // Initialisation du plateau
        let width = 9;
        let height = 9;
        this._board[height][width];
        initBoard();

        let nbArchitects = 2;
        this._architects[nbArchitects];

        this._manager = new Manager();

    }

    // Initialize the board (every cell at 0 - empty)
    initBoard(){
        for(int i = 0; i < this._board.size * this._board[].size; i++){
            this._board = 0;
        }
    }

    // a is an architect from the array
    moveArchitect(a, x, y){
        a.move(x, y);
    }
}

export default Engine;