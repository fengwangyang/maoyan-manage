<template>
        <div class="block">
            <el-pagination
              @current-change="goTo"
              @size-change="handleSizeChange"
              :current-page="data.curpage"
              :page-size="data.eachpage"
              :page-sizes="[5,6,7,8]"
              layout="total,sizes, prev, pager, next, jumper"
              :total="data.total">
            </el-pagination>
        </div>
</template>
<script>
    export default {
        props:["show","handleSizeChange","goTo","data"],
        methods:{
//            handleSizeChange(rows){
//                let newData = this.movies;
//                newData.eachpage = rows;
//                store.commit(SHOW_ALL_MOVIES,newData);
//                this.show()
//            },
//            goTo(nowpage){
//                let newData = this.movies;
//                newData.curpage = nowpage;
//                store.commit(SHOW_ALL_MOVIES,newData);
//                this.show()
//            },
        },
    }
</script>
<style scope>
    .block{
/*        display: flex;*/
        margin-top: 6px;
/*        justify-content: center;*/
    }
</style>