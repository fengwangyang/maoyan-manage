<template>
    <div class="block">
      <el-pagination
        @size-change="handleCurrentChange"
        @current-change="goTo"
        :current-page="$store.state.data.curpage"
        :page-size="$store.state.data.eachpage"
        layout="prev, pager, next,total"
        :total="$store.state.data.total">
      </el-pagination>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    import store from "@/store";
    import {SHOW_DATA} from "@/store/users/mutations";
    export default {
        props:["show","goTo","nextPage","backPage"],
        methods:{
            handleCurrentChange(val){
                this.show(val);
            }
        },
        computed:{
            ...mapState({
            data:state => state.data
        })
        }
    }
</script>
<style>

</style>