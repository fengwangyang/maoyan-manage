<template>
    <div>
        <el-dialog width="400" :visible.sync="sessionVisible" :before-close="close" :title="`${house.hName}中《${session.cName}》的场次`" :modal="false" size="tiny">
          <el-form>
                <el-form-item label="开场" label-width="60px">
                    <el-date-picker
                      v-model="startTime"
                      type="datetime"
                      @change="setStartTime"
                      placeholder="请选择开场时间"
                      >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="离场" label-width="60px">
                    <el-date-picker
                      v-model="endTime"
                      type="datetime"
                      placeholder="请选择离场时间" :disabled="true" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="价格" label-width="60px">
                   <el-input-number v-model="price" :min="1" :max="200"></el-input-number>
                </el-form-item>
          </el-form>
          <div style="text-align: right; margin: 0">
            <el-button icon="delete" type="danger" @click="delSession">删除</el-button>
            <el-button icon="edit" type="primary" @click="confirmUpdateSession">修改</el-button>
          </div>

        </el-dialog>

          <el-button slot="reference" class="sessionInfo" size="mini" @click="showMo">
                <p><span>开场：</span>{{new Date(session.time[0]).toLocaleString()}}</p>
                <p><span>离场：</span>{{new Date(session.time[1]).toLocaleString()}}</p>
              <p class="movieP"><span>电影：</span>{{session.cName}}</p>
                <p><span>票价：</span>{{session.price}}</p>
        </el-button>
    </div>
</template>
<script>
    import store from "@/store";
    import {GET_SESSION} from "@/store/moviesRel/mutations";
    import {mapState} from "vuex";
    import {ajax} from "@/components/common/ajax";
    
    export default {
        data(){
             return {
                 sessionVisible:false,
                 isOnRevise:false,
                 propWidth:200,
                 isConfirmRive:false,
                 startTime:"",
                 endTime:"",
                 price:"",
             } 
        },
        props:["session","house","index","cinema","updateSessions","show"],
        methods:{
            close(){
                this.sessionVisible = false;
            },
            showMo(){
                if(new Date(this.session.time[0]).getTime() < new Date().getTime()){
                    this.sessionVisible = false;
                    this.$alert("该场次已过时效无法修改！","提示",{
                        confirmButtonText:"确定",
                    })
                }else{
                    this.sessionVisible = true;
                    this.startTime = this.session.time[0];
                    this.endTime = this.session.time[1];
                    this.price = this.session.price;
                }
            },
            confirmUpdateSession(){
                this.$confirm(`确认修改《${this.editMovie.cName}》在${this.cinema.cinemaName}${this.house.hName}的场次吗？`,"确认",{
                    confirmButtonText:"确认",
                    cancelButtonText:"取消",
                }).then(()=>{
                    let house = this.house;
                    let session = this.session;
                    session.time =[this.startTime,this.endTime];
                    session.price = this.price;
                    let houses = this.cinema.houses;
                    let sessionArry = house.sessions;
                    sessionArry.splice(this.index,1);
                    if(sessionArry.length > 0){
                        for(let i = 0;i < sessionArry.length;i++){
                            let sessionStart = new Date(this.startTime).getTime();
                            if(new Date(sessionArry[i].time[0]).getTime() > sessionStart){
                                let behindArr = sessionArry.slice(i,sessionArry.length);
                                behindArr.unshift(session);
                                let frontArr = sessionArry.slice(0,i);
                                sessionArry = [...frontArr,...behindArr]; 
                                break;
                            }else{
                                if(i == sessionArry.length - 1){
                                    sessionArry.push(session);
                                    break;
                                }
                                continue;
                            }
                        }
                    }else{
                        sessionArry.push(session);
                    }
                    houses.map((val)=>{
                        if(val.hName == house.hName){
                            console.log(0)
                            val.sessions = sessionArry;
                        }
                    });
                    ajax({
                        url:"/cinemas/update",
                        type:"post",
                        data:{_id:this.cinema._id,houses:JSON.stringify(houses)},
                        success:()=>{
                            this.updateSessions();
                            this.show();
                            this.close()
                        }
                    })    
                }).catch(()=>{
                    
                })
            },
            initPoper(){
                this.propWidth = 200;
                this.isOnRevise=false;
            },
            setStartTime(event){
                let nowTime = new Date();
                let duration = this.editMovie.duration
                let startSec = new Date(event).getTime()
                if(startSec > nowTime.getTime()){
                    if(this.house.sessions && duration){
                        this.house.sessions.forEach((val,index)=>{
                            if(index != this.index){
                                let validateStart = new Date(val.time[0]).getTime()- this.house.gapTime*60*1000 - duration*60*1000;
                                let validateEnd = new Date(val.time[1]).getTime() + this.house.gapTime*60*1000;
                                let isInTime = validateStart < startSec && startSec < validateEnd;
                                if(isInTime){
                                    this.$alert("该时间段已有场次，开场时间必须在已有场次之前或之后！","提示",{
                                        confirmButtonText:"确认"
                                    });
                                    this.start = "";
                                    return;
                                }
                            }
                        });
                        this.endTime = new Date(startSec + Number(this.house.gapTime)*60*1000);
                    }
                }else{
                    this.$alert("该场次已过失效无法修改","提示",{
                        confimButtonText:"确定"
                    })
                }
                
            },
            delSession(){
                this.$confirm(`确认删除《${this.editMovie.cName}》在${this.cinema.cinemaName}${this.house.hName}的场次吗？`,"确认",{
                    confirmButtonText:"确认",
                    cancelButtonText:"取消"
                }).then(()=>{
                    let houses = this.cinema.houses
                    houses.forEach((val,index)=>{
                        if(val.hName == this.house.hName){
                            val.sessions.splice(this.index,1);
                        }
                    });
                    ajax({
                        url:"/cinemas/update",
                        data:{_id:this.cinema._id,houses:JSON.stringify(houses)},
                        type:"post",
                        success:()=>{
                            this.show();
                            this.updateSessions();
                            this.close()
                        }
                    })
                }).catch(()=>{
                    
                })
            }
        },
        computed:{
            ...mapState({
                editSession:state=>state.moviesRel.session,
                editMovie:state=>state.moviesRel.editMovie
            })
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