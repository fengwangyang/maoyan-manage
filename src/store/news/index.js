import {NEWS_DATA,SEARCH_DATA,DEL_DATA,EDIT_DATA,EDIT_VISBLE,UPLOAD_DATA,MOVIES_DATA} from "./newsStore";

const news = {
    state:{
        newdata:{rows:[],eachpage:8,curpage:1,total:10},
        search:{
            type:"",
            value:""
        },
        uploadimg:[],
        delData:[],
        editdata:[],
        editVisble:false,
        movies:[]
    },
    mutations:{
        [NEWS_DATA](state,data){
            state.newdata = data
        },
        [SEARCH_DATA](state,search){
            state.search = search
        },
        [DEL_DATA](state,delData){
            state.delData = delData
        },
        [EDIT_DATA](state,editdata){
            state.editdata = editdata
        },
        [EDIT_VISBLE](state,editVisble){
            state.editVisble = editVisble
        },
        [UPLOAD_DATA](state,uploadimg){
            state.uploadimg = uploadimg
        },
        [MOVIES_DATA](state,movies){
            console.log(movies)
            state.movies = movies
        }
    }
}
export {news as default}