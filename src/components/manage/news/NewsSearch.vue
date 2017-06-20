    <template>
    <el-row>
              <div class="table">
                        
                  
                      <el-col>
                      <el-input  :style='inputType' v-model='searintVal' placeholder="请输入内容" style="width:400px;">
                          <el-select v-model='searchVal' slot="prepend" class='select' placeholder="请选择" >
                          <el-option value='newsTitle' label="资讯标题"></el-option>
                          <el-option value='movies' label="关联影片"></el-option>
                          <el-option value='mainText' label="资讯正文"></el-option>
                          <el-option value='Release' label="上映时间"></el-option>
                          </el-select>
                          <el-button @click='searchFrom' slot="append" icon="search">搜索</el-button>
                      </el-input>
                      
                     </el-col>
                     
<!--                  增加 删除按钮-->
                
                
              <el-col>
                <el-button class='elbut' @click='shows' type="primary" style="marginLeft:20px">刷新</el-button>
              </el-col>
               
              <el-col>
                <el-button class='elbut' @click='dislogVisble=true' icon="plus" type="success"  style="marginLeft:20px">添加</el-button>
              </el-col>
               
              <el-col>
                    <el-button class='elbut' @click='delFrom' icon="delete" type="warning"  style="marginLeft:20px">删除</el-button>
              </el-col>
               </div>
               
    
<!--                 增加框-->
                  
                      <el-dialog :visible.sync="dislogVisble" :model='true'>
                      <el-form :model='newValue' class="form">
                           
                      <el-form-item label-width='80px' label='资讯标题' class="flx">
                       <el-input @input='newsjudge' :style='inputType' v-model='newValue.newsTitleValue'></el-input>
                      </el-form-item>
                        
                       
                       <el-form-item label-width='80px' label='关联影片' class="flx">
                       <el-select @visible-change='addmovie' :multiple=true :style='inputType' v-model='moviesValue'>
                           <el-option :key="index" v-for='(addmovies,index) in movies ' :label='addmovies.movies' :value='addmovies.movies'>
                           </el-option>
                       </el-select>
                      </el-form-item>
                        
                     <el-form-item label-width='80px' label='资讯正文' class="flx">
                        <el-input type="textarea"
  :autosize="{ minRows: 8, maxRows: 6}" :style='inputType' v-model='newValue.newsmainText'></el-input>
                     </el-form-item>
<!--                             图片上传   -->
                     <el-upload  :multiple='true' :on-success='sucimage' :on-preview="handlePreview" list-type="picture" :on-remove="handleRemove" class="upload" action='/upload'>
                         <el-button size='small' type='primary'>上传图片</el-button>
                     </el-upload>
                     
<!--                    －－－－-->
                        <div>
                            <el-button @click='dislogVisble = false' class="btnA">取消</el-button>
                            <el-button @click='newsAddFrom' class="btnB">确定</el-button>
                        </div>
                      </el-form>
        
                  </el-dialog>
                  
       
    </el-row>
     
    
     
    
    </template>
    
    <script>
import {ajax} from "../../common/ajax"       
import {mapState} from "vuex"
import store from "@/store"
        export default{
            props:['newAddFrom','show'],
            data(){
                return {
                    inputType:"width:400px",
                    moviesValue:"",
                    dislogVisble:this.isclose,
                    newValue:{
                        newsTitleValue:"",
                        newsmovies:"",
                        newsmainText:"",
                        newsRelease:[],
                    },
                    searchVal:"newsTitle",
                    searintVal:""
                }
            },
            methods:{
                shows(){
                    this.show()
                },
                newsjudge(e){
                   
                    
                },
                sucimage(response,file,fileList){
//                   store.commit('UPLOAD_DATA',response)
                   this.newValue.newsRelease.push(response)
                },
                handleRemove(file, fileList){
                     
                     this.newValue.newsRelease.splice(this.newValue.newsRelease.indexOf(file.url),1)
                   
                     
                    
            
                
                },
                handlePreview(file){
                  
                    
                    
            
                
                },
                addmovie(val){
                    console.log(val)
                    
                    this.newValue.newsmovies = val;
            
                
                },
                delFrom(){
                    
                    let deldata = JSON.stringify(this.deldata)
                    var str="";
              
                    ajax({
                        type:'post',
                        url:'/news/del',
                        data:{
                            ids:deldata
                        },
                        success:()=>{
                            this.show()
                            this.deldata=[]
                        }
                    })
                    
                },
                searchFrom(){
                
                    
                 this.search.type = this.searchVal;
                 this.search.value = this.searintVal;
                 let obj = {}
                 obj[this.searchVal]=this.searintVal
                 this.show(1,5,this.searchVal,this.searintVal)
                 store.commit('SEARCH_DATA',obj)
                
                
                },
                newsAddFrom(){
                    var UpLoadRelease = JSON.stringify(this.newValue.newsRelease)
                    console.log(UpLoadRelease)
                    this.$confirm('是否确定增加数据' ,'提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'warning'
                    }).then(()=>{
                    
                        ajax({
                        type:'post',
                        url:'/news/add',
                        data:{
                           newsTitle:this.newValue.newsTitleValue,
                           movies:this.moviesValue,
                           mainText:this.newValue.newsmainText,
                           Release:UpLoadRelease,
                        },
                        success:function(data){
                            console.log(UpLoadRelease)
                            this.$confirm({
                            type:'success',
                            message:'添加成功'
                        })
                           this.dislogVisble=false
                           this.show()
                           this.newValue.newsTitleValue="",
                               this.newValue.newsmovies="",
                               this.newValue.newsmainText="",
                               this.newValue.newsRelease=[]
                        }.bind(this)
                    })
                      
                    }).catch(()=>{
                        this.$confirm({
                            type:'info',
                            message:'已取消'
                        })
                    })
                    }
                    },
                    computed:{
                    ...mapState({
                    data:state => state.news.newdata,
                    search:state => state.news.search,
                    deldata:state => state.news.delData,
                    uploadimg:state => state.news.uploadimg,
                    movies:state => state.news.movies    
                })
            }
        }
        
    
    </script>
<style lang="css">
    .table{
        width: 650px;
        display: flex;
        justify-content: space-between;
        margin-top:20px;
    }
    .elbut{
        margin-left: 15px;
    }
    .select{
     width: 120px;   
    }
    .upload{
        width: 70%;
        margin: auto;
    }
    .item{
        width: 90%;
        margin: auto;
        margin-top: 10px;
    }
    .flx{
        width: 70%;
        margin-left: 15%;
        margin-top: 20px;
        align-items: center;
        justify-content: space-between;
    }
     .btnA{
        margin-left: 240px;
        margin-top: 50px;
    }
    .btnB{
        margin-top: 50px;
    }
</style>