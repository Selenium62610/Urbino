"use strict";

import Color from './Color.mjs';
import BuildingType from './BuildingType.mjs';



class Manager {
static instance=this;



    constructor(managerToken) {
        if (instance)
            return instance;



        this.instance= this;

    }


//genre ici
//
// mtn
//
// let first = new Singleton();
// let second = new Singleton();
// console.log(first===second);
//
//output: true
//voila le singleton c'est rigolo
//





}


export default Manager;