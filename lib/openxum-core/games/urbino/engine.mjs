"use strict";

import OpenXum from '../../openxum/engine.mjs';
import Manager from './manager.mjs';
import Architect from './architect.mjs';

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
        this.initGame();

        this.nbArchitects = 2;
        this._architects = [];

        this._manager = new Manager();
        // Manager.getInstance();
        this.textBoard();

        this.playGame();
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
                str += this._board[this.getIndex(i, j)] + " ";
            }
            str += "\n";
        }
        console.log(str);
    }

    // Return the index from the array
    getIndex(i, j){
        return this.width*i+j;
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