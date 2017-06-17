import {NEWS_DATA,SEARCH_DATA} from "./newsStore";

const news = {
    state:{
        newdata:{rows:[],eachpage:8,curpage:1},
        search:{
            type:"",
            value:""
        }
    },
    mutations:{
        [NEWS_DATA](state,data){
            state.newdata = data
            console.log("dataooo",data)
        },
        [SEARCH_DATA](state,search){
            state.search = search
        }
    }
}
export {news as default}