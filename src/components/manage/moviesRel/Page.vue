<template>
        <div >
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
            
        },
    }
</script>
<style scope>
    .block{
        display: flex;
        margin-top: 6px;
        justify-content: center;
    }
</style>