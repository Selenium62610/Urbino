"use strict";

import OpenXum from '../../openxum/engine.mjs';
import Manager from './manager.mjs';
import Architect from './architect.mjs';
import Phase from './phase.mjs';
import Building from './building.mjs';
import BuildingType from './buildingType.mjs';
import Color from './color.mjs';
import Coordinates from './coordinates.mjs';


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

        this.initGame();

        this.tests();

        this._manager = new Manager();
        // Manager.getInstance();

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

    tests(){
        // tests
        let randX = Math.floor(Math.random() * 8);
        let randY = Math.floor(Math.random() * 8);
        this.placeArchitect(this._architects[0], randX, randY);

        randX = Math.floor(Math.random() * 8);
        randY = Math.floor(Math.random() * 8);
        this.placeArchitect(this._architects[1], randX, randY);

        for(let i = 0; i < 5; i++) {
            randX = Math.floor(Math.random() * 8);
            randY = Math.floor(Math.random() * 8);
            let type = (Math.floor(Math.random() * 3) == 1) ? BuildingType.HOUSE : (Math.floor(Math.random() * 2) == 1) ? BuildingType.PALACE : BuildingType.TOWER;
            if (this._board[this.getIndex(randX, randY)] == 0) {
                this._board[this.getIndex(randX, randY)] = new Building((Math.floor(Math.random() * 2 > 1) ? Color.BLACK : Color.WHITE), type, new Coordinates(randX, randY));
                console.log(this._board[this.getIndex(randX, randY)].to_string());
            } else {

            i--;
          }
        }

        this.textBoardGivenCoordinates(this.getIntersections());
        this._phase = Phase.BUILDING;
        this.get_possible_move_list();
    }

    // Display the board as text on the console.
    textBoard(){
        let str = "";
        for (let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++){
                if(this._board[this.getIndex(i, j)] instanceof Building)
                    str += this._board[this.getIndex(i, j)].as_text();
                else if(this._board[this.getIndex(i, j)] instanceof Architect)
                    str += this._board[this.getIndex(i, j)].as_text();
                else
                    str += "  "//this._board[this.getIndex(i, j)] + " ";
            }
            str += "\n";
        }
        console.log(str);
    }

    // Display the board with a - at the given coordinates (line views or intersections)
    textBoardGivenCoordinates(view){
        let str = "";
        //this._board[this.getIndex(2, 3)] = 1;
        for (let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++){
                if(this._board[this.getIndex(i, j)] instanceof Architect)
                    str += this._board[this.getIndex(i, j)].as_text();
                else if(this.isInView(view, i, j))
                    str += "- "
                else if(this._board[this.getIndex(i, j)] instanceof Building)
                    str += this._board[this.getIndex(i, j)].as_text();
                else
                    str += "  ";
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

    // Give the intersection points from two lists
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

    getIntersections(){
        let list = this._architects[0].lineView(this._board);
        let list2 = this._architects[1].lineView(this._board);

        //this.textBoardGivenCoordinates(list);
        //this.textBoardGivenCoordinates(list2);

        let listIntersections = this.intersection(list, list2);
        //this.textBoardGivenCoordinates(listIntersections);
        return listIntersections;
    }

    selectedArchitect(){

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

        switch(this._phase) {
            case Phase.NONE:




                break;

            case Phase.ARCHITECT:
                //list of all empty cells
                for(let i= 0; i < this.width; i++) {
                    for(let j = 0; j < this.height; j++) {
                        if (this._board[this.getIndex(i,j)] === 0) {
                            moves.moves.concat(new Move(x,i,Architect))
                        }
                    }
                }
                break;

            case Phase.BUILDING:
                //list of all valid cells to place a building for the current player

                for(const _item of this.getIntersections()){
                    //console.log("wawa");

                    //check on every item if it braek a district     
                    console.log("X:"+_item._x + " Y:"+_item._y);





                }

                break ;

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