"use strict";

import Color from './color.mjs';
import BuildingType from './buildingType.mjs';



class Manager {

    static get instance() {
        return this;
    }


    constructor(managerToken) {
        if (this.instance)
            return this.instance;



        this.instance  = this;

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