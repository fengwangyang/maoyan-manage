<template>
    <el-button @click="del" icon='delete' type="warning" >删除</el-button>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    import {mapState} from "vuex";
    export default {
        props:["show"],
        methods:{
            del(){
                this.$confirm('确认删除该数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    ajax({
                        type:"post",
                        url:"/users/del",
                        data:{
                            ids:JSON.stringify(this.data)
                        },
                        success:function(){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.show();
                        }.bind(this)
                    });
                            
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });          
                }); 
                
            }
        },
        computed:{
            ...mapState({
                data:state => state.users.deleteUsers
            })
        }
        
  }
</script>
<style>

</style>