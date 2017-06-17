<template>
    <el-dialog :visible.sync="isVisible" :title="title">
        <CinemasTable :data="editMovie.cinemas"></CinemasTable>
    </el-dialog>
</template>
<script>
    import CinemasTable from "./CinemasTable";
    import Page from "./Page";
    import {mapState} from "vuex";
    
    export default{
        components:{CinemasTable,Page},
        props:["title"],
        computed:{
            ...mapState({
                isVisible:state=>state.moviesRel.addCinemaVisible,
                editMovie:state=>state.moviesRel.editMovie
            })
        }
    }
</script>