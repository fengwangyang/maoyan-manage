
<template>
    <div >
    <h2 class="cinemas_h3" style="marginTop:10px;textAlign:center" >院线管理</h2>
    <div style="marginTop:20px;overflow:hidden"> 
    <Search style="float:left;marginLeft:10px;" :show="show">
    </Search>
   
    <Add style="float:left; marginLeft:10px;" :show="show"></Add>
      <el-button
      style="float:left; marginLeft:10px"
          size="middle"
          icon="delete"
          type="warning"
          @click="remove">删除</el-button>
     </div>
    <Update :show="show"></Update>
 <div style="marginTop:10px">
  <el-table
  :data="tableData"
    border
    style="width: 100%"
    type="index"
    @selection-change="selectCheckbox"
    ref="multipleTable">
    
    <el-table-column
     type="selection"
      width="55"
     >
    </el-table-column>
    
    <el-table-column
      label="影院名称"
      width="180" 
       :show-overflow-tooltip=true>
      <template scope="scope">
         <span style="margin-left: 10px">{{ scope.row.cinemaName }}</span>
      </template>
    </el-table-column>
    
     <el-table-column
      label="影院地址"
      width="180"
      :show-overflow-tooltip=true>
      <template scope="scope">
         <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    
      <el-table-column
      label="影院电话"
      width="180"
      :show-overflow-tooltip=true>
      <template scope="scope">
         <span style="margin-left: 10px">{{ scope.row.tel }}</span>
      </template>
    </el-table-column>
    
      <el-table-column
      label="官方网站"
      width="180"
      :show-overflow-tooltip=true>
      <template scope="scope">
         <span style="margin-left: 10px">{{ scope.row.webAdress }}</span>
      </template>
    </el-table-column>
    
    
    
   
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          icon="edit"
          type="info"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
       
          
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div style="marginTop:10px">
  <Page :show="show"></Page>
  </div>
  </div>
</template>
<script>

    import {ajax} from "@/components/common/ajax"
    import Search from "./Search"
    import Add from "./Add"
    import Page from "./Page"
    import Update from "./Update"
    import store from "@/store"
    import {mapState} from "vuex"
    export default{
    
    data(){
        return {
        tableData:"",
        }
    },
       created(){
        this.show(1,5)
    },
     computed:{
        ...mapState({
              removeData:state=>state.cinemas.removeData,
                 })
        },
    methods:{
        show(page,row,type,value){
        let obj={};
        if(type){
            obj[type]=value
        }
         obj.page=page;
         obj.rows=row;
                ajax({
            type:"get",
            url:"/cinemas/find",
            data:obj,
            success:(data)=>{
            console.log(data);
             store.commit("ALL_DATA",data);
              this.tableData=data.rows;
                }
            })
        },
        selectCheckbox(row){
            store.commit("REMOVE_DATA",row);
        },
     
     remove(){
          let newRemoveData=[];
           let name;
           for (let i=0;i<this.removeData.length;i++){
            newRemoveData.push(this.removeData[i]._id);
            name=this.removeData[i].cinemaName;
       }
        
         this.$confirm('确认删除'+name+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        let newRemoveDataStr=JSON.stringify(newRemoveData);
                      ajax({
                        type:"post",
                        url:"/cinemas/del",
                        data:{ids:newRemoveDataStr},
                        success:()=>{
                        console.log(this.tableData);
                        this.show(this.tableData.curpage); 
                       
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                        
                    }
                })
           
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         
     },
     
     handleEdit(index,row){
     console.log(row);
        store.commit("UPDATE_DATA",row);
        store.commit("UPDATE_VISIBLE",true);
        store.commit("HOUSE_DATA",row.houses);
     }
    },
    components:{
    Add,Search,Page,Update
    }

}
 

</script>
<style scoped>
import 
.searchInput{
    float:"right";
    width:100px;
    }
.search{
    width:50px;
    }
.cinemas_h3{
         color:blue;
        margin:auto;
    }
</style>

