import {SHOW_DATA,SHOW_USERS,FIND_USERS,SET_UPDATEVISIBLE} from "./mutations"

const users = {
    state:{
        data:{curpage:1,maxpage:"",rows:[],eachpage:5},
        users:{name:"",phNum:"",email:"",pwd:"",time:""},
        findUsers:{},
        updateVisible:false
    },
    mutations:{
        [SHOW_DATA](state,data){
            state.data = data;
        },
        [SHOW_USERS](state,users){
            state.users = users;
        },
        [FIND_USERS](state,student){
            state.findUsers = users;
        },
        [SET_UPDATEVISIBLE](state,data){
            state.updataVisible = data;
        }
    }
}
export {users as default}