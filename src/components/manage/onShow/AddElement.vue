<template>
   <div>
       <el-button type="success" @click="dialogTableVisible = true" icon='plus'>添加</el-button>

        <el-dialog title="添加" :visible.sync="dialogTableVisible" size='large'>
        
       <el-button type="info" class='btnstyel' @click='confirmAdd'>确认添加</el-button>
    <el-button type="danger" class=btnstyel @click='cancelAdd'>取消添加</el-button>
    
         <el-table
           ref='multipleTable'
            :data="onhotMoviesData.rows"
            border
            style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="电影中文名" prop="cName"
              width="120" :show-overflow-tooltip=true>

            </el-table-column>
            <el-table-column
              prop="eName"
              label="电影英文名"
              width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型" width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="staffs"
              label="演职人员" width="120" :show-overflow-tooltip=true>
              <template scope='scope'>
                 <span v-for='actor in scope.row.staffs'>{{actor.staffName+","}}</span>
               </template>
              </el-table-column>
            <el-table-column
              prop="scor"
              label="评分" width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="favor"
              label="喜欢" width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="area"
              label="地区" width="120" :show-overflow-tooltip=true>
            </el-table-column>

            <el-table-column
              prop="year"
              label="年代(年份)" width="120" :show-overflow-tooltip=true>
            </el-table-column>
            <el-table-column
              prop="duration"
              label="时长(分钟)" width="120" :show-overflow-tooltip=true>
            </el-table-column>
             <el-table-column
                  label="上映时间" width="120" :show-overflow-tooltip=true align='center'>
                  <template scope='scope'>
                     <span>{{new Date(scope.row.releaseDate).toLocaleDateString()}}</span>
                   </template>
                </el-table-column>

            <el-table-column
              prop="releaseArea"
              label="上映地区" width="120" :show-overflow-tooltip=true>
            </el-table-column>

            <el-table-column
              prop="poster"
              label="图集" width="120" :show-overflow-tooltip=true>
            </el-table-column>
          </el-table>
          
          <el-pagination
      @size-change=""
      @current-change="handleCurpage"
      :current-page.sync="onhotMoviesData.curpage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="onhotMoviesData.total" style='float:right'>
    </el-pagination>
   </el-dialog>
     </div>
   
    </template>
<script>
import {ajax} from "@/components/common/ajax";
import {mapState} from "vuex";
    export default {
        props:['showOnhot','showMoviesData'],
        data:function(){
            return {
                dialogTableVisible: false,
                checkedData:[],
                alldata:[]
            }
        },
       created:function(){
           this.findAllData();
       },
        methods:{
            handleSelectionChange(val) {
                 this.checkedData=val;
                },
            handleCurpage:function(val){
                this.showMoviesData(val);
            },
            findAllData:function(){
                ajax({
                    type:'get',
                    url:'/hotbroadcast/find',
                    data:{},
                    success:(data)=>{
                       this.alldata = data
                    }
                })
            },
            
            confirmAdd:function(){
                let str='';
                let num =0;
                 for(let i=0;i<this.alldata.length;i++){
                   
                    for(let j=0;j<this.checkedData.length;j++){
                        
                        if(this.alldata[i].cName== this.checkedData[j].cName){
                            this.checkedData.splice(j--,1);
                        }
                    }
                }
                for(let i of this.checkedData){
                    str += i.cName  +' ';
                    num++;
                }
                
                if(this.checkedData == 0){
                    
                     this.$confirm('数据已添加，请重新选择?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                          this.$message({
                            type: 'success'
                          
                          });
                        }).catch(() => {
                          this.$message({
                            type: 'info'
                        
                          });          
                        });
                 }else{
                let addmovies = JSON.stringify(this.checkedData);
                this.$confirm('确认添加'+str+'这'+num+'数据?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                          ajax({
                            type:'get',
                            url:'/hotbroadcast/add',
                            data:{
                                submitType:"addMore",
                                data:addmovies
                            },
                            success:(data)=>{
                                this.showOnhot(this.curpage);
                                this.dialogTableVisible= false;
                                 this.$refs.multipleTable.clearSelection();
                                 this.$message({
                                      type: 'success',
                                        message: '添加成功!'
                            })
                        }
                      })
                    }).catch(() => {
                this.$refs.multipleTable.clearSelection();
                      this.$message({
                        type: 'info',
                        message: '已取消添加'
                      });          
                    }); 
                    }
            },
            cancelAdd:function(){
                
                this.dialogTableVisible = false;
                this.$refs.multipleTable.clearSelection();
            }
        },
        computed:{
            ...mapState({
            onhotMoviesData:state=>state.moviesAll.onhotMoviesData,
             onshowData:state=>state.moviesAll.onshowData.rows,
            curpage:state=>state.moviesAll.onhotData.curpage
        })
        }
    }

</script>


<style scoped>
    .btnstyel{
        float:left;
        margin:10px;
    }



</style>