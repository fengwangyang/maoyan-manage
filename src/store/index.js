import Vuex from "vuex";
import Vue from "vue";
import cinemas from "./cinemas";
import news from "./news";
import moviesRel from "./moviesRel";
import moviesAll from "./moviesAll";
import users from "./users";

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        updateVisible:false
    },
    modules:{
        cinemas,news,moviesRel,moviesAll,users
    }
});
export {store as default}