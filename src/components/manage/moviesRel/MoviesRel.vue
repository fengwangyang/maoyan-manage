<template>

<div>
  <h2 class="title">电影院线匹配管理</h2>
   <div class="topPanel">
        <SearchForm :show='show' holderText="搜索电影名/类型/地区" :optionData="options" :commitMutations="commitMutations" :newData="data"></SearchForm><AddMovieTable :freshTable="show"></AddMovieTable><el-button type="warning" icon="delete" @click="delData">删除</el-button>
   </div>
    <MainTable tableRef="linkedMovie" :show='show' :data="data.rows" :getUpdateData="getUpdateData" :isShow="true" :addToSelect="addToSelect" :openCinemas="openCinemas"></MainTable>
    <Page :show="show" :handleSizeChange="handleSizeChange" :goTo="goTo" :data="data" :pageMutation="commitMutations[0]"></Page>
    <BrowseCinemas :title="$store.state.moviesRel.editMovie.cName" :show="show"></BrowseCinemas>
    <AddCinemas :showMain="show" :showCinemas="showCinemas"></AddCinemas>
</div>

</template>
<script>
    import MainTable from "./MainTable";
    import SearchForm from "./SearchForm";
    import AddMovieTable from "./AddMovieTable";
    import BrowseCinemas from "./BrowseCinemas";
    import AddCinemas from "./AddCinemas";
    import {SHOW_MOVIES_LINKED,FIND_MOVIES,SHOW_MOVIE_CINEMAS,SHOW_ALL_CINEMAS,SWITCH_VISIBLE,SWITCH_VISIBLE_ADD,FIND_LINKED_CINEMA,SHOW_LINKED_CINEMAS} from "@/store/moviesRel/mutations";
    import {mapState} from "vuex";
    import Page from "./Page";
    import {ajax} from "@/components/common/ajax";
    import store from "@/store";
    
    export default {
        data:function(){
            return {
                delDatas:[],
                options:[{text:"电影名",value:"cName"},{text:"地区",value:"area"},{text:"类型",value:"type"}],
                commitMutations:[SHOW_MOVIES_LINKED,FIND_MOVIES],
            }
        },
        components:{MainTable,SearchForm,AddMovieTable,Page,BrowseCinemas,AddCinemas},
        created(){
            this.show();
        },
        methods:{
            show:function(){
                let obj = this.findMovie;
                obj.page = this.data.curpage;
                obj.rows = this.data.eachpage;
                ajax({
                    url:"/linkedMovies/find",
                    type:"post",
                    data:obj,
                    success:(data)=>{
                       store.commit(SHOW_MOVIES_LINKED,data);
                    }
                })
            },
            handleSizeChange(rows){
                let newData = this.data;
                newData.eachpage = rows;
                store.commit(SHOW_MOVIES_LINKED,newData);
                this.show()
            },
            goTo(nowpage){
                let newData = this.data;
                newData.curpage = nowpage;
                store.commit(SHOW_MOVIES_LINKED,newData);
                this.show()
            },
            getUpdateData(data){
                store.commit(SHOW_ALL_CINEMAS,{curpage:1,eachpag:6});
                this.showCinemas();
                store.commit(SWITCH_VISIBLE_ADD,true);
                store.commit(SHOW_MOVIE_CINEMAS,data);
            },
            openCinemas(data){
                if(data.cinemas && data.cinemas.length > 0){
                    store.commit(SWITCH_VISIBLE,true);
                    store.commit(SHOW_MOVIE_CINEMAS,data);
                }else{
                    this.$alert("没有关联影院，请添加关联影院","提示",{
                        confirmButtonText: '确定',
                    })
                }
            },
            addToSelect(selection){
                this.delDatas = selection;
            },
            delData(){
                if(this.delDatas.length > 0){
                    let ids = this.delDatas.map((value)=>{
                        return value._id
                    })
                    this.$confirm('此操作将永久删除选择的电影, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        ajax({
                            url:"/linkedMovies/del",
                            data:{ids:JSON.stringify(ids)},
                            type:"post",
                            success:()=>{
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.show();
                            }   
                        })
                    }).catch(() => {
//                      this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                      });          
                    });

                }else{
                    this.$alert("没有勾选电影，请勾选删除","提示",{
                        confirmButtonText: '确定'
                    })
                }

            },
            initalTable(){
                let mainData = this.$store.state.moviesRel.data;
                mainData.curpage = 1;
                store.commit(FIND_MOVIES,{});
                store.commit(SHOW_MOVIES_LINKED,mainData);
                this.show();
            },
            showCinemas(){
                let findCinema = this.$store.state.moviesRel.findCinema;
                ajax({
                    url:"/cinemas/find",
                    data:{page:this.allCinemas.curpage,rows:this.allCinemas.eachpage,...findCinema},
                    success:(data)=>{
                        store.commit(SHOW_ALL_CINEMAS,data);
                    }
                })
            },
        },
        computed:{
            ...mapState({
                data:state=>state.moviesRel.data,
                findMovie:state=>state.moviesRel.findMovie,
                allCinemas:state=>state.moviesRel.allCinemas,
            })
        },
        watch:{
            "$route":function(){
                store.commit(FIND_MOVIES,{});
                let obj = this.data;
                obj.eachpage = 6;
                store.commit(SHOW_MOVIES_LINKED,obj);
                this.show();
            }
        } 
    }
</script>
<style>
    .topPanel{
        display: flex;
        width: 650px;
        justify-content: space-between;
        margin: 10px 0;
    }
    .title{
        text-align: center;
        margin-top:10px;
        margin-bottom: 20px;
        letter-spacing: 5px;
        color: blue;
        
    }
</style>
