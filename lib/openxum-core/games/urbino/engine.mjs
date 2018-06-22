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

    this.nbArchitects = 2;
    this._architects = [];
    this._phase= Phase.ARCHITECT;
    this._selectedArchitect=0;
    this._selectedBuildingType=BuildingType.HOUSE;
    this.initGame();
    this._color=Color.BLACK;

    // this.tests();

    this._manager = new Manager();
    this._manager.initMap();
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

  next_color() {
    console.log("nextColor");
    this._color = this.current_color()===Color.WHITE ? Color.BLACK : Color.WHITE;
  }

  get_name() {
    // Retourne le nom du jeu.
  }

  get_possible_move_list() {
    // Retourne la liste de tous les coups possibles
    // La liste retournée doit être un tableau d'objet Move.

    //console.log(this.getIntersections());


    let moves = [];

    switch(this._phase) {
      case Phase.NONE:




        break;

      case Phase.ARCHITECT:
        //list of all empty cells
        for(let i= 0; i < this.width; i++) {
          for(let j = 0; j < this.height; j++) {
            if (this._board[this.getIndex(i,j)] === 0) {
              moves.push(new Move(i,j,this._architects[this._selectedArchitect]));

              //console.log(i + " " + j);
            }
          }
        }
        //console.log(moves);
        break;

      case Phase.BUILDING:
        //list of all valid cells to place a building for the current player

        for(const _item of this.getIntersections()){

          if(this._manager.enoughPiece(this._selectedBuildingType, this.current_color())){
            //console.log("Item :");
            //console.log(_item);
            if(this.CheckSameAlly(this.getAdjacent(_item)) && this.CheckMultipleDistrictsAndEnemyBlocks(this.getAdjacent(_item)) && this.CheckAlliedDistrict(this.getAdjacent(_item))){
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

  getAdjacent(c){
    let list = [];
    list.push(this._board[this.getIndex(c.x(), c.y()-1)]); // top
    list.push(this._board[this.getIndex(c.x()+1, c.y())]); // left
    list.push(this._board[this.getIndex(c.x(), c.y()+1)]); // down
    list.push(this._board[this.getIndex(c.x()-1, c.y())]); // right
    //console.log("Adjacent : ");
    //console.log(list);
    return list
  }

  CheckSameAlly(adja) {
    if (this._selectedBuildingType === BuildingType.HOUSE)
      return true;

    for (let i = 0; i < adja.length; i++) {
      if (adja[i] instanceof Building) {
        if (adja[i].type() === this._selectedBuildingType && adja[i].color() === this._color) {
          return false;
        }
      }
    }
    return true;
  }

  CheckMultipleDistrictsAndEnemyBlocks(adja) {
    const foundId = new Set;
    const foundBlock = new Set;
    for (let i = 0; i < adja.length; i++) {
      if (adja[i] instanceof Building) {
        if (adja[i].idDistrict() > -1) {
          foundId.add(adja[i].idDistrict());
        }
        if (adja[i].color() !== this._color) {
          foundBlock.add(adja[i].idBlock());
        }
      }
    }
    if (foundId.size > 1 || foundBlock.size > 1 || foundId.size > 1 && foundBlock > 0)
      return false
    return true;
  }

  CheckAlliedDistrict(adja) {
    let foundAlly = false;
    let foundDistrict = false;

    console.log("IN CHECK ALLIED DISTRICT");

    for (let i = 0; i < adja.length; i++) {

      if (adja[i] instanceof Building) {

        if(adja[i]._idDistrict > -1){

          console.log("Found District");
          foundDistrict = true;

          if(adja[i].color() === this._color){
            console.log("Found ally");
            foundAlly = true;

          }
        }
      }
    }
    return (foundAlly === foundDistrict);
  }

  propagateDistrict(b){
    let adja = this.getAdjacent(b.coord());
    for(let i = 0; i < adja.length; i++){
      if(adja[i] instanceof Building){
        if(adja[i]._idDistrict == -1){
          adja[i]._idDistrict = b._idDistrict;
          this.propagateDistrict(adja[i]);
        }
      }
    }
  }


  setAdjacentDistrictsAndBlocks(b){
    console.log("IN SET ADJA D & B");
    let adja = this.getAdjacent(b.coord());
    let tmpDistrict = this.nbDistrict, tmpBlock = this.nbBlock;
    for(let i = 0; i < adja.length; i++){
      if(adja[i] instanceof Building){
        console.log(adja[i]);
        // If it has an id (since we already checked if there was more than one district with the conditions, we can do it)
        if(adja[i]._idDistrict > -1){
          tmpDistrict = adja[i]._idDistrict;
          b._idDistrict = tmpDistrict;
        }else if(adja[i].color() !== b.color()){
          // If none have a district and they're opposite colors, they form a district.
          b._idDistrict = tmpDistrict;
          //adja[i]._idDistrict = tmpDistrict ;
          this.propagateDistrict(b);
          this.nbDistrict++;
        }

        if(adja[i].idBlock() < tmpBlock && adja[i].color() === this._color){
          tmpBlock = adja[i].idBlock();
        }
      }
    }

    b._idBlock = tmpBlock;

    if(tmpBlock === this.nbBlock)
      this.nbBlock++;
    console.log("END SET ADJA D & B");
  }

  is_finished() {
    // Retourne si la partie est terminée ou non.
  }

  move(move) {
    this.textBoard();
    // Permet d'appliquer un coup et mets à jour l'état du jeu.
    console.log("IN MOVE");

    if (this._phase === Phase.ARCHITECT) {
      console.log("IN ARCHITECT " + this._selectedArchitect);
      this._board[this.getIndex(this._architects[this._selectedArchitect]._coord._x, this._architects[this._selectedArchitect]._coord._y)] = 0;

    }

    //console.log(move);
    move._piece._coord._x = move._coord._x;
    move._piece._coord._y = move._coord._y;


    let x = move._piece._coord._x;
    let y = move._piece._coord._y;

    if(this._phase === Phase.BUILDING) {


      this.setAdjacentDistrictsAndBlocks(move._piece);
      console.log(move._piece);

        console.log(this.nbDistrict);
        this._manager.getScore(this.nbDistrict);

      this.next_color();

    }
    this._board[this.getIndex(move._coord._x, move._coord._y)] = move._piece;

    this._phase = Phase.NONE;



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