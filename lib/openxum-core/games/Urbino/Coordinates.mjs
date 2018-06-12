"use strict";

class Coordinates {
constructor(x, y) {
  this._x = x;
  this._y = y;
}

// public methods
  clone() {
    return new Coordinates(this._x, this._y);
  }

}

export default Coordinates;