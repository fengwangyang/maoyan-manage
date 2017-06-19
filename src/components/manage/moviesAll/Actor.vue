<template>
    <el-form :model="actor" label-position="right">
        <el-form-item label="演员"  label-width="80px">
          <el-input v-model="actor.staffName" auto-complete="off" style='width:200px'></el-input>
        </el-form-item>
         <el-form-item label="角色"  label-width="80px">
          <el-input v-model="actor.role" auto-complete="off" style='width:200px'></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo posterstyle"
          action="/upload"
          list-type="picture"
          :on-success="handleResActor"
           :on-remove="handleRemoveActor"
            :file-list="fileListActor">
          <el-button type="primary">演员图片</el-button>
         </el-upload>
   </el-form>
</template>
<script>
   import {mapState} from "vuex"; 
    import store from "@/store";
    export default{
        data(){
            return {
                
            }
        },
        props:["actor","fileListActor","index"],
        methods:{
            handleResActor(response){
                let editData = this.editData;
                editData.staffs[this.index].picture = response;
                store.commit("MOVIESALL_UPDATEDATA",editData);
            },
            handleRemoveActor(file, fileList){
                let editData = this.editData;
                editData.staffs[this.index].picture = '';
                store.commit("MOVIESALL_UPDATEDATA",editData);
            },
        },
        computed:{
        ...mapState({
            staffs:state=>state.moviesAll.updateData.staffs,
            editData:state=>state.moviesAll.updateData,
        })
    }
    }
</script>


<style scpoed>

.posterstyle{
        width:300px;
        margin:10px auto;
    }

</style>