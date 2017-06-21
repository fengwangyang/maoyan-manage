import {SHOW_DATA,SHOW_USERS,FIND_USERS,SET_UPDATEVISIBLE,DELETE_USERS,RENDERER_USERS,PAGE_SIZE} from "./mutations"

const users = {
    state:{
        userData:{},
        users:{},
        findUsers:{},
        updateVisible:false,
        deleteUsers:"",
        rendererUsers:"",
        pageSize:"",
    },
    mutations:{
        [SHOW_DATA](state,data){
            state.userData = data;
        },
        [SHOW_USERS](state,data){
            state.users = data;
        },
        [FIND_USERS](state,data){
            state.findUsers = data;
        },
        [SET_UPDATEVISIBLE](state,data){
            state.updateVisible = data;
        },
        [DELETE_USERS](state,data){
            state.deleteUsers = data;
        },
        [RENDERER_USERS](state,data){
            state.rendererUsers = data;
            console.log(data);
        },
        [PAGE_SIZE](state,data){
            state.pageSize = data;
            console.log(data);
        }
    }
}
export {users as default}