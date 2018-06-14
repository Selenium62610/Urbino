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

        let X = this._coord.x();
        let Y = this._coord.y();

        // Top
        while(board[(X-1)*9+Y] === 0) {
            list.push(new Coordinates(X-1, Y));
            console.log("1");
            X--;
        }

        // Top-right
        X = this._coord.x();
        Y = this._coord.y();
        while(board[(X-1)*9+(Y+1)] === 0 && Y>0 && Y<8) {
            list.push(new Coordinates(X-1, Y+1));
            console.log("2");
            X--;
            Y++
        }

        // Right
        X = this._coord.x();
        Y = this._coord.y();
        while(board[X*9+(Y+1)] === 0 && Y>0 && Y<8) {
            list.push(new Coordinates(X, Y+1));
            console.log("3");
            Y++;
        }

        // Down-right
        X = this._coord.x();
        Y = this._coord.y();
        while(board[(X+1)*9+(Y+1)] === 0 && Y>0 && Y<8) {
            list.push(new Coordinates(X+1, Y+1));
            console.log("4");
            X++;
            Y++;

        }

        // Down
        X = this._coord.x();
        Y = this._coord.y();
        while(board[(X+1)*9+Y] === 0) {
            list.push(new Coordinates(X+1, Y));
            console.log("5");
            X++;
        }

        // Down-left
        X = this._coord.x();
        Y = this._coord.y();
        while(board[(X+1)*9+(Y-1)] === 0) {
            list.push(new Coordinates(X+1, Y-1));
            console.log("6");
            X++;
            Y--;
        }

        // Left
        X = this._coord.x();
        Y = this._coord.y();
        while(board[X*9+(Y-1)] === 0 && Y>0 && Y<8) {
            list.push(new Coordinates(X, Y-1));
            console.log("7");
            Y -= 1;
        }

        // Top-Left
        X = this._coord.x();
        Y = this._coord.y();
        while(board[(X-1)*9+(Y-1)] === 0) {
            list.push(new Coordinates(X-1, Y-1));
            console.log("8");
            X--;
            Y--;
        }



        return list;
    }

    to_string(){
        return "Architect at " + this._coord.to_string();
    }


}

export default Architect;