"use strict";

import Color from './color.mjs';
import BuildingType from './buildingType.mjs';


let _map=new Map()  .set('H', 18)
    .set('P', 6)
    .set('T', 3)
    .set('h', 18)
    .set('p', 6)
    .set('t', 3);

let _Buildinglist=[];
class Manager {


    map(){
        return _map;

    }


    constructor(managerToken) {
        if (this.instance)
            return this.instance;


        this.instance  = this;

    }

    removePiece(type,color){

       if( color === Color.BLACK ){
           if(type === BuildingType.HOUSE){
               _map.set('h',_map.get('h')-1);
           }
           if(type === BuildingType.PALACE){
               _map.set('p',_map.get('p')-1);
           }
           if(type === BuildingType.HOUSE){
               _map.set('t',_map.get('t')-1);
           }

       }
        if( color === Color.WHITE ){

            if(type === BuildingType.HOUSE){
                _map.set('H',_map.get('H')-1);
            }
            if(type === BuildingType.PALACE){
                _map.set('P',_map.get('P')-1);
            }
            if(type === BuildingType.HOUSE){
                _map.set('T',_map.get('T')-1);
            }
       }
    }

    enoughPiece(type,color){
        if( color === Color.BLACK ){
            if(type === BuildingType.HOUSE){
                return (_map.get('h')>0);
            }
            if(type === BuildingType.PALACE){
                return (_map.get('p')>0);

            }
            if(type === BuildingType.HOUSE){
                return (_map.get('t')>0);
            }

        }
        if( color === Color.WHITE ){

            if(type === BuildingType.HOUSE){
                return(_map.get('H')>0);
            }
            if(type === BuildingType.PALACE){
                return (_map.get('P')>0);
            }
            if(type === BuildingType.HOUSE){
                return (_map.get('T')>0);
            }
        }


    }






}


export default Manager;