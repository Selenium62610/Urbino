"use strict";


import Building from './building.mjs';
import Architect from './architect.mjs';
import BuildingType from './buildingType.mjs';
import Color from './color.mjs';
import MoveType from './phase.mjs';
import Coordinates from './coordinates.mjs';

class Move {
  constructor(x,y,piece) {
    this._coord = new Coordinates(x,y);
    this._piece = piece;

    if(piece instanceof Architect)
      this.isBuilding = false;
    else
      this.isBuilding = true;
  }

  piece(){
    return this._piece;
  }

  coord(){
    return this._coord;
  }

  from() {
    if(this._piece instanceof Architect)
      return this._piece.coordinates();

    return null;
  }

  to(){
    return (new Coordinates (this.coord().x(),this.coord().y()))
  }

  get(){
    return "m";
  }

  // A19 : Architect, X=1 et Y=9
  // m25 : Black house, X=2 et Y=5
  // P99 : White palace, X=9 et Y=9
  parse(str){
    let isArchitect = false;
    let isWhite = false;

    if(str.charAt(0) === 'A'){ // if architect
      isArchitect = true;
    }else if(str.charAt(0) === str.charAt(0).toUpperCase()){ // if first letter is uppercase, white
      isWhite = true;
    } // else black

    this.coord._x = str.charAt(1);
    this.coord._y = str.charAt(2);

    if(isArchitect == false){ // Si non architect
      switch(str.charAt(0).toLowerCase()){
        case 'h' : this._piece = new Building((isWhite) ? Color.WHITE : Color.BLACK, BuildingType.HOUSE,this.to()); break;
        case 'p' : this._piece = new Building((isWhite) ? Color.WHITE : Color.BLACK, BuildingType.PALACE,this.to());break;
        case 't' : this._piece = new Building((isWhite) ? Color.WHITE : Color.BLACK, BuildingType.TOWER, this.to());break;
      }
    }else{
      this.piece = new Architect(this.to());
    }
  }



}

export default Move;