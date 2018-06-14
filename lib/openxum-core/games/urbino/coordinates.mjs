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

  x(){
    return this._x;
  }

  y(){
    return this._y;
  }

  equals(b) {
      if (b instanceof Coordinates) {
          if (this.x() === b.x() && this.y() == b.y())
              return true;
      }
      return false;
  }


  to_string() {
    return "(" + this._x + "," + this._y + ")";
  }

}

export default Coordinates;