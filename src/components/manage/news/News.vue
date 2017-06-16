<template>
 
     <el-row>
        <h1>资讯管理</h1>
        <NewsSearch></NewsSearch>
        <NewsTable :datas='datas'></NewsTable>
     </el-row>
   

    

</template>
<script>
import {ajax} from '../../common/ajax'
import NewsSearch from './NewsSearch'
import NewsTable from './NewsTable'
 export default {
            data() {
              return {
                  datas:[]  
              }
            },
              components:{
              NewsSearch,NewsTable
              }, 
            created:function(){
                this.show()
                console.log("222",this.datas)
            },
            methods:{
                show(){
                    ajax({
                        type:"post",
                        url:"/maoyan/find",
                        data:{},
                        success:function(data){
                            this.datas = data
                            console.log(this.datas[0].move)
                        }.bind(this)
                    })
                }
            }
            }        
</script>
<style>
    .sel{
        width: 100px;
    }
</style>
