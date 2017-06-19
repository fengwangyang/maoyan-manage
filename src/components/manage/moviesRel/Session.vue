<template>
    <div>
        <el-popover :ref="session.cName" placement="top" width="400" v-model="sessionVisible" :hide="initPoper">
          <el-form>
                <el-form-item label="开场" label-width="60px">
                    <el-date-picker
                      v-model="session.time[0]"
                      type="datetime"
                      placeholder="请选择开场时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="离场" label-width="60px">
                    <el-date-picker
                      v-model="session.time[1]"
                      type="datetime"
                      placeholder="请选择离场时间" :disabled="true">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="价格" label-width="60px">
                   <el-input-number v-model="session.price" :min="1" :max="200"></el-input-number>
                </el-form-item>
          </el-form>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" icon="delete" type="danger" @click="sessionVisible = false">删除</el-button>
            <el-button icon="edit" type="primary" size="mini" @click="showInput">修改</el-button>
          </div>
          <el-button slot="reference" class="sessionInfo" @click="showMo" size="mini">
                <p><span>开场：</span>{{session.time[0].toLocaleDateString()}} {{session.time[0].toLocaleTimeString()}}</p>
                <p><span>离场：</span>{{session.time[1].toLocaleDateString()}} {{session.time[1].toLocaleTimeString()}}</p>
              <p class="movieP"><span>电影：</span>{{session.cName}}</p>
                <p><span>票价：</span>{{session.price}}</p>
            </el-button>
        </el-popover>


    </div>
</template>
<script>
    import store from "@/store";
    
    
    export default {
        data(){
             return {
                 sessionVisible:false,
                 isOnRevise:false,
                 propWidth:200,
             } 
        },
        props:["session"],
        methods:{
            showMo(){
                this.sessionVisible = false;  
                this.isOnRevise = false;  
            },
            showInput(){
                this.isOnRevise = true;
                this.propWidth = 400
            },
            initPoper(){
                this.propWidth = 200;
                this.isOnRevise=false;
            }
        }
    }
</script>
<style scoped>
    .sessionInfo{
        text-align: left;
    }
    .sessionInfo p span{
        font-weight: bolder;
    }
    .movieP{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    p{
        line-height: 18px;
    }
</style>