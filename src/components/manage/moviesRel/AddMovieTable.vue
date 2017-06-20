<template>
    <div>
        <el-button icon="plus" type="success" @click="initTable">电影</el-button>
        <el-dialog top="20px" title="添加关联电影" :visible.sync="dialogTableVisible" class="moviesTable" size="small"  :modal="true">
             <div>
                
                <div class="seach_add">
                    <SearchForm :show='show' :optionData="options" :commitMutations="commitMutations" :newData="movies" holderText="搜索电影名/类型/地区" ></SearchForm>
                </div>
                 <MainTable tableRef="addMovies" :show='show' :data="movies.rows" :isShow="false" :addToSelect="addToSelect"></MainTable>
                <Page :show="show" :data="movies" :pageMutation="commitMutations[0]"></Page>
             </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确认添加</el-button>
              </div>
        </el-dialog>
    </div>
    
</template>
<script>
    import {ajax} from "@/components/common/ajax";
    import MainTable from "./MainTable";
    import Page from "./Page";
    import SearchForm from "./SearchForm";
    import {mapState} from "vuex";
    import store from "@/store";
    import {SHOW_ALL_MOVIES,SHOW_MOVIES_LINKED,FIND_MOVIES,FIND_ALL_MOVIE} from "@/store/moviesRel/mutations";

    export default {
        data:function(){
            return {
                dialogTableVisible:false,
                selectedData:[],
                options:[{text:"电影名",value:"cName"},{text:"地区",value:"area"},{text:"类型",value:"type"}],
                commitMutations:[SHOW_ALL_MOVIES,FIND_ALL_MOVIE],
            }
        },
        components:{MainTable,Page,SearchForm},
        created:function(){
            this.show()
        },
        props:["freshTable"],
        methods:{
            close(){
                this.dialogTableVisible = false
            },
            show(){
                let obj = {page:this.movies.curpage,rows:this.movies.eachpage,...this.$store.state.moviesRel.findMovies}
                ajax({
                    url:"/movies/find",
                    type:"post",
                    data:obj,
                    success:(data)=>{
                        store.commit(SHOW_ALL_MOVIES,data);
                    }
                })
            },
            confirmAdd(){
                if(this.selectedData.length > 0){
                    let selectedData= this.selectedData
                    ajax({
                        url:"/linkedMovies/find",
                        type:"post",
                        data:{},
                        success:(data)=>{
                            for(let j = 0;j < data.length;j++){
                                for(let i = 0;i < selectedData.length;i++){
                                    if(selectedData[i].cName == data[j].cName){
                                        selectedData.splice(i,1);
                                        i--;
                                    }
                                }
                            }
                            let objs = selectedData.map((val)=>{
                                delete val._id;
                                return val;
                            })
                            ajax({
                                url:"/linkedMovies/add",
                                data:{submitType:"addMore",data:JSON.stringify(objs)},
                                type:"post",
                                success:()=>{
                                    this.close()
                                    let mainData = this.$store.state.moviesRel.data;
                                    mainData.curpage = 1;
                                    store.commit(FIND_MOVIES,{});
                                    store.commit(SHOW_MOVIES_LINKED,mainData);
                                    this.freshTable();
                                }
                            })
                        }
                    });
                }else{
                    this.$alert("没有勾选电影，请勾选电影后确认添加","提示",{
                        confirmButtonText:"确定"
                    })
                }
                
            },
            addToSelect(selection){
                this.selectedData = selection;
            },
            initTable(){
                this.dialogTableVisible = true;
                store.commit(SHOW_ALL_MOVIES,{eachpage:8,curpage:1});
                this.show();
            }
        },
        computed:{
            ...mapState({
                movies:state=>state.moviesRel.movies,
            })
        }
    }
</script>
<style>
    .seach_add{
        margin-bottom: 8px;
    }
</style>