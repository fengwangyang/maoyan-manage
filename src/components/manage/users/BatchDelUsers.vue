<template>
    <el-button @click="del" icon='delete' type="warning">删除</el-button>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    import {mapState} from "vuex";
    export default {
        props:["show"],
        methods:{
            del(){
                ajax({
                    type:"post",
                    url:"/users/del",
                    data:{
                        ids:JSON.stringify(this.data)
                    },
                    success:function(){
                        this.show();
                    }.bind(this)
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