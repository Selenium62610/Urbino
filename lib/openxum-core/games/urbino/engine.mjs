"use strict";

import OpenXum from '../../openxum/engine.mjs';
import Manager from './manager.mjs';
import Architect from './architect.mjs';
import Phase from './phase.mjs';
import BuildingType from './buildingType.mjs';
import Color from './color.mjs';


let _manager = new Manager();
class Engine extends OpenXum.Engine {
    constructor(t, c) {
        super();
        //
        this.nbDistrict = 0;
        this.nbBlock = 0;

        // Initialisation du plateau
        this.width = 9;
        this.height = 9;
        this._board= [];
        this.initGame();
        this._color = Color.BLACK;
        this.nbArchitects = 2;
        this._architects = [];
        this._phase= Phase.NONE;

        // Manager.getInstance();
        this.textBoard();

        //this.playGame();
    }

    initGame(){
        this.initBoard();
        this.initArchitects();
        console.log(_manager.map());
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager= new Manager(); // < = C'est un singleton maggle
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        _manager.removePiece(BuildingType.HOUSE,Color.BLACK);
        console.log(_manager.map());
        console.log(_manager.enoughPiece(BuildingType.HOUSE,Color.BLACK));
        //false=> no more black house

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
        console.log(this.to_string());
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
        return this._color;
    }

    next_color(color) {
        return color === Color.WHITE ? Color.BLACK : Color.WHITE;
    }

    get_name() {
        // Retourne le nom du jeu.
    }

    get_possible_move_list() {
        // Retourne la liste de tous les coups possibles
        // La liste retournée doit être un tableau d'objet Move.




            let moves = [];

        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                if (this._board[x][y] == 0 ) {
                    moves = moves.concat(this._get_possible_move_list(x,y));
                }
            }
        }
        return moves;







    }

    _get_possible_move_list(x,y){
        let moves = [];

        for(let i= 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++) {
                if (!(this._board[i][j] === 0) ) {
                    moves.moves.concat(new Move(x,i,i,j))
                }
            }
        }

        return moves;



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

        let str = "";
        //this._board[this.getIndex(2, 3)] = 1;
        for (let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++){
                str += this._board[this.getIndex(i, j)] + " ";
            }
            str += "\n";
        }

        return str;


    }

    winner_is() {
        // Indique le joueur qui a gagné.
    }



}

export default Engine;