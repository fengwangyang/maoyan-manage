<template lang=html>
                    <el-row>
                    <el-dialog :before-close='close' :visible.sync="editVisble" :model='true'>
                    <el-form :model='editdata'  class="form">
                           
                      <el-form-item label='资讯标题' class="flx">
                        <el-input :style='inputType' v-model='editdata.newsTitle'></el-input>
                      </el-form-item>
                      
                      <el-form-item label='关联影片' class="flx">
                        <el-select :style='inputType' @change='selmovies' v-model='editValue' :placeholder='editdata.movies'>
                            <el-option value='edititem.movies' v-for='edititem in data.rows' :label='edititem.movies'></el-option>
                        </el-select>
                      </el-form-item>
                        
                     <el-form-item label='资讯正文' class="flx">
                        <el-input type="textarea"
  autosize :style='inputType'  :autosize="{ minRows: 8, maxRows: 6}" v-model='editdata.mainText'></el-input>
                     </el-form-item>
                     
                     <el-upload :multiple='true' :on-success='sucimage' :on-preview="handlePreview" list-type="picture" :on-remove="handleRemove" :file-list='fileimg' class="upload" action='/upload'>
                         <el-button size='small' type='primary'>上传图片</el-button>
                     </el-upload>
                                
                    
                    
                        <div>
                            <el-button @click='cancel' class="btnA">取消</el-button>
                            <el-button @click='newEdit' class="btnB">确定</el-button>
                        </div>
                    </el-form>
        
                    </el-dialog>
                  
                    </el-row>
               
    
    
</template>


<script>
import {mapState} from 'vuex'
import store from '@/store'
import {ajax} from '../../common/ajax'
    export default{
        data(){
            return{
                editValue:"",
                inputType:"width:400px",
                selVal:"",
                fileimg:[]
            }
        },
        
        created:function(){
            
        },
        watch:{
                editdata:function(){
                   this.editdata.Release.forEach(function(ele){
                       var frleName = ele.substring(ele.lastIndexOf("/")+1)
                       this.fileimg.push({
                           name:frleName,
                           url:"http://127.0.0.1:3000/img/"+frleName
                       })
                    }.bind(this))
                }
                
        },
        methods:{
            sucimage(){
               console.log(this.fileimg)
            },
            handlePreview(){
                
            },
            handleRemove(){
                console.log(this.editdata)
            },
            cancel(){
                this.fileimg=[]
                 store.commit('EDIT_VISBLE',false)
            },
            close(){
                 store.commit('EDIT_VISBLE',false)
            },
            newEdit(){
                var UpLoadRelease = JSON.stringify(this.editdata.Release)
                var obj = {
                    newsTitle:this.editdata.newsTitle,
                    movies:this.editValue,
                    mainText:this.editdata.mainText,
                    Release:UpLoadRelease,
                    _id:this.editdata._id
                }
               
                ajax({
                    type:"post",
                    url:"/news/update",
                    data:obj,
                    success:(data)=>{
                        this.fileimg=[]
                        this.show()
                        store.commit('EDIT_VISBLE',false)
                    }
                })
            },    
            
            selmovies(e){
           console.log(e)
          }  
        },
        props:['show'],
        computed:{
            ...mapState({
                editdata:state => state.news.editdata,
                data:state => state.news.newdata,
                editVisble:state => state.news.editVisble
            })
        }
    }


</script>
<style>

</style>
