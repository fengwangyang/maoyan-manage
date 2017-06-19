<template>
    <el-dialog :visible.sync="isVisible" :title="editMovie.cName" :before-close="close" size="large" top="20px">
        <CinemasTable :show="show" :data="editMovie.cinemas" :getSelect="getSelect" :isShow="true" :addSession="addSession"></CinemasTable>
<!--         <Page :show="showCinemas" :handleSizeChange="handleSizeChange" :goTo="goTo" :data="{rows:editMovie.cinemas}"></Page>-->
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button icon="delete" type="primary" @click="confirmRemove">移除关联影院</el-button>
          </div>
    </el-dialog>
</template>
<script>
    import CinemasTable from "./CinemasTable";
    import Page from "./Page";
    import {mapState} from "vuex";
    import {ajax} from "@/components/common/ajax";
    import {SWITCH_VISIBLE,SHOW_MOVIE_CINEMAS} from "@/store/moviesRel/mutations"
    import store from "@/store"
    
    export default{
        data(){
            return {
                selectedData:[]
            }
        },
        components:{CinemasTable,Page},
        props:["title","show"],
        computed:{
            ...mapState({
                isVisible:state=>state.moviesRel.cinemaVisible,
                editMovie:state=>state.moviesRel.editMovie
            })
        },
        methods:{
            getSelect(selection){
                this.selectedData = selection;
            },
            close(){
                store.commit(SWITCH_VISIBLE,false);
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
                                this.close();
                                this.show();
                            }
                        })
                    })
                }else{
                    this.$alert("未选择关联影院！","提示",{
                        confirmButtonText:"确认"
                    })
                }
            },
            addSession(house,cinema){
                console.log(house,cinema)
                
            }
        }
    }
</script>
