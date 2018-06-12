"use strict";

import OpenXum from '../../openxum/manager.mjs';
import Urbino from '../../../openxum-core/games/urbino/index.mjs';

class Manager extends OpenXum.Manager {
  constructor(e, g, o, s) {
    super(e, g, o, s);
    this.that(this);
  }

  build_move() {
    return new Urbino.Move();
  }

  get_current_color() {
    return this.engine().current_color() === Urbino.Color.BLACK ? 'Black' : 'White';
  }

  static get_name() {
    return 'urbino';
  }

  get_winner_color() {
    return this.engine().winner_is() === Urbino.Color.BLACK ? 'black' : 'white';
  }

  process_move() { }
}

export default {
  Manager: Manager
};