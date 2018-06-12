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


}

export default Architect;