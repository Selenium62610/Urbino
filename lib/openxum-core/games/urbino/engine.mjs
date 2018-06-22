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

    this.nbPassed = 0;
    this._color=c;
    this.nbArchitects = 2;
    this._architects = [];
    this._phase= Phase.ARCHITECT;
    this._selectedArchitect=0;
    this._selectedBuildingType=BuildingType.HOUSE;
    this.initGame();

    this.moved = false;

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


    this.move(new Move(5,5,this._architects[0]));

    this._phase = Phase.ARCHITECT;
    this.move(new Move(3,3,this._architects[1]));
    this.moved = false;
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

    for (let i = 0; i < moves.length; ++i) {
      this.move(new Move(moves[i]._coord.x(), moves[i]._coord.y(),moves[i]._piece));
    }



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
    this._color = this.current_color()===Color.WHITE ? Color.BLACK : Color.WHITE;
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

        moves.push(new Move(-10,-10,new Building(Color.WHITE,BuildingType.NONE,-10,-10)));


        break;

      case Phase.ARCHITECT:
        //list of all empty cells
        for(let a = 0; a < this.nbArchitects; a++){
          for(let i= 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
              if (this._board[this.getIndex(i, j)] === 0) {
                moves.push(new Move(i, j, this._architects[a]));

              }
            }
          }
        }
        moves.push(new Move(-20, -20, 0));
        break;

      case Phase.BUILDING:
        //list of all valid cells to place a building for the current player


        for(let i = 1; i <= 3; i++){
          for(const _item of this.getIntersections()) {

            if (this._manager.enoughPiece(this._selectedBuildingType, this.current_color())) {
              if (this.CheckSameAlly(this.getAdjacent(_item)) && this.CheckMultipleDistrictsAndEnemyBlocks(this.getAdjacent(_item)) && this.CheckAlliedDistrict(this.getAdjacent(_item))) {
                moves.push(new Move(_item._x, _item._y, new Building(this.current_color(), i, new Coordinates(_item._x, _item._y))));

              }

            }

          }
        }
        if(moves.length===0) {
          moves.push(new Move(-30, -30, -1));

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
    for (let i = 0; i < adja.length; i++) {

      if (adja[i] instanceof Building) {

        if(adja[i]._idDistrict > -1){
          foundDistrict = true;

          if(adja[i].color() === this._color){
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
  }

  is_finished() {
    // Retourne si la partie est terminée ou non.
    return ( this.nbPassed >= 2);
  }

  move(move) {
    if(! (move instanceof Move)) {
      this._phase = Phase.NONE;
    }else {
      this.textBoard();

      if (move._coord.x() === -30 && move._coord.y() === -30) {

        this.nbPassed++;
        this._phase=Phase.NONE;
        this.moved=false;
        this.next_color();
        // this.nbPassed++;

        //  this.next_color();

      }else if (this._phase === Phase.NONE) {
        if(this.moved) {
          this._phase = Phase.BUILDING;
        }else{
          this._phase = Phase.ARCHITECT;
        }


      }else if (move._coord.x() === -20 && move._coord.y() === -20) {
        this._phase = Phase.NONE;

      } else if (move._coord.x() === -10 && move._coord.y() === -10) {
        this._phase = Phase.ARCHITECT;


      } else if (this._phase === Phase.ARCHITECT && move._piece instanceof  Architect) {
        this._board[this.getIndex(move._piece._coord.x(), move._piece._coord.y())] = 0;
        move._piece._coord._x = move._coord._x;
        move._piece._coord._y = move._coord._y;

        this._board[this.getIndex(move._piece._coord._x, move._piece._coord._y)] = move._piece;
        this._phase = Phase.NONE;
        this.moved = true;

      } else if (this._phase === Phase.BUILDING ) {
        move._piece._coord._x = move._coord._x;
        move._piece._coord._y = move._coord._y;


        this.setAdjacentDistrictsAndBlocks(move._piece);

        this._manager.add_to_list(move._piece);

        this._manager.getScore(this.nbDistrict);

        this._board[this.getIndex(move._coord._x, move._coord._y)] = move._piece;
        this._manager.removePiece(move._piece.type(), move._piece.color());
        this.moved = false ;
        this.nbPassed = 0;
        this.next_color();
        this._phase = Phase.NONE;
      }
    }
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
    console.log("WINNER IS :::");
    console.log(this._manager.getScore(this.nbDistrict));
    return (this._manager.getScore(this.nbDistrict));
  }



}

export default Engine;