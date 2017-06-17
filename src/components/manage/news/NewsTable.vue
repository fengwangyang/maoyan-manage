<template lang="html">
      <el-row>
          <el-table class='tab' border :data="data.rows" style="width:100%">
              <el-table-column v-model='id' type="selection" width="55"></el-table-column>
              <el-table-column value="_id" prop="newsTitle" label='资讯标题'></el-table-column>
              <el-table-column value="_id" prop="movies" label='关联影片'></el-table-column>
              <el-table-column value="_id" prop="mainText" label='资讯正文'></el-table-column>
              <el-table-column value="_id" prop="Release" label='上映时间'></el-table-column>
              
              <el-table-column label='操作'>
                  <template scope='scope'>
                      <el-button type="success" @click='edit' size="small">编辑</el-button>
                  </template>
              </el-table-column>
          </el-table>
          
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.curpage"
      :page-sizes="[6, 8, 10]"
      :page-size="data.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total">
    </el-pagination>
  
      </el-row>
</template>




<script>
import store from "@/store"
import {ajax} from "../../common/ajax"
import {mapState} from "vuex"
export default {
    props:[
        'show'
    ],
        data() {
      return {
        checked:true,
        id:""  
      }
    },
       methods:{
       handleSizeChange(rows){
           this.data.eachpage = rows
           store.commit('NEWS_DATA',this.data)
           this.show()
       },
       handleCurrentChange(val){
        this.data.curpage = val
        store.commit('NEWS_DATA',this.data)
        this.show()
       },
       edit(){
           
       }    
    },
    created:function(){
        console.log("AAAs",this.data)
    },
    computed:{
        ...mapState({
            data:state => state.news.newdata 
        })
    }
}
    
 
</script>




<style lang="css">
 .tab{    
        text-align: center;
    }


</style>