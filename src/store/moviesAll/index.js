const MOVIESALL_DATA='MOVIESALL_DATA';
const MOVIESALL_UPDATEDATA = 'MOVIESALL_UPDATEDATA';
const MOVIESALL_UPDATEDIV = 'MOVIESALL_UPDATEDIV';
const SHOW_SEARCH = 'SHOW_SEARCH';
const MOVIESALL_DELETEDATA = 'MOVIESALL_DELETEDATA';
const ONHOT_DATA = 'ONHOT_DATA';
const moviesAll = {
    
    state:{
        moviesData:'',
        updateData:'',
        dialogVisible :false,
        searchData:'',
        deleteData:'',
        onhotData:''
    },
    mutations:{
      [MOVIESALL_DATA](state,data){
          
          state.moviesData = data;
      },
        [MOVIESALL_UPDATEDATA](state,data){
            state.updateData = data;
        },
        [MOVIESALL_UPDATEDIV](state,data){
            state.dialogVisible = data;
        },
        [SHOW_SEARCH](state,data){
            state.searchData = data;
        },
        [MOVIESALL_DELETEDATA](state,data){
            state.deleteData = data;
            
        },
        [ONHOT_DATA](state,data){
            console.log(data);
            state.onhotData = data;
        }
        
    }
}
export {moviesAll as default}