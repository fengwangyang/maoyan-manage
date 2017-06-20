<template>
        <div class="block">
            <el-pagination
              @current-change="goTo"
              @size-change="handleSizeChange"
              :current-page="data.curpage"
              :page-size="data.eachpage"
              :page-sizes="[5,6,7]"
              layout="total,sizes, prev, pager, next, jumper"
              :total="data.total">
            </el-pagination>
        </div>
</template>
<script>
    import store from "@/store"
    
    export default {
        props:["show","data","pageMutation"],
        methods:{
            handleSizeChange(rows){
                let newData = this.data;
                newData.eachpage = rows;
                store.commit(this.pageMutation,newData);
                this.show()
            },
            goTo(nowpage){
                let newData = this.data;
                newData.curpage = nowpage;
                store.commit(this.pageMutation,newData);
                this.show()
            },
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