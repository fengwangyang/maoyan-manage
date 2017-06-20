<template>
    <el-dialog :visible.sync="isVisible" :title="`《${editMovie.cName}》的已关联影院`" :before-close="close" size="small" top="20px">
         <div class="search_linked_cinema">
          <SearchForm :show='showCinemas' :optionData="options" :commitMutations="commitMutations" :newData="linkedCinemas" holderText="请输入影院名/所在地区"></SearchForm>
      </div>
        <CinemasTable :show="show" :data="linkedCinemas.rows" :getSelect="getSelect" :isShow="true"></CinemasTable>
         <Page :show="showCinemas" :data="linkedCinemas" :pageMutation="commitMutations[0]"></Page>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">关闭</el-button>
            <el-button icon="delete" type="primary" @click="confirmRemove">移除关联影院</el-button>
          </div>
    </el-dialog>
</template>
<script>
    import CinemasTable from "./CinemasTable";
    import SearchForm from "./SearchForm";
    import Page from "./Page";
    import {mapState} from "vuex";
    import {ajax} from "@/components/common/ajax";
    import {SWITCH_VISIBLE,SHOW_MOVIE_CINEMAS,SHOW_LINKED_CINEMAS,FIND_LINKED_CINEMA} from "@/store/moviesRel/mutations"
    import store from "@/store"
    
    export default{
        data(){
            return {
                selectedData:[],
                options:[{text:"院线名",value:"cinemaName"},{text:"地区",value:"area"}],
                commitMutations:[SHOW_LINKED_CINEMAS,FIND_LINKED_CINEMA],
            }
        },
        components:{CinemasTable,Page,SearchForm},
        props:["title","show"],
        computed:{
            ...mapState({
                isVisible:state=>state.moviesRel.cinemaVisible,
                editMovie:state=>state.moviesRel.editMovie,
                linkedCinemas:state=>state.moviesRel.linkedCinemas,
                linkedCinema:state=>state.moviesRel.linkedCinema,
                isOpen:state=>state.moviesRel.cinemaVisible
            })
        },
        methods:{
            initData(){
                store.commit(FIND_LINKED_CINEMA,{});
                store.commit(SHOW_LINKED_CINEMAS,{rows:[],eachpage:5,curpage:1});
                this.showCinemas();
            },
            showCinemas(){
                let store_linkedCinemas = this.linkedCinemas;
                let linkedCinemas = this.editMovie.cinemas;
                let startIndex = (store_linkedCinemas.curpage-1)*store_linkedCinemas.eachpage;
                let endIndex = store_linkedCinemas.curpage*store_linkedCinemas.eachpage;
                let findCinemas = [];
                for(let i = 0;i < this.editMovie.cinemas.length;i++){
                    if(this.linkedCinema.area || this.linkedCinema.cinemaName){
                        for(let k in this.linkedCinema){
                            if(new RegExp(this.linkedCinema[k]).test(linkedCinemas[i][k])){
                                findCinemas.push(linkedCinemas[i]);
                            }
                        }
                    }else{
                        findCinemas = linkedCinemas;
                    }
                }
                store_linkedCinemas.rows = findCinemas.slice(startIndex,endIndex);
                store_linkedCinemas.total = findCinemas.length;
                store.commit(SHOW_LINKED_CINEMAS,store_linkedCinemas);
            },
            getSelect(selection){
                this.selectedData = selection;
            },
            close(){
                store.commit(SWITCH_VISIBLE,false);
            },
            confirmRemove(){
                if(this.selectedData.length > 0){
                    this.$confirm(`确认移除已选影院与${this.editMovie.cName}的关联`,"确认",{
                        confirmButtonText:"确认",
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        let selectedData = this.selectedData;
                        let linkedCinemas = [...this.editMovie.cinemas];
                        for(let i = 0;i < selectedData.length;i++){
                            for(let j = 0;j < linkedCinemas.length;j++){
                                if(selectedData[i]._id == linkedCinemas[j]._id){
                                    linkedCinemas.splice(j--,1);
                                }
                            }
                        }
                        ajax({
                            url:"/linkedMovies/update",
                            data:{_id:this.editMovie._id,cinemas:JSON.stringify(linkedCinemas)},
                            type:"post",
                            success:()=>{
                                this.show();
//                                this.showCinemas();
                                this.close();
                            }
                        })
                    })
                }else{
                    this.$alert("未选择关联影院！","提示",{
                        confirmButtonText:"确认"
                    })
                }
            }
        },
        watch:{
            isOpen:function(){
                if(this.editMovie.cinemas && this.editMovie.cinemas.length>0){
                    store.commit(FIND_LINKED_CINEMA,{});
                    store.commit(SHOW_LINKED_CINEMAS,{rows:[],eachpage:6,curpage:1});
                    this.showCinemas();
                }
            }
        }
    }
</script>
<style>
    .search_linked_cinema{
        margin-bottom: 8px;
        display: flex;
    }
</style>
