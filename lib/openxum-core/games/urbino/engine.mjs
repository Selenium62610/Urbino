"use strict";

import OpenXum from '../../openxum/engine.mjs';
import Manager from './manager.mjs';
import Architect from './architect.mjs';
import Coordinates from './coordinates.mjs';

class Engine extends OpenXum.Engine {
    constructor(t, c) {
        super();
        //
        let nbDistrict = 0;
        let nbBlock = 0;

        // Initialisation du plateau
        this.width = 9;
        this.height = 9;
        this._board= [];

        this.nbArchitects = 2;
        this._architects = [];

        this.initGame();

        this.placeArchitect(this._architects[0], 3, 2);
        this.placeArchitect(this._architects[1], 8, 5);
        this._board[this.getIndex(3, 4)] = 2;
        this._board[this.getIndex(4, 3)] = 2;
        this._board[this.getIndex(1, 2)] = 2;
        this._board[this.getIndex(7, 8)] = 2;

        this._manager = new Manager();
        // Manager.getInstance();
        this.textBoard();


        let list = this._architects[0].lineView(this._board);
        let list2 = this._architects[1].lineView(this._board);

        this.textBoardWithLineView(list);
        this.textBoardWithLineView(list2);

        let listIntersections = this.intersection(list, list2);

        for(let i = 0; i < listIntersections.length; i++){
            console.log(listIntersections[i].to_string());
        }

        this.textBoardWithIntersections(listIntersections);

    }

    initGame(){
        this.initBoard();
        this.initArchitects();
    }

    // Initialize the board (every cell at 0 - empty)
    initBoard() {
        for (let i = 0; i < this.width*this.height; i++) {
            this._board.push(0);
        }
    }

    initArchitects(){
        for(let i = 0; i < this.nbArchitects; i++){
            this._architects.push(new Architect(new Coordinates(-1, -1)));
        }
    }

    // Display the board as text on the console.
    textBoard(){
        let str = "";
        //this._board[this.getIndex(2, 3)] = 1;
        for (let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++){
                if(this._board[this.getIndex(i, j)] instanceof Architect)
                    str += "a ";
                else
                  str += this._board[this.getIndex(i, j)] + " ";
            }
            str += "\n";
        }
        console.log(str);
    }

    // Display the board with - as line view
    textBoardWithLineView(view){
        let str = "";
        //this._board[this.getIndex(2, 3)] = 1;
        for (let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++){
                if(this._board[this.getIndex(i, j)] instanceof Architect)
                    str += "a ";
                else if(this.isInView(view, i, j))
                    str += "- "
                else if(this._board[this.getIndex(i, j)] != 0)
                    str += "2 ";
                else
                    str += "0 ";
            }
            str += "\n";
        }
        console.log(str);
    }

    textBoardWithIntersections(view){
        let str = "";
        //this._board[this.getIndex(2, 3)] = 1;
        for (let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++){
                if(this._board[this.getIndex(i, j)] instanceof Architect)
                    str += "a ";
                else if(this.isInView(view, i, j))
                    str += "- "
                else if(this._board[this.getIndex(i, j)] != 0)
                    str += "2 ";
                else
                    str += "0 ";
            }
            str += "\n";
        }
        console.log(str);
    }

    // Check if a cell in in line view
    isInView(view, x, y){
        for(let i = 0; i < view.length; i++){
            if(view[i].x() == x && view[i].y() == y)
                return true;
        }
        return false;
    }

    intersection(viewA, viewB){
        let list = [];
        for(let i = 0; i< viewA.length; i++){
            for(let j = 0; j < viewB.length; j++){
                if(viewA[i].x() == viewB[j].x() && viewA[i].y() == viewB[j].y()){
                    list.push(viewA[i]);
                }
            }
        }
        return list;
    }

    // Return the index from the array
    getIndex(i, j){
        return this.width*i+j;
    }

    placeArchitect(a, x, y){
        if(a instanceof Architect) {
            a._coord._x = x;
            a._coord._y = y;
            this._board[this.getIndex(x, y)] = a;
        }

    }

    apply_moves(moves) {
        // Permet d'appliquer une liste de coups.
        // Le paramètre moves contient un tableau d'objets Move.
    }

    clone() {
        // Permet de cloner le moteur de jeu.
        // Attention à bien dupliquer de tous les attributs.
    }

    current_color() {
        // Retourne le joueur en train de jouer.
    }

    get_name() {
        // Retourne le nom du jeu.
    }

    get_possible_move_list() {
        // Retourne la liste de tous les coups possibles
        // La liste retournée doit être un tableau d'objet Move.
    }

    is_finished() {
        // Retourne si la partie est terminée ou non.
    }

    move(move) {
        // Permet d'appliquer un coup et mets à jour l'état du jeu.
    }

    parse(str) {
        // Modifier l'état du jeu en fonction de l'état passé sous forme d'une
        // chaîne de caractères
    }

    to_string() {
        // Construit une représentation sous forme d'une chaîne de caractères
        // de l'état du jeu
    }

    winner_is() {
        // Indique le joueur qui a gagné.
    }



}

export default Engine;