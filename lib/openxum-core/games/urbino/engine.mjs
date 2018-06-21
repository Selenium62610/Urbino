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

    this._manager = new Manager();
    this._manager.initMap();

    this.turnPassed = 0;
  }

  initGame(){
    this.initBoard();
    this.initArchitects();
  }

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
    return this._color;
  }

  next_color() {
    this._color = this.current_color()===Color.WHITE ? Color.BLACK : Color.WHITE;
  }

  get_name() {
    // Retourne le nom du jeu.
  }

  get_possible_move_list() {
    let moves = [];

    switch(this._phase) {
      case Phase.NONE:
          //moves.push(new Move(-1, -1, 0));
        break;

      case Phase.CHOOSEARCHITECT:
        for(let i= 0; i < this.nbArchitects; i++) {
          moves.push(new Move(this._architects[i].coord().x(), this._architects[i].coord().y(), this._architects[i]));
        }
        this._phase = Phase.ARCHITECT
        break;

      case Phase.ARCHITECT:
        for(let i= 0; i < this.width; i++) {
          for(let j = 0; j < this.height; j++) {
            if (this._board[this.getIndex(i,j)] === 0) {
              moves.push(new Move(i,j,this._architects[this._selectedArchitect]));
            }
          }
        }
        break;

      case Phase.CHOOSEBUILDINGTYPE:
          moves.push(new Move(-1, -1, "h"));
          moves.push(new Move(-1, -1, "p"));
          moves.push(new Move(-1, -1, "t"));
          this._phase = Phase.BUILDING;
        break;

      case Phase.BUILDING:
        for(const _item of this.getIntersections()){
          if (this._manager.enoughPiece(this._selectedBuildingType, this.current_color()) && this.CheckSameAlly(this.getAdjacent(_item)) && this.CheckMultipleDistrictsAndEnemyBlocks(this.getAdjacent(_item)) && this.CheckAlliedDistrict(this.getAdjacent(_item))) {
            moves.push(new Move(_item._x, _item._y, new Building(this.current_color(), this._selectedBuildingType, new Coordinates(_item._x, _item._y))));
          }
        }

        if(moves.length === 0){
          moves.push(new Move(-1, -1, null));
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
          if(adja[i].color() === this._color)
            foundAlly = true;
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
        if(adja[i]._idDistrict > -1){
          tmpDistrict = adja[i]._idDistrict;
          b._idDistrict = tmpDistrict;
        }else if(adja[i].color() !== b.color()){
          b._idDistrict = tmpDistrict;
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
  }

  /*move(move) {

    if (this._phase === Phase.ARCHITECT) {
      this._board[this.getIndex(this._architects[this._selectedArchitect]._coord._x, this._architects[this._selectedArchitect]._coord._y)] = 0;
    }

    move._piece._coord._x = move._coord._x;
    move._piece._coord._y = move._coord._y;

    if(this._phase === Phase.BUILDING) {
      this.setAdjacentDistrictsAndBlocks(move._piece);
      this.next_color();
    }

    this._board[this.getIndex(move._coord._x, move._coord._y)] = move._piece;
    this._phase = Phase.NONE;
  }*/

  move(move){

    switch(this._phase){
      case Phase.ARCHITECT :
        if(move.coord().x() === move._piece.coord().x() && move.coord().y() === move._piece.coord().y()){
          // Choose Archi
          this._selectedArchitect

        }else{
          // Move Archi
          this._board[this.getIndex(this._architects[this._selectedArchitect]._coord._x, this._architects[this._selectedArchitect]._coord._y)] = 0;
          move._piece._coord._x = move._coord._x;
          move._piece._coord._y = move._coord._y;
          this._board[this.getIndex(move._coord._x, move._coord._y)] = move._piece;
          this._phase = Phase.NONE;
        }
        break;

      case Phase.BUILDING :
        if(move._piece === null){
          this.next_color();
          this._phase = Phase.NONE;
        }else if(move.coord().x() === -1 && move.coord().y() === -1){
          // Choose Building Type
          switch(m){
            case "h" : this._selectedBuildingType = BuildingType.HOUSE; break;
            case "p" : this._selectedBuildingType = BuildingType.PALACE; break;
            case "t" : this._selectedBuildingType = BuildingType.TOWER; break;
          }
        }else{
          // Place Building
          this.setAdjacentDistrictsAndBlocks(move._piece);
          this.next_color();
          this._board[this.getIndex(move._coord._x, move._coord._y)] = move._piece;
          this._phase = Phase.NONE;
        }
        break;

      case Phase.NONE :
          this._phase = Phase.CHOOSEARCHITECT;
        break;
    }
  }

  parse(str){

  }

  to_string() {
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
    return str;
  }

  turnPassed(){
    return this.turnPassed;
  }

  winner_is() {
    // Indique le joueur qui a gagné.
  }

  getScore(){

  }
}

export default Engine;