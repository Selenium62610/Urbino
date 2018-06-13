"use strict";
// namespace Urbino

let Urbino = {};

import Gui from './gui.mjs';
import Manager from './manager.mjs';



Urbino = Object.assign(Urbino, Gui);
Urbino = Object.assign(Urbino, Manager);
export default Urbino;