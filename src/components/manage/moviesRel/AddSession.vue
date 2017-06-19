<template>
   <div>
       <el-popover :title="house.hName" v-model="dialogVisible" placement="right">
            <el-form>
                <el-form-item label="开场" label-width="60px">
                    <el-date-picker
                      v-model="start"
                      type="datetime"
                      @change="setEndTime"
                      placeholder="请选择开场时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item  label="离场" label-width="60px">
                    <el-date-picker
                      v-model="end"
                      type="datetime"
                      placeholder="请选择离场时间" :disabled="true">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="价格" label-width="60px">
                   <el-input-number v-model="price" :min="1" :max="200"></el-input-number>
                </el-form-item>
            </el-form>
              <div class="footerButton">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" icon="plus" @click="confirmAddSession">确 定</el-button>
              </div>
              <el-button slot="reference" icon="plus" type="info" @click="addSession(house,cinema)" size="small">添加场次</el-button>
        </el-popover>
   </div>

</template>
<script>
    import {mapState} from "vuex";
    import {SWITCH_VISIBLE_SESSION,GET_HOUSE} from "@/store/moviesRel/mutations";
    import store from "@/store"
    import {ajax} from "@/components/common/ajax";

    export default {
        data(){
            return {
                start:"",
                end:"",
                price:""
            }
        },
        props:["house","cinema","show"],
        methods:{
            handleClose(){
                store.commit(SWITCH_VISIBLE_SESSION,false);
            },
            handleChang(){
                
            },
            confirmAddSession(){
                if(this.start && this.end){
                    let cinema = this.cinema;
                    let house = this.house;
                    let session = {price:this.price,time:[this.start,this.end],cName:this.editMovie.cName};
                    if(house.sessions){
                        //循环判断当前添加的场次时间在哪个场次之前，并把添加的场次放在比该场次时间大的之前
                        let sessionArry = house.sessions;
                        for(let i = 0;i < sessionArry.length;i++){
                            if(sessionArry[i].time[1].getTime() > session.time[1].getTime()){
                                if(i == sessionArry.length - 1){
                                    sessionArry.unshift(session);
                                }else{
                                    let behindArr = sessionArry.slice(i,sessionArry.length).unshift(session);
                                    let frontArr = sessionArry.slice(0,i);
                                    house.sessions = [...frontArr,...behindArr];
                                }
                                break;
                            }else if(sessionArry[i].time[1].getTime() < session.time[1].getTime() && i == sessionArry.length - 1){
                                sessionArry.push(session);
                                break;
                            }else{
                                sessionArry.unshift(session);
                            }
                        }
                    }else{
                        house.sessions = [];
                        house.sessions.push(session);
                    }
                    cinema.houses = cinema.houses.map((val)=>{
                        if(val.hName == house.hName){
                            return house;
                        }else{
                            return val
                        }
                    });
                    console.log(cinema);
//                    ajax({
//                        url:"/cinemas/update",
//                        type:"post",
//                        data:{_id:cinema._id,houses:JSON.stringify(cinema.house)},
//                        success:()=>{
//                            this.show();
//                            this.handleClose();
//                        }
//                    });
                }else{
                    this.$alert("场次信息添加不正确，请重新输入","提示",{
                        confirmButtonText:"确定",
                    })
                }

            },
            addSession(house,cinema){
                store.commit(SWITCH_VISIBLE_SESSION,true);
            },
            setEndTime(){
                let duration = this.editMovie.duration;
                if(duration && this.start){
                    this.end = new Date(this.start.getTime() + Number(duration)*60*1000)
                }else{

                }
            }
        },
        watch:{
            start:function(e){
                let duration = this.editMovie.duration;
                if(this.house.sessions && e && duration){
                    this.house.sessions.map((val)=>{
                        let startTime = e.getTime();
                        let validateStart = val.time[0].getTime()- this.house.gapTime*60*1000 - duration*60*1000;
                        let validateEnd = val.time[1].getTime() + this.house.gapTime*60*1000;
                        let isInTime = validateStart < startTime && startTime < validateEnd;
                        if(isInTime){
                            this.$alert("该时间段已有场次，开场时间必须在已有场次之前或之后！","提示",{
                                confirmButtonText:"确认"
                            });
                        }else{

                        }
                    })
                }else{
                    
                }
            }
        },
        computed:{
            ...mapState({
                dialogVisible:state=>state.moviesRel.sessionVisible,
                editMovie:state=>state.moviesRel.editMovie,
            })
        }
    }
</script>


<style>
    .timePicker{
        width: 100px;
    }
    .footerButton{
        display: flex;
        justify-content: space-around;
    }
</style>