<template>
    <div>
      <el-input placeholder="搜索电影名/类型/地区" v-model="value" class="searchForm">
        <el-select class="selector" v-model="attr" slot="prepend" placeholder="请选择" width="120">
          <el-option label="电影名" value="cName" ></el-option>
          <el-option label="类型" value="type"></el-option>
          <el-option label="地区" value="area"></el-option>
        </el-select>
        <el-button @click='searchData' slot="append" icon="search"></el-button>
      </el-input>
    </div>
</template>
<script>
    import {SHOW_MOVIES_LINKED,FIND_MOVIES} from "@/store/moviesRel/mutations";
    import {mapState} from "vuex";
    import store from "@/store";
    
    export default {
        data:function(){
            return {
                attr :"cName",
                value:""
            }
        },
        props:['show'],
        methods:{
            searchData(){
                if(this.value){
                    let obj = {};
                    obj[this.attr] = this.value;
                    store.commit(FIND_MOVIES,obj);
                    let newData = this.$store.state.moviesRel.data;
                    newData.curpage = 1;
                    store.commit(SHOW_MOVIES_LINKED,newData);
                    this.show();
                }else{
                    this.$alert("请输入完整的信息","提示",{
                        confirmButtonText: '确定'
                    })
                }
                
            }
        },
        computes:{
//            ...mapState({
//                data:
//            })
        }
    }
</script>
<style>
    .selector{
        width: 120px;
    }
    .searchForm{
        width: 360px;
    }
</style>