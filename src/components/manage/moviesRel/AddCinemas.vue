<template>
    <el-dialog :visible.sync="isVisible" :before-close="close" :title="editMovie.cName" top="20px">
        <CinemasTable :data="allCinemas.rows" :getSelect="getSelect" :addSession="addSession"></CinemasTable>
         <Page :show="showCinemas" :handleSizeChange="handleSizeChange" :goTo="goTo" :data="allCinemas"></Page>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button icon="share" type="primary" @click="confirmAdd">确认关联</el-button>
          </div>
    </el-dialog>
</template>
<script>
    import CinemasTable from "./CinemasTable";
    import Page from "./Page";
    import {ajax} from "@/components/common/ajax";
    import {mapState} from "vuex";
    import {SWITCH_VISIBLE_ADD,SHOW_ALL_CINEMAS} from "@/store/moviesRel/mutations"
    import store from "@/store"
    
    export default{
        components:{CinemasTable,Page},
        data(){
            return {
                selectedData:[]
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
                    this.$confirm(`确认添加影院到${this.editMovie.cName}?`,"确认", {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        
                    let obj = this.editMovie;
                    let linkedCinemas = obj.cinemas;
                    let selectedCinemas = this.selectedData;
                    if(linkedCinemas){
                       for(let i = 0;i < linkedCinemas;i++){
                            for(let j = 0;j < selectedCinemas.length; j ++){
                                if(linkedCinemas[i]._id == selectedCinemas[j]._id){
                                    selectedCinemas.splice(i--,1);
                                }
                            }
                        }
                        obj.cinemas = [...linkedCinemas,...selectedCinemas];
                    }else{
                        obj.cinemas = selectedCinemas
                    }
                        ajax({
                            url:"/linkedMovies/update",
                            type:"post",
                            data:{_id:obj._id,cinemas:JSON.stringify(obj.cinemas)},
                            success:()=>{
                                this.close();
                                this.showMain();
                            }
                        })
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消添加关联'
                      });          
                    });
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
            addSession(){
                
            }
        }
    }
</script>