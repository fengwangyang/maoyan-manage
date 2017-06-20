<template>
    <el-dialog :visible.sync="isVisible" :before-close="close" :title="editMovie.cName" top="20px">
      <div class="search_cinema">
          <SearchForm :show='showCinemas' :optionData="options" :commitMutations="commitMutations" :newData="allCinemas" holderText="请输入影院名/所在地区"></SearchForm>
      </div>
        <CinemasTable :data="allCinemas.rows" :getSelect="getSelect"></CinemasTable>
         <Page :show="showCinemas" :handleSizeChange="handleSizeChange" :goTo="goTo" :data="allCinemas"></Page>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button icon="share" type="primary" @click="confirmAdd">确认关联</el-button>
          </div>
    </el-dialog>
</template>
<script>
    import CinemasTable from "./CinemasTable";
    import SearchForm from "./SearchForm";
    import Page from "./Page";
    import {ajax} from "@/components/common/ajax";
    import {mapState} from "vuex";
    import {SWITCH_VISIBLE_ADD,SHOW_ALL_CINEMAS,SWITCH_VISIBLE,FIND_CINEMA} from "@/store/moviesRel/mutations"
    import store from "@/store"
    
    export default{
        components:{CinemasTable,Page,SearchForm},
        data(){
            return {
                selectedData:[],
                options:[{text:"院线名",value:"cinemaName"},{text:"地区",value:"area"}],
                commitMutations:[SHOW_ALL_CINEMAS,FIND_CINEMA]
            }
        },
        computed:{
            ...mapState({
                isVisible:state=>state.moviesRel.addCinemaVisible,
                allCinemas:state=>state.moviesRel.allCinemas,
                editMovie:state=>state.moviesRel.editMovie,
            })
        },
        props:["showMain","showCinemas"],
        created(){
            this.showCinemas()
        },
        methods:{
            close(){
                store.commit(SWITCH_VISIBLE_ADD,false);
            },
            getSelect(selection){
                this.selectedData = selection;
            },
            confirmAdd(){
                if(this.selectedData.length > 0){
                    let obj = this.editMovie;
                    let linkedCinemas = obj.cinemas;
                    let selectedCinemas = this.selectedData;
                    if(linkedCinemas){
                       for(let i = 0;i < linkedCinemas.length;i++){
                            for(let j = 0;j < selectedCinemas.length; j ++){
                                if(linkedCinemas[i]._id == selectedCinemas[j]._id){
                                    selectedCinemas.splice(j--,1);
                                }
                            }
                        }
                        obj.cinemas = [...linkedCinemas,...selectedCinemas];
                    }else{
                        obj.cinemas = selectedCinemas
                    }
                    if(selectedCinemas.length > 0){
                        this.$confirm(`确认添加${selectedCinemas.length}家影院到${this.editMovie.cName}?`,"确认", {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            ajax({
                                url:"/linkedMovies/update",
                                type:"post",
                                data:{_id:obj._id,cinemas:JSON.stringify(obj.cinemas)},
                                success:()=>{
                                    this.close();
                                    store.commit(SWITCH_VISIBLE,true);
                                    this.showMain();
                                }
                            })
                        }).catch(() => {
                          this.$message({
                            type: 'info',
                            message: '已取消添加关联影院'
                          });          
                        }); 
                    }else{
                        this.$alert("选择的影院已关联，请重新选择","提示",{
                            confirmButtonText:"确定"
                        })
                    }

                }else{
                    this.$alert("没有选择影院，请选择后添加","提示",{
                        confirmButtonText: '确定'
                    })
                }
            },
            handleSizeChange(rows){
                let newData = this.allCinemas;
                newData.eachpage = rows;
                store.commit(SHOW_ALL_CINEMAS,newData);
                this.showCinemas()
            },
            goTo(nowpage){
                let newData = this.allCinemas;
                newData.curpage = nowpage;
                store.commit(SHOW_ALL_CINEMAS,newData);
                this.showCinemas()
            },
            searchData(){
                if(this.value){
                    let obj = {};
                    obj[this.attr] = this.value;
                    store.commit(FIND_MOVIES,obj);
                    let newData = this.$store.state.moviesRel.data;
                    newData.curpage = 1;
                    store.commit(SHOW_MOVIES_LINKED,newData);
                    this.show();
                }else{
                    this.$alert("请输入完整的信息","提示",{
                        confirmButtonText: '确定'
                    })
                } 
            }
        }
    }
</script>
<style>
    .search_cinema{
        margin-bottom: 8px;
    }
</style>