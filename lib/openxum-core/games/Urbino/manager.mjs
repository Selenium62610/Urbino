"use strict";

import Color from './Color.mjs';
import BuildingType from './BuildingType.mjs';

class Manager {
constructor() {
  this.pawn = 0;
}

// public methods
  clone() {
    return new Building(this._color, this._type, this._coord, this._idBlock, this._idDistrict);
  }



}

export default Manager;