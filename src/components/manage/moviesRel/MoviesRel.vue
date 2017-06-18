<template>

<div>
   <div class="topPanel">
        <SearchForm :show='show'></SearchForm><el-button type="success" @click="initalTable">刷新</el-button><AddMovieTable :freshTable="show"></AddMovieTable><el-button type="warning" icon="delete" @click="delData">批量删除</el-button>
   </div>
    <MainTable tableRef="linkedMovie" :show='show' :data="data.rows" :getUpdateData="getUpdateData" :isShow="true" :addToSelect="addToSelect" :openCinemas="openCinemas"></MainTable>
    <Page :show="show" :handleSizeChange="handleSizeChange" :goTo="goTo" :data="data"></Page>
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
    import {SHOW_MOVIES_LINKED,FIND_MOVIES,SHOW_MOVIE_CINEMAS,SHOW_ALL_CINEMAS,SWITCH_VISIBLE,SWITCH_VISIBLE_ADD} from "@/store/moviesRel/mutations";
    import {mapState} from "vuex";
    import Page from "./Page";
    import {ajax} from "@/components/common/ajax";
    import store from "@/store";
    
    export default {
        data:function(){
            return {
//                data:{rows:[],eachpage:10,maxpage:"",curpage:1}
                delDatas:[],
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
                if(data.cinemas){
                    store.commit(SWITCH_VISIBLE,true);
                    store.commit(SHOW_MOVIE_CINEMAS,data);
                }else{
                    this.$alert("没有关联影院，请添加关联影院","提示",{
                        confirmButtonText: '确定'
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
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
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
                ajax({
                    url:"/cinemas/find",
                    data:{page:this.allCinemas.curpage,rows:this.allCinemas.rows},
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
        margin: 20px 0;
    }
</style>
