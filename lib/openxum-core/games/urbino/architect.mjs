"use strict";

import Coordinates from './coordinates.mjs';

class Architect {
    constructor(coord) {
        this._coord = coord;
    }

// public methods
    clone() {
        return new Architect(this._coord);
    }

    coord(){
        return this._coord;
    }

    to(x, y){
        this._x = x;
        this._y = y;
    }

    // Return every cells seen by the architect
    lineView(board){
        let list = [];
        let directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

        let X;
        let Y;

        for(let i = 0; i < directions.length; i++){
            X = this._coord.x()+directions[i][0];
            Y = this._coord.y()+directions[i][1];
            while(board[X*9+Y] === 0 && X >= 0 && X <= 8 && Y >= 0 && Y <= 8){
                list.push(new Coordinates(X, Y));
                X += directions[i][0];
                Y += directions[i][1];
            }
        }


        return list;
    }

    as_text(){
        return 'A ';
    }

    to_string(){
        return "Architect at " + this._coord.to_string();
    }


}

export default Architect;