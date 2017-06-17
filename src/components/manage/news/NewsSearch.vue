    <template>
    <el-row>
                     <el-col :span='8'>
                      <el-input v-model='searintVal' placeholder="请输入内容" >
                        <el-select v-model='searchVal' slot="prepend" placeholder="请选择">
                          <el-option value='newsTitle' label="资讯标题"></el-option>
                          <el-option value='movies' label="关联影片"></el-option>
                          <el-option value='mainText' label="资讯正文"></el-option>
                          <el-option value='Release' label="上映时间"></el-option>
                        </el-select>
                        <el-button @click='searchFrom' slot="append" icon="search"></el-button>
                      </el-input>
                     </el-col>
                     
                  

              <el-col :span="2">
                <template>
                      <el-button @click='dislogVisble=true' type="success">增加</el-button>
                </template>
              </el-col>
               
                <el-col :span="1">
                <template>
                      <el-button @click='delFrom' type="danger">删除</el-button>
                </template>
              </el-col>
              
               
    
                 
                  
                    <el-dialog :visible.sync="dislogVisble" :model='true'>
                    <el-form :model='newValue' class="form">
                           
                      <el-form-item label='资讯标题' class="flx">
                        <el-input :style='inputType' v-model='newValue.newsTitleValue'></el-input>
                      </el-form-item>
                      
                      <el-form-item label='关联影片' class="flx">
                        <el-input :style='inputType' v-model='newValue.newsmovies'></el-input>
                      </el-form-item>
                        
                     <el-form-item label='资讯正文' class="flx">
                        <el-input :style='inputType' v-model='newValue.newsmainText'></el-input>
                     </el-form-item>
                    
                     <el-form-item label='上映时间' class="flx">
                        <el-input :style='inputType' v-model='newValue.newsRelease'></el-input>
                     </el-form-item>
                                
                    

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
                    dislogVisble:this.isclose,
                    newValue:{
                        newsTitleValue:"",
                        newsmovies:"",
                        newsmainText:"",
                        newsRelease:"",
                    },
                    searchVal:"",
                    searintVal:""
                }
            },
            created:function(){
                console.log(this.newValue.newsTitleValue)
            },
            methods:{
                delFrom(){
                    
                    
                },
                searchFrom(){
                   this.search.type = this.searchVal;
                    this.search.value = this.searintVal;
                 let obj = {}
                 obj[this.searchVal]=this.searintVal
                 ajax({
                     type:'post',
                     url:'/news/find',
                     data:obj,
                     success:function(){
                         this.show()
                     }.bind(this)
                 })
                },
                add(){
                    
                },
                newsAddFrom(){
                   ajax({
                       type:'post',
                       url:'/news/add',
                       data:{
                           newsTitle:this.newValue.newsTitleValue,
                           movies:this.newValue.newsmovies,
                           mainText:this.newValue.newsmainText,
                           Release:this.newValue.newsRelease,
                       },
                       success:function(data){
                           this.dislogVisble=false
                           this.show()
                           this.newValue.newsTitleValue="",
                               this.newValue.newsmovies="",
                               this.newValue.newsmainText="",
                               this.newValue.newsRelease=""
                       }.bind(this)
                   })
                }
            },
            computed:{
                ...mapState({
                    search:state => state.news.search
                })
            }
        }
        
    
    </script>
<style lang="css">
    .item{
        width: 80%;
        margin: auto;
        margin-top: 10px;
    }
    .flx{
        width: 70%;
        display: flex;
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