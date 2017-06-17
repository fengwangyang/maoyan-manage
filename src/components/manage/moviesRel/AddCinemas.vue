<template>
    <el-dialog :visible.sync="isVisible" :before-close="close" >
        <CinemasTable :data="allCinemas.rows"></CinemasTable>
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
        computed:{
            ...mapState({
                isVisible:state=>state.moviesRel.addCinemaVisible,
                allCinemas:state=>state.moviesRel.allCinemas
            })
        },
        props:[],
        created(){
            this.showCinemas()
        },
        methods:{
            close(){
                store.commit(SWITCH_VISIBLE_ADD,false);
            },
            confirmAdd(){
                
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
            showCinemas(){
                ajax({
                    url:"/cinemas/find",
                    data:{page:this.allCinemas.curpage,rows:this.allCinemas.rows},
                    success:(data)=>{
                        store.commit(SHOW_ALL_CINEMAS,data);
                    }
                })
            }
        }
    }
</script>