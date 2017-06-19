
const MOVIESALL_DATA='MOVIESALL_DATA';
const MOVIESALL_UPDATEDATA = 'MOVIESALL_UPDATEDATA';
const MOVIESALL_UPDATEDIV = 'MOVIESALL_UPDATEDIV';
const SHOW_SEARCH = 'SHOW_SEARCH';
const MOVIESALL_DELETEDATA = 'MOVIESALL_DELETEDATA';
const ONHOT_DATA = 'ONHOT_DATA';
const ONHOT_MOVIESDATA = 'ONHOT_MOVIESDATA';
const ONHOT_DELETEDATA = 'ONHOT_DELETEDATA';
const ONHOT_SEARCHDATA = 'ONHOT_SEARCHDATA';
const ONSHOW_DATA ='ONSHOW_DATA';
const PRESHOW_DATA = 'PRESHOW_DATA';
const PAGESIZE = 'PAGESIZE';
const moviesAll = {
    
    state:{
        moviesData:'',
        updateData:'',
        dialogVisible :false,
        searchData:'',
        deleteData:'',
        onhotData:'',
        onhotMoviesData:'',
        onhotDeleteData:'',
        onhotSearchData:'',
        onshowData:'',
        preshowData:'',
        pageSize:0
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
            state.onhotData = data;
        },
        [ONHOT_MOVIESDATA](state,data){
            state.onhotMoviesData = data;
        },
        [ONHOT_DELETEDATA](state,data){
        state.onhotDeleteData = data;
        },
        [ONHOT_SEARCHDATA](state,data){
            state.onhotSearchData = data;
        },
        [ONSHOW_DATA](state,data){
            state.onshowData =data;
        },
        [PRESHOW_DATA](state,data){
            state.preshowData = data;
        },
        [PAGESIZE](state,data){
            state.pageSize = data;
        }
        
    }
}
export {moviesAll as default}

