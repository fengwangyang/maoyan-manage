import {REMOVE_DATA} from "./cinemas_const"
import {ALL_DATA} from "./cinemas_const"
import {UPDATE_DATA} from "./cinemas_const"
import {UPDATE_VISIBLE} from "./cinemas_const"
const cinemas = {
    state:{
       removeData:"",
       allData:'',
       upData:"",
       updateVisible:"",
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
        state.upData=data;
           console.log(data);
    },
   [UPDATE_VISIBLE](state,data){
        state.updateVisible=data;
           console.log(data);
    }
  }
}
export {cinemas as default}