"use strict";

import Coordinates from './Coordinate.mjs';

class Architect {
constructor(coord) {
  this._coord = coord;
}

// public methods
  clone() {
    return new Architect(this._coord);
  }

  coord(){
    return this._coord;
  }

  move(coord){
    this._coord = coord;
  }

  move(x, y){
    this._x = x;
    this._y = y;
  }

  to_string(){
    return "Architect at " + coord.to_string();
  }


}

export default Architect;