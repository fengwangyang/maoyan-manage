import {SHOW_MOVIES_LINKED,FIND_MOVIES,SHOW_MOVIE_CINEMAS,SHOW_ALL_CINEMAS,SHOW_ALL_MOVIES,SWITCH_VISIBLE,SWITCH_VISIBLE_ADD,SWITCH_VISIBLE_SESSION,GET_HOUSE,GET_LINKED_CINEMA,GET_SESSION,FIND_CINEMA,FIND_ALL_MOVIE,SHOW_LINKED_CINEMAS,FIND_LINKED_CINEMA} from "./mutations"
const moviesRel = {
    state:{
        data:{rows:[],eachpage:5,maxpage:"",curpage:1},
        findMovie:{},
        editMovie:{cinemas:[]},
        cinemas:[],
        allCinemas:{rows:[],curpage:1,eachpage:5},
        findCinema:{},
        movies:{rows:[],eachpage:5,maxpage:"",curpage:1},
        findMovies:{},
        addCinemaVisible:false,
        cinemaVisible:false,
        sessionVisible:false,
        house:{hName:""},
        linkedCinema:{},
        linkedCinemas:{rows:[],eachpage:5,maxpage:"",curpage:1},
        session:{time:"",price:"",cName:""}
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
        [FIND_CINEMA](state,data){
            state.findCinema = data
        },
        [SHOW_ALL_MOVIES](state,data){
            state.movies = data
        },
        [SWITCH_VISIBLE](state,data){
            state.cinemaVisible = data
        },
        [SWITCH_VISIBLE_ADD](state,data){
            state.addCinemaVisible = data
        },
        [SWITCH_VISIBLE_SESSION](state,data){
            state.sessionVisible = data
        },
        [GET_HOUSE](state,data){
            state.house = data
        },
        [FIND_LINKED_CINEMA](state,data){
            state.linkedCinema = data
        },
        [SHOW_LINKED_CINEMAS](state,data){
            state.linkedCinemas = data
        },
        [GET_SESSION](state,data){
            state.session = data
        },
        [FIND_ALL_MOVIE](state,data){
            state.findMovies = data
        }
    }
}
export {moviesRel as default}