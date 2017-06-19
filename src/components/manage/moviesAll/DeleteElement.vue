<template>
    <div class='deletestyle'>
        <el-button type="warning" icon='delete' @click='deleteMovies'>删除</el-button>
        
    </div>
    
    
</template>


<script>
import {ajax} from "@/components/common/ajax";
import {mapState} from "vuex";
export default{
    props:['show'],
    methods:{
        deleteMovies:function(){
            let str = '';
            let array =[];
            let num=0;
            for(let i of this.deleteData){
                array.push(i._id);
                str += i.cName+',';
               num++;
            }
        let deleteAry = JSON.stringify(array);
          this.$confirm('确定删除 '+str+'这'+num+'条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                ajax({
                url:'/movies/del',
                type:'post',
                data:{ids:deleteAry},
                success:data=>{
                    console.log(data);
                     this.$message({  
                    type: 'success',
                    message: '删除成功!'
                   })
                   this.show({page:this.curpage,rows:5}); 
                }
            })
         }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     
    }
    },
            
   computed:{
        ...mapState({
        deleteData:state=>state.moviesAll.deleteData,
        curpage:state=>state.moviesAll.moviesData.curpage
    })
    }
}

</script>
<style scoped>

    .deletestyle{
        float:right;
        margin:10px;
    }

</style>