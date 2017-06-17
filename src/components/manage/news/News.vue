<template>
 
     <el-row>
        <h1>资讯管理</h1>
        <NewsSearch :show='show'></NewsSearch>
        <NewsTable :show='show'></NewsTable>
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
            },
            methods:{
               show(){
                 
                    let obj = {}
                    obj.page = this.$store.state.news.newdata.curpage;
                    obj.rows = this.$store.state.news.newdata.rechpage;
                    ajax({
                        type:"post",
                        url:"/news/find",
                        data:obj,
                        success:function(data){
                            store.commit("NEWS_DATA",data)
                    }.bind(this)
                    })
                },
                newAddFrom(){
                    console.log(99)
                }
            }
            }        
</script>
<style>
    .sel{
        width: 100px;
    }
</style>
