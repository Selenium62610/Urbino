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
        this._board= [height][width];
        initBoard();

        let nbArchitects = 2;
        this._architects = [nbArchitects];

        this._manager = new Manager();

    }

    // Initialize the board (every cell at 0 - empty)
    initBoard() {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {

                this._board[i][j] = 0;
            }
        }
    }

}

export default Engine;