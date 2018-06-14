"use strict";

import Coordinates from './coordinates.mjs';
import Color from './color.mjs';
import BuildingType from './buildingType.mjs';

class Building {
constructor(color, type, coord) {
  this._color = color;
  this._type = type;
  this._coord = coord;
  this._idBlock = -1;
  this._idDistrict = -1;
}

// public methods
  clone() {
    return new Building(this._color, this._type, this._coord, this._idBlock, this._idDistrict);
  }

  coord(){
    return this._coord;
  }

  color(){
    return this._color;
  }

  type(){
    return this._type;
  }

  idBlock(){
    return this._idBlock;
  }

  idDistrict(){
     return this._idDistrict;
  }

  inBlock(id){
    this._idBlock = id;
  }

  inDistrict(id){
    this._idDistrict = id;
  }

  as_text(){
    let str;
    switch(this._type){
        case BuildingType.HOUSE : str = 'h '; break;
        case BuildingType.PALACE : str = 'p '; break;
        case BuildingType.TOWER : str = 't '; break;
    }

    if(this._color == Color.WHITE)
      str = str.toUpperCase();

    console.log(str);
    return str;
  }

  to_string(){
    let str;
    str = (this._color == Color.BLACK) ? 'Black ' : 'White ';
    str += (this._type == BuildingType.HOUSE) ? 'House ' : (this._type == BuildingType.PALACE) ? 'Palace ' : 'Tower ';
    return str;
  }

}

export default Building;