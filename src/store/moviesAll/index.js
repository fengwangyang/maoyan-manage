const MOVIESALL_DATA='MOVIESALL_DATA';
const MOVIESALL_UPDATEDATA = 'MOVIESALL_UPDATEDATA';
const MOVIESALL_UPDATEDIV = 'MOVIESALL_UPDATEDIV';
const moviesAll = {
    
    state:{
        moviesData:'',
        updateData:'',
        
    },
    mutations:{
      [MOVIESALL_DATA](state,data){
          
          state.moviesData = data;
      },
        [MOVIESALL_UPDATEDATA](state,data){
            state.updateData = data;
        }
    }
}
export {moviesAll as default}