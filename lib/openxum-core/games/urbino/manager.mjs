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
    for(let i=0;i<=nbDistrict;i++)
    {
      if(scoreB[i]>scoreW[i])
      {
        scorefinal += scoreB[i];
      }
      else{
        scorefinal -= scoreW[i];
      }
    }

    console.log(scorefinal);
    console.log(Color.BLACK);
    console.log(Color.WHITE);
    if(scorefinal>0) return Color.BLACK;

    if(scorefinal<0) return Color.WHITE;


    return null;
    //else compter le nombre de batiment;*/
  }


  getScore(nbDistrict){
    let scoreB = [];
    let scoreW = [];

    for(let a=0; a<= nbDistrict; a++)
    {
      scoreB[a]=0;
      scoreW[a]=0;

    }

    for(let i=0; i< _Buildinglist.length; i++)
    {

      for(let j=0; j<= nbDistrict; j++)
      {

        if(_Buildinglist[i]._idDistrict === j)
        {
          if(_Buildinglist[i].color() === Color.BLACK)
          {
            if(_Buildinglist[i].type() === BuildingType.HOUSE)
            {
              scoreB[j] +=1;
            }
            if(_Buildinglist[i].type()  === BuildingType.PALACE)
            {
              scoreB[j] +=2;
            }
            if(_Buildinglist[i].type()  === BuildingType.TOWER)
            {
              scoreB[j] +=3;
            }
          }
          console.log(scoreB);
          if(_Buildinglist[i].color() === Color.WHITE)
          {
            if(_Buildinglist[i].type()  === BuildingType.HOUSE)
            {
              scoreW[j] +=1;
            }
            if(_Buildinglist[i].type()  === BuildingType.PALACE)
            {
              scoreW[j] +=2;
            }
            if(_Buildinglist[i].type()  === BuildingType.TOWER)
            {
              scoreW[j] +=3;
            }
          }
        }
      }
    }

    return this.diff_score(scoreB, scoreW, nbDistrict);
  }





}


export default Manager;