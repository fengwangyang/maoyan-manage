<template lang="html">
      <el-row>
          <el-table 
              ref='multipleTable'
              class='tab' border
              :data="data.rows"
              style="width:100%"
              @selection-change='handleSelection'>
              <el-table-column :show-overflow-tooltip='true'  type="selection" width="55"></el-table-column>
              <el-table-column :show-overflow-tooltip='true'  prop="newsTitle" label='资讯标题'></el-table-column>
              <el-table-column :show-overflow-tooltip='true'   prop="movies" label='关联影片'></el-table-column>
              <el-table-column :show-overflow-tooltip='true'   prop="mainText" label='资讯正文'></el-table-column>
              <el-table-column :show-overflow-tooltip='true'   prop="Release" label='图片路径'></el-table-column>
              
              <el-table-column label='操作'>
                  <template scope='scope'>
                      <el-button type="success" @click='edit(scope.row)' size="small">编辑</el-button>
                  </template>
              </el-table-column>
          </el-table>
    
   <Newedit :show='show'></Newedit>
    
     <el-pagination
      style="marginTop:10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.curpage"
      :page-sizes="[5,6,7]"
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
import Newedit from "./Newedit"
export default {
     components:{
        Newedit
    },
    props:[
        'show'
    ],
        data() {
      return {
        checked:true,
        obj:[]
      }
     },
       methods:{
        edit(rows){
           ajax({
               type:"get",
               url:"/news/find",
               data:{_id:rows._id},
               success:(data)=>{
                   store.commit('EDIT_DATA',data);
                   store.commit('EDIT_VISBLE',true)
               }
           }) 
           
        },
       handleSelection(val){
           
           for(var i = 0;i < val.length;i++){
               this.obj.push(val[i]._id)
           }
           store.commit('DEL_DATA',this.obj)
            
       },     
       handleSizeChange(rows){
           var datas = this.data
           datas.eachpage = rows
           store.commit('NEWS_DATA',datas)
//           this.show(rows,datas.curpage)
       },
       handleCurrentChange(val){
        this.data.curpage = val
        this.show(val,5,this.search.type,this.search.value)
        
       }  
      },
      created:function(){
      
      },
       computed:{
        ...mapState({
            search:state => state.news.search,
            data:state => state.news.newdata,
            deldata:state => state.news.delData,
//            editdata:state => state.news.editdata,
            editVisble:state => state.news.editVisble
        })
    }
}
    
 
</script>




<style lang="css">
 .tab{    
        text-align: center;
         overflow: hidden;
    }
    .item_A{
         height: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        background: #999999
    }

</style>