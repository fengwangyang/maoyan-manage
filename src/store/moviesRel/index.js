import {SHOW_MOVIES_LINKED,FIND_MOVIES,SHOW_MOVIE_CINEMAS,SHOW_ALL_CINEMAS,SHOW_ALL_MOVIES,SWITCH_VISIBLE,SWITCH_VISIBLE_ADD} from "./mutations"
const moviesRel = {
    state:{
        data:{rows:[],eachpage:8,maxpage:"",curpage:1},
        findMovie:{},
        editMovie:{cinemas:[]},
        cinemas:[],
        allCinemas:{rows:[],curpage:1,eachpage:6},
        movies:{rows:[],eachpage:8,maxpage:"",curpage:1},
        addCinemaVisible:false,
        cinemaVisible:false
    },
    mutations:{
        [SHOW_MOVIES_LINKED](state,data){
            state.data = data
        },
        [FIND_MOVIES](state,data){
            state.findMovie = data
        },
        [SHOW_MOVIE_CINEMAS](state,data){
            state.editMovie = data
        },
        [SHOW_ALL_CINEMAS](state,data){
            state.allCinemas = data
        },
        [SHOW_ALL_MOVIES](state,data){
            state.movies = data
        },
        [SWITCH_VISIBLE](state,data){
            state.cinemaVisible = data
        },
        [SWITCH_VISIBLE_ADD](state,data){
            state.addCinemaVisible = data
        }
    }
}
export {moviesRel as default}