<template>
 
     <el-row>
       <div class="rows">
        <h2>资讯管理</h2>
        <NewsSearch :show='show'></NewsSearch>
        <NewsTable :show='show'></NewsTable>
       </div>
       
     </el-row>
   

    

</template>
<script>
import {ajax} from '../../common/ajax'
import NewsSearch from './NewsSearch'
import NewsTable from './NewsTable'
import {mapState} from 'vuex'
import store from '@/store'
export default {
            data() {
              return {
                 
              }
            },
              components:{
              NewsSearch,NewsTable
            }, 
            created:function(){
                this.show()
                this.movie()
            },
            methods:{
               show(page=1,rows,type,value){
                   let obj = {}
                   if(type){
                       obj[type]=value
                   }
                   obj.page = page;
                   obj.rows = 6;
                    ajax({
                        type:"post",
                        url:"/news/find",
                        data:obj,
                        success:function(data){
                            store.commit("NEWS_DATA",data)
                    }.bind(this)
                    })
                },
                movie(){
                ajax({
                type:"post",
                url:"/movies/find",
                data:{},
                success:function(data){
                    store.commit("MOVIES_DATA",data)
                }
              })     
               }
            },
            computed:{
                ...mapState({
                    serach:state => state.news.search
                })
            }
            }        
</script>
<style>
    h2{    
/*        width: 100%;*/
        text-align: center;
        color: blue;
        margin-top: 20px;
    }
    .rows{
        width: 90;
        padding: 20px;
    }
    .sel{
        width: 100px;
    }
</style>
