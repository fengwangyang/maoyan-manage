<template>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="goTo"
          :current-page.sync="data.curpage"
          :page-sizes="[5,8,10]"
          :page-size="rowsVal"
          layout="total,sizes, prev, pager, next, jumper"
          :total="data.total">
        </el-pagination>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    import store from "@/store";
    import {SHOW_DATA} from "@/store/users/mutations"
    export default {
        props:["show"],
        data(){
            return{
                rowsVal:"",
                page:""
            }
        },
        methods:{
            handleSizeChange(val){
                this.rowsVal=val;
                console.log(val);
                this.show(this.page,val,this.type.searchType,this.type.searchValue);
                
            },
            goTo(e){
                console.log(e);
                this.page=e;
                this.show(e,this.rowsVal,this.type.searchType,this.type.searchValue);
                
            },
        },
        computed:{
            ...mapState({
            data:state => state.users.userData,
            type:state => state.users.findUsers
        })
        }
    }
</script>
<style>

</style>