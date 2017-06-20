<template>
   <div>
      <el-button icon="plus" type="info" @click="addSession">添加场次</el-button>
       <el-dialog :title="house.hName + '影厅添加《' + editMovie.cName + '》场次'" trigger="click" :visible.sync="dialogVisible" size="small" :modal="false" :before-close="handleClose">
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
              <div slot="footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" icon="plus" @click="confirmAddSession">确 定</el-button>
              </div>
              
        </el-dialog>
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
                price:"",
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
                            let sessionStart = this.start.getTime();
                            if(new Date(sessionArry[i].time[0]).getTime() > sessionStart){
                                let behindArr = sessionArry.slice(i,sessionArry.length)
                                behindArr.unshift(session);
                                let frontArr = sessionArry.slice(0,i);
                                house.sessions = [...frontArr,...behindArr]; 
                                break;
                            }else{
                                if(i == sessionArry.length - 1){
                                    house.sessions.push(session);
                                    break;
                                }
                                continue;
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
                    ajax({
                        url:"/cinemas/update",
                        type:"post",
                        data:{_id:cinema._id,houses:JSON.stringify(cinema.houses)},
                        success:()=>{
                            this.editMovie.cinemas.map((val)=>{
                                if(val._id == cinema._id){
                                    val.houses = cinema.houses;
                                }
                            });
                            console.log(this.editMovie.cinemas);
                            ajax({
                                url:"/linkedMovies/update",
                                type:"post",
                                data:{_id:this.editMovie._id,cinemas:JSON.stringify(this.editMovie.cinemas)},
                                success:()=>{
                                    this.show();
                                    this.handleClose();
                                }
                            })
                        }
                    });
                }else{
                    this.$alert("场次信息添加不正确，请重新输入","提示",{
                        confirmButtonText:"确定",
                    })
                }
            },
            addSession(){
                this.start = "";
                this.end = "";
                store.commit(SWITCH_VISIBLE_SESSION,true);
            },
            setEndTime(){
                
            }
        },
        watch:{
            start:function(e){
                let nowTime = new Date();
                let duration = this.editMovie.duration;
                if(!e) return;
                if(e && e.getTime() > nowTime.getTime()){
                    if(this.house.sessions && duration){
                        let startTime = e.getTime();
                        this.house.sessions.map((val)=>{
                            let validateStart = new Date(val.time[0]).getTime()- this.house.gapTime*60*1000 - duration*60*1000;
                            let validateEnd = new Date(val.time[1]).getTime() + this.house.gapTime*60*1000;
                            let isInTime = validateStart < startTime && startTime < validateEnd;
                            if(isInTime){
                                this.$alert("该时间段已有场次，开场时间必须在已有场次之前或之后！","提示",{
                                    confirmButtonText:"确认"
                                });
                                this.start = "";
                                return;
                            }
                        });
                        this.end = new Date(e.getTime() + Number(duration)*60*1000);
                    }else{
                        this.end = new Date(e.getTime() + Number(duration)*60*1000);
                    }
                }else{
                    this.$alert("只能选择当前时间之后的时间段，请重新选择！","提示",{
                        confirmButtonText:"确认"
                    });
                    this.start = "";
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