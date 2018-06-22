"use strict";

import Color from './color.mjs';
import BuildingType from './buildingType.mjs';


let _map=new Map();

let _Buildinglist=[];
class Manager {


    initMap(){
        _map.set('H', 18)
            .set('P', 6)
            .set('T', 3)
            .set('h', 18)
            .set('p', 6)
            .set('t', 3);
    }

    map(){
        return _map;

    }

    add_to_list(b){
        _Buildinglist.push(b);
        return _Buildinglist;
    }

    get_liste() {     return _Buildinglist;}



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
           if(type === BuildingType.TOWER){
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
            if(type === BuildingType.TOWER){
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
            if(type === BuildingType.TOWER){
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
            if(type === BuildingType.TOWER){
                return (_map.get('T')>0);
            }
        }


    }

    diff_score(scoreB, scoreW, nbDistrict)
    {
        let scorefinal = 0;
        for(let i=0;i<nbDistrict;i++)
        {
            if(scoreB[i]>scoreW[i])
            {
                scorefinal += scoreB[i];
            }
            else{
                scorefinal -= scoreW[i];
            }
        }
        if(scorefinal>0) return "Black win";
        if(scorefinal<0) return "White win";
        //else compter le nombre de batiment;*/
    }


    getScore(nbDistrict){

        console.log("Dans get Score on vérifie la liste");
        console.log(_Buildinglist);
        let scoreB = [];
        let scoreW = [];
        for(let i=0; i< _Buildinglist.length; i++)
        {
            console.log("Dans la liste des buildings");
            console.log(nbDistrict);

            for(let j=0; j< nbDistrict; j++)
            {

                if(_Buildinglist[i]._idDistrict == j)
                {
                    if(BuildingType.color == Color.BLACK)
                    {
                        if(BuildingType.type == BuildingType.HOUSE)
                        {
                            scoreB[j] +=1;
                            console.log(score[j]);
                        }
                        if(BuildingType.type == BuildingType.PALACE)
                        {
                            scoreB[j] +=2;
                        }
                        if(BuildingType.type == BuildingType.TOWER)
                        {
                            scoreB[j] +=3;
                        }
                    }

                    if(BuildingType.color == Color.WHITE)
                    {
                        if(BuildingType.type == BuildingType.HOUSE)
                        {
                            scoreW[j] +=1;
                        }
                        if(BuildingType.type == BuildingType.PALACE)
                        {
                            scoreW[j] +=2;
                        }
                        if(BuildingType.type == BuildingType.TOWER)
                        {
                            scoreW[j] +=3;
                        }
                    }
                }
            }
        }

        this.diff_score(scoreB, scoreW, nbDistrict)
    }
}


export default Manager;