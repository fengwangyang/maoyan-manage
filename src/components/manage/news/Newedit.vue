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
                        <el-input :style='inputType' v-model='editdata.mainText'></el-input>
                     </el-form-item>
                     
                     <el-form-item label='上映时间' class="flx">
                        <el-input :style='inputType' v-model='editdata.Release'></el-input>
                     </el-form-item>
                                
                    
                    
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
                selVal:""
            }
        },
        created:function(){
            
        },
        methods:{
            cancel(){
                 store.commit('EDIT_VISBLE',false)
            },
            close(){
                 store.commit('EDIT_VISBLE',false)
            },
            newEdit(){
                var obj = {
                    newsTitle:this.editdata.newsTitle,
                    movies:this.editValue,
                    mainText:this.editdata.mainText,
                    Release:this.editdata.Release,
                    _id:this.editdata._id
                }
                
                ajax({
                    type:"post",
                    url:"/news/update",
                    data:obj,
                    success:(data)=>{
                        console.log(99)
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
