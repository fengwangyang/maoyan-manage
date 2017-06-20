<template>
    <div class="search">
      <el-input :placeholder="holderText" v-model="value" class="searchForm">
        <el-select class="selector" v-model="attr" slot="prepend" placeholder="请选择" width="120">
          <el-option v-for="(val,index) in optionData" :label="val.text" :value="val.value" :key="index"></el-option>
        </el-select>
        <el-button @click='searchData' slot="append" icon="search">搜索</el-button>
      </el-input>
      <el-button class="clearBtn" @click="initData" type="primary">刷新</el-button>
    </div>
</template>
<script>
    import {SHOW_MOVIES_LINKED,FIND_MOVIES} from "@/store/moviesRel/mutations";
    import {mapState} from "vuex";
    import store from "@/store";
    
    export default {
        data:function(){
            return {
                attr :this.optionData[0].value,
                value:""
            }
        },
        props:['show',"optionData","commitMutations","newData","holderText"],
        methods:{
            searchData(){
                if(this.value){
                    let obj = {};
                    obj[this.attr] = this.value;
                    store.commit(this.commitMutations[1],obj);
                    let newData = this.newData;
                    newData.curpage = 1;
                    store.commit(this.commitMutations[0],newData);
                    this.show();
                }else{
                    this.$alert("请输入完整的信息","提示",{
                        confirmButtonText: '确定'
                    })
                } 
            },
            initData(){
                this.value = "";
                store.commit(this.commitMutations[1],{});
                store.commit(this.commitMutations[0],{rows:[],eachpage:6,curpage:1});
                this.show();
            },
        },
        computes:{
//            ...mapState({
//                data:
//            })
        }
    }
</script>
<style scoped>
    .selector{
        width: 100px;
        
        
    }
    .search{
        display: flex;
        width: 430px;
        justify-content: space-between;
/*        margin-bottom: 8px;*/
    }
    .searchForm{
        width: 360px;
    }
</style>