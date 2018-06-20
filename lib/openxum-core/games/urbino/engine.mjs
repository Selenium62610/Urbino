"use strict";

import OpenXum from '../../openxum/engine.mjs';
import Manager from './manager.mjs';
import Architect from './architect.mjs';
import Phase from './phase.mjs';
import Building from './building.mjs';
import BuildingType from './buildingType.mjs';
import Color from './color.mjs';
import Coordinates from './coordinates.mjs';
import Move from './move.mjs';


let _manager = new Manager();
class Engine extends OpenXum.Engine {
    constructor(t, c) {
        super();

        this.nbDistrict = 0;
        this.nbBlock = 0;

        // Initialisation du plateau
        this.width = 9;
        this.height = 9;
        this._board= [];
        this.initGame();

        this.nbArchitects = 2;
        this._architects = [];
        this._phase= Phase.BUILDING;
        this._selectedArchitect=0;
        this._selectedBuildingType=BuildingType.HOUSE;
        this.initGame();

       // this.tests();

        this._manager = new Manager();
        // Manager.getInstance();
        //this.flatGame();
        //this.playGame();
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

    tests(){
        this.placeArchitect(this._architects[0], 3, 1);
        this.textBoardGivenCoordinates(this._architects[0].lineView(this._board));
        this.placeArchitect(this._architects[1], 6, 6);
        this.textBoardGivenCoordinates(this._architects[1].lineView(this._board));


        this._phase=Phase.BUILDING;
        this.move(new Move(7,4,new Building(Color.WHITE,BuildingType.HOUSE,new Coordinates(7,4))));

        this.move(new Move(8,4,new Building(Color.BLACK,BuildingType.TOWER,new Coordinates(8,4))));

        this.move(new Move(2,8,new Building(Color.BLACK,BuildingType.TOWER,new Coordinates(2,8))));



        this._phase=Phase.BUILDING;
        this._color=Color.BLACK;
        this._selectedBuildingType = BuildingType.TOWER;

        // console.log("on est dans la type????");
        //console.log(this._selectedBuildingType);
        this.textBoard();
        console.log("test");
        console.log(this.get_possible_move_list());
        console.log("endtest");

        /*
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
         //console.log(this._board[this.getIndex(randX, randY)].to_string());
         } else {
         i--;
         }
         }
         this.textBoardGivenCoordinates(this.getIntersections());
         this._phase = Phase.ARCHITECT;*/
        //this.get_possible_move_list();
    }

    flatGame(){
        this._phase = Phase.ARCHITECT;
        console.log('Placer Architect 1');
        let moveslist = this.get_possible_move_list();
        console.log(moveslist[0]);
        this.move(moveslist[0]);



        // this.move(moveslist[1]);

        // this.move(this.get_possible_move_list()[0]);

        //  console.log(''+this.get_possible_move_list());


        //this.move(this.get_possible_move_list()[0]);
        this.textBoard();

        console.log('Placer Architect 2');
        this._selectedArchitect=1;
        moveslist = this.get_possible_move_list();
        this.move(moveslist[6]);
        this.textBoard();


        this._selectedArchitect = 0;
        moveslist = this.get_possible_move_list();
        this.move(moveslist[75]);
        this.textBoard();


        moveslist = this.get_possible_move_list();
        this.move(moveslist[76]);
        this.textBoard();


        console.log('Intersections : ');
        this.textBoardGivenCoordinates(this.getIntersections());

        this._phase = Phase.BUILDING;
        console.log('Placement de batiments');

        this.textBoardGivenCoordinates(this.getIntersections());

        moveslist = this.get_possible_move_list();
        this.move(moveslist[1]);
        this.textBoard();

        // console.log(""+this.get_possible_move_list());

        //this.move(this.get_possible_move_list()[0]);




    }


    // Display the board as text on the console.
    textBoard(){
        let str = "";
        for (let j = 0; j < this.width; j++) {
            for(let i = 0; i < this.height; i++){
                if(this._board[this.getIndex(i, j)] instanceof Building)
                    str += this._board[this.getIndex(i, j)].as_text();
                else if(this._board[this.getIndex(i, j)] instanceof Architect)
                    str += this._board[this.getIndex(i, j)].as_text();
                else
                    str += "  ";//this._board[this.getIndex(i, j)] + " ";
            }
            str += "\n";
        }
        console.log(str);
    }

    // Display the board with a - at the given coordinates (line views or intersections)
    textBoardGivenCoordinates(view){
        let str = "";
        //this._board[this.getIndex(2, 3)] = 1;
        for (let j = 0; j < this.width; j++) {
            for(let i = 0; i < this.height; i++){
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
    getIndex(i, j) {
        return this.width * i + j;
    }

    placeArchitect(a, x, y){
        if(a instanceof Architect && this._board[this.getIndex(x, y)] === 0) {
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
        return this._selectedArchitect;
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
                            moves.push(new Move(i,j,this._architects[this.selectedArchitect()]));

                            //console.log(i + " " + j);
                        }
                    }
                }
                //console.log(moves);
                break;

            case Phase.BUILDING:
                //list of all valid cells to place a building for the current player

                for(const _item of this.getIntersections()){
                    //console.log("wawa");

                    if(_manager.enoughPiece(this._selectedBuildingType, this._color)){

                        if(this.checkAllyNeighbor(_item._x,_item._y) && this.checkDistrictNeighbor(_item._x,_item._y) && this.checkAlliedDistrict(_item._x,_item._y)){
                            console.log("OK");
                            moves.push(new Move(_item._x,_item._y,new Building(this.current_color(),this._selectedBuildingType,new Coordinates(_item._x,_item._y))));
                        }
                    }
                    //check on every item if it braek a district
                    // console.log("X:"+_item._x + " Y:"+_item._y);

                    // moves.push();

                }

                break ;

        }

        return moves;


    }

    // Check if all cardinal neighbors are the same buildingtype and color as this one, except for houses.
    checkAllyNeighbor(x, y){
        if(this._selectedBuildingType == BuildingType.HOUSE){
            return true;
        }else{
            let top = this._board[this.getIndex(x-1, y)];
            let down = this._board[this.getIndex(x+1, y)];
            let right = this._board[this.getIndex(x, y+1)];
            let left = this._board[this.getIndex(x, y-1)];
            if(top instanceof Building ){
                if(top.color() == this._color && top.type() == this._selectedBuildingType){
                    return false;
                }
            }

            if(down instanceof Building ){
                if(down.color() == this._color && down.type() == this._selectedBuildingType){
                    return false;
                }
            }

            if(left instanceof Building ){
                if(left.color() == this._color && left.type() == this._selectedBuildingType){
                    return false;
                }
            }

            if(right instanceof Building ){
                if(right.color() == this._color && right.type() == this._selectedBuildingType){
                    return false;
                }
            }
        }
        return true;
    }

    // Check if there is more than one district
    checkDistrictNeighbor(x,y){
        let top = this._board[this.getIndex(x, y-1)];
        let down = this._board[this.getIndex(x, y+1)];
        let right = this._board[this.getIndex(x+1, y)];
        let left = this._board[this.getIndex(x-1, y)];
        /*
         let d = -1;
         if(top instanceof Building && top.idDistrict()>-1){
         d = top.idDistrict();
         }
         if(down instanceof Building && down.idDistrict()>-1 && down.idDistrict() != -1){
         return false;
         }
         */
        let set = new Set;
        let setBlock = new Set;
        console.log(x);
        console.log(y);



        if(top instanceof Building ){
            console.log(top);
            if(top.idDistrict()>=0){

                set.add(top.idDistrict());

            }

            if(top.idBlock()>= 0 && top.color()!=this.current_color()){
                setBlock.add(top.idBlock());

            }


        }


        if(down instanceof Building ){

            if(down.idDistrict()>=0) {
                set.add(down.idDistrict());
            }

            if(down.idBlock()>= 0 && down.color()!=this.current_color()){
                setBlock.add(down.idBlock());

            }


        }

        if(left instanceof Building ){
            if(left.idDistrict()>=0) {
                set.add(left.idDistrict());
            }
            /* if(left.idBlock()>= 0 && left.color()!=this.current_color()){
             setBlock.add(left.idBlock());
             }*/




        }

        if(right instanceof Building ){
            if(right.idDistrict()>=0) {
                set.add(right.idDistrict());
            }
            if(right.idBlock()>= 0 && right.color()!=this.current_color()){
                setBlock.add(right.idBlock());

            }

        }

        if(set.size<=1 && setBlock.size <=1)return true;

        return false;
    }


    checkAlliedDistrict(x,y){

        let top = this._board[this.getIndex(x-1, y)];
        let down = this._board[this.getIndex(x+1, y)];
        let right = this._board[this.getIndex(x, y+1)];
        let left = this._board[this.getIndex(x, y-1)];
        let test =true;

        if(top instanceof Building ){

            if(top.idDistrict()>=0 && top.color()===this.current_color()){
                test=true;


            }else{
                test=false;
            }
        }

        if(down instanceof Building ){
            if(down.idDistrict()>=0 && down.color()===this.current_color()) {
                test=true;
            }
            else{
                test=false;
            }
        }

        if(left instanceof Building ){
            if(left.idDistrict()>=0 && left.color()===this.current_color()) {
                test = true;
            } else{

                test = false;
            }

        }

        if(right instanceof Building ){
            if(right.idDistrict()>=0 && right.color()===this.current_color()) {
                test= true;
            }else{
                test=false;
            }
        }






        return test;
    }

    is_finished() {
        // Retourne si la partie est terminée ou non.
    }

    move(move) {
        // Permet d'appliquer un coup et mets à jour l'état du jeu.

        if (this._phase === Phase.ARCHITECT) {
            console.log("here : " + this._architects[this._selectedArchitect]._coord._x + " " + this._architects[this._selectedArchitect]._coord._y);
            console.log(this._board[this.getIndex(this._architects[this._selectedArchitect]._coord._x, this._architects[this._selectedArchitect]._coord._y)]);
            this._board[this.getIndex(this._architects[this._selectedArchitect]._coord._x, this._architects[this._selectedArchitect]._coord._y)] = 0;
            console.log(this._board[this.getIndex(this._architects[this._selectedArchitect]._coord._x, this._architects[this._selectedArchitect]._coord._y)]);

        }
        move._piece._coord._x = move._coord._x;
        move._piece._coord._y = move._coord._y;

        let x = move._piece._coord._x;
        let y = move._piece._coord._y;

        if(this._phase === Phase.BUILDING) {

            let tmpBlock =this.nbBlock;
            let tmpDistrict = this.nbDistrict;
            let top = this._board[this.getIndex(x-1, y)];
            let down = this._board[this.getIndex(x+1, y)];
            let right = this._board[this.getIndex(x, y+1)];
            let left = this._board[this.getIndex(x, y-1)];
            //down
            if(top instanceof Building ){

                if(top.idDistrict()<tmpDistrict/* && top.color()===this._color*/) {
                    tmpDistrict = top.idDistrict();

                }

                if(top.idBlock()<tmpBlock && top.color()===this.current_color()) {
                    tmpBlock= top.idBlock();
                    for (const item of Building){
                        if (item.idBlock()==top.idBlock()){
                            item._idBlock=tmpBlock;
                        }

                    }

                }

            }

            if(down instanceof Building ){
                if(down.idDistrict()<tmpDistrict && down.color()===this.current_color()) {
                    tmpDistrict = down.idDistrict();
                }

                if(down.idBlock()<tmpBlock && down.color()===this.current_color()) {
                    tmpBlock = down.idBlock();
                    for (const item of Building){
                        if (item.idBlock()===down.idBlock()){
                            item._idBlock=tmpBlock;
                        }

                    }
                }
            }

            if(left instanceof Building ){
                if(left.idDistrict()<tmpDistrict && left.color()===this.current_color()) {
                    tmpDistrict = left.idDistrict();
                }
                if(left._idBlock()<tmpBlock && left.color()===this._color) {
                    tmpBlock = left.idBlock();

                    for (const item of Building){
                        if (item._idBlock()===left._idBlock()){
                            item._idBlock=tmpBlock;
                        }

                    }
                }

            }

            if(right instanceof Building ){
                if(right.idDistrict()<tmpDistrict && right.color()===this.current_color()) {
                    tmpDistrict = right.idDistrict();
                }
                if(right.idBlock()<tmpBlock && right.color()===this._color) {
                    tmpBlock = right.idBlock();

                    for (const item of Building){
                        if (item._idBlock()==right.idBlock()){
                            item._idBlock=tmpBlock;
                        }
                    }
                }
            }

            move._piece._idBlock=tmpBlock;

            if (tmpBlock === this.nbBlock)
                this.nbBlock++;

            if (tmpDistrict != this.nbDistrict){
                move._piece._idDistrict= tmpDistrict;
                this.nbDistrict++;
            } // move._piece._idDistrict=tmpDistrict;

        }
        /* here we have to apply block and district
         */
        //this._board[this.getIndex(move._coord._x,move._coord._y)]= "J" ;
        this._board[this.getIndex(move._coord._x, move._coord._y)] = move._piece;
        this.textBoard();
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