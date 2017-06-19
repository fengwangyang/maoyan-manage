import {REMOVE_DATA} from "./cinemas_const"
import {ALL_DATA} from "./cinemas_const"
import {UPDATE_DATA} from "./cinemas_const"
import {UPDATE_VISIBLE} from "./cinemas_const"
import {SIT_DATA} from "./cinemas_const"
import {HOUSE_DATA} from "./cinemas_const"
import {SEARCH_TYPE} from "./cinemas_const"
const cinemas = {
    state:{
       removeData:{},
       allData:{},
       updateData:{},
       updateVisible:false,
       sitData:{},
       houseData:{},
       searchType:{},
    },
    mutations:{
       [REMOVE_DATA](state,data){
           state.removeData=data;
           console.log(data);
    },
     [ALL_DATA](state,data){
        state.allData=data;
           console.log(data);
    },
    [UPDATE_DATA](state,data){
        state.updateData=data;
           console.log(data);
    },
   [UPDATE_VISIBLE](state,data){
        state.updateVisible=JSON.parse(data);
           console.log(state.updateVisible);
    },
    [SIT_DATA](state,data){
        state.sitData=JSON.parse(data);
           console.log(data);
    },
    [HOUSE_DATA](state,data){
        state.houseData=data;
           console.log(data);
    },
    [SEARCH_TYPE](state,data){
        state.searchType=data;
           console.log(data);
    },
  }
}
export {cinemas as default}