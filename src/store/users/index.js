import {SHOW_DATA,SHOW_USERS,FIND_USERS,SET_UPDATEVISIBLE,DELETE_USERS} from "./mutations"

const users = {
    state:{
        data:{curpage:1,maxpage:"",rows:[],eachpage:5},
        users:{name:"",phNum:"",email:"",pwd:"",time:""},
        findUsers:{},
        updateVisible:false,
        deleteUsers:""
    },
    mutations:{
        [SHOW_DATA](state,data){
            state.data = data;
        },
        [SHOW_USERS](state,data){
            state.users = data;
        },
        [FIND_USERS](state,data){
            state.findUsers = data;
        },
        [SET_UPDATEVISIBLE](state,data){
            state.updataVisible = data;
        },
        [DELETE_USERS](state,data){
            state.deleteUsers = data;
            console.log(state.deleteUsers);
        }
    }
}
export {users as default}