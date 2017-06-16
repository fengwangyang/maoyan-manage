const MOVIESALL_DATA='MOVIESALL_DATA';
const MOVIESALL_UPDATEDATA = 'MOVIESALL_UPDATEDATA';
const MOVIESALL_UPDATEDIV = 'MOVIESALL_UPDATEDIV';
const SHOW_SEARCH = 'SHOW_SEARCH';
const moviesAll = {
    
    state:{
        moviesData:'',
        updateData:'',
        dialogVisible :false,
        searchData:''
        
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
        }
    }
}
export {moviesAll as default}