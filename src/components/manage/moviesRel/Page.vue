<template>
        <div class="block">
            <el-pagination
              @current-change="goTo"
              @size-change="handleSizeChange"
              :current-page="data.curpage"
              :page-size="data.eachpage"
              :page-sizes="[6, 8,10]"
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
//                let newData = this.data;
//                newData.eachpage = rows;
//                store.commit(SHOW_MOVIES_LINKED,newData);
//                this.show()
//            },
//            goTo(nowpage){
//                let newData = this.data;
//                newData.curpage = nowpage;
//                store.commit(SHOW_MOVIES_LINKED,newData);
//                this.show()
//            }
        },
    }
</script>