    <template>
    <div>
    <el-dialog title="修改" :visible.sync="updateVisible" style="width:800px">
  <el-form :model="form" label-position="right" label-width="120px">
    <el-form-item label="影院名称：" >
      <el-input v-model="form.cinemaName" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
       <el-form-item label="影院地址：" >
      <el-input v-model="form.address" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
       <el-form-item label="影院电话：" >
      <el-input v-model="form.tel" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
     </el-form-item>
       <el-form-item label="官方网站：" >
      <el-input v-model="form.webAdress" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
   
  </el-form>
<div slot="footer" class="dialog-footer">
        <el-button @click="updateHouseVisibel=true" icon="edit"type="info">修改影厅</el-button>
       <el-button @click="hiddenUpdateVisible">取 消</el-button>
    <el-button type="primary" @click="confirmUpdate">确 定 修 改</el-button>
  </div>
</el-dialog>

<el-dialog title="修改影厅" :visible.sync="updateHouseVisibel" style="width:800px">
 <div v-for="House in this.houseData " class="formHouse">
  <el-form :model="House" label-position="right" label-width="120px">
    <el-form-item label="影厅名称：">
      <el-input v-model="House.hName" auto-complete="off" class="ipt" disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="座位：">
      <el-input v-model="House.sitSetting" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    <el-button @click="preSit(House.sitSetting)">预览座位</el-button>
    <el-button @click="removeHouse(House.hName)"  class="removeHouse"icon="delete"type="warning">删除影厅</el-button>
 </el-form>
    
  </div>
 <div slot="footer" class="dialog-footer">
 <el-button @click="addHouseVisible=true" icon="plus"type="success">增加影厅</el-button>
 <el-button type="primary" @click="comfirUpdateHouse">保存影厅修改</el-button>
  <el-button @click="retHouse">取 消</el-button>
  
 </div>
</el-dialog>

<el-dialog title="添加影厅" :visible.sync="addHouseVisible" style="width:800px">
  <el-form label-position="right" label-width="120px">
    <el-form-item label="影厅名称：" >
      <el-input v-model="hName" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    <el-form-item label="座位：">
      <el-input v-model="updateSit" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    <el-button type="primary" @click="()=>preSit(this.updateSit)">座位预览</el-button>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="addHouseVisible= false">取 消</el-button>
    <el-button type="primary" @click="addHouse">确 定</el-button>
  </div>
</el-dialog>


 <el-dialog title="座位预览" :visible.sync="preLookSitVisible" style="width:800px">
 <div v-for="r in this.sitData" style="margin-left:50px;">
 <label v-for="t in r">
 <label  v-if="t==0" class="showSitImg"></label >
 <label  v-if="t==1" class="hiddenSitImg"></label >
 </label>
 </div>
  <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="preLookSitVisible = false">确 定</el-button>
  </div>
</el-dialog>


    </div>
    
    
    </template>
    <script>
      import {ajax} from "@/components/common/ajax"
      import {mapState} from "vuex"
      import store from "@/store"
      export default{
            data(){
              return{
                House:{
                       hName:"", 
                       sitSetting:'',
                 },
                 preLookSitVisible:false,
                 updateHouseVisibel:false,
                 addHouseVisible:false,
                 updateSit:"",
                 hName:"",
               }
            },
       
     computed:{
        ...mapState({
            updateVisible:state=>state.cinemas.updateVisible,
            form:state=>state.cinemas.updateData,
            houseData:state=>state.cinemas.houseData,
            sitData:state=>state.cinemas.sitData,
            
        })
     },
     methods:{
     confirmUpdate(){
           let name=this.form.cinemaName;
         this.$confirm('确认修改'+name+'影院', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                   
                    let obj={};
                    obj.cinemaName=name;
                    obj.address=this.form.address;
                    obj.tel=this.form.tel;
                    obj.webAdress=this.form.webAdress;
                    obj._id=this.form._id;
                    obj.houses=JSON.stringify(this.houseData);
                    console.log(obj);
                   ajax({
                        type:"get",
                        url:"/cinemas/update",
                        data:obj,
                        success:()=>{
                         this.$message({
                        type: 'success',
                        message: '修改成功!'
                            });
                        }
                   })
            this.hiddenUpdateVisible();     
           
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          }); 
        });
        },
        hiddenUpdateVisible(){
         store.commit("UPDATE_VISIBLE",false);
        },
        comfirUpdateHouse(){
            this.updateHouseVisibel=false;
        },
        addHouse(){
            let name=this.hName;
         this.$confirm('确认添加'+name+'厅', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                   
                    let obj={};
                    obj.hName=this.hName;
                    obj.sitSetting=this.updateSit;
                    console.log(this.form);
                    this.houseData.push(obj);
                      this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
           this.addHouseVisible=false; 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          }); 
        });
        },
      
        preSit(sitData){
        console.log(sitData);
        store.commit("SIT_DATA",sitData);
         this.preLookSitVisible=true;
           
        },
        retHouse(){
            console.log(this.form.houses);
            store.commit("HOUSE_DATA",this.form.houses);
            this.updateHouseVisibel=false;
        },
        removeHouse(id){
            let houseData=this.houseData;
            for(let i=0;i<houseData.length; i++){
                if(houseData[i].hName==id){
                    houseData.splice(i--,1);
                }
            }
            console.log(houseData);
           store.commit("HOUSE_DATA",houseData);
        },
        
      }
        
    }
    </script>
    <style scoped>
        .formHouse{
          border:"1px solid red";
          margin-top:30px;
        }
        .ipt{
            color:red;
        }
    .showSitImg{
        display:inline-block;
        width:15px;
        height:15px;
        background:url("../../../img/tupian.png") no-repeat;
        background-size:100%;

       }
       .hiddenSitImg{
        display:inline-block;
        width:15px;
        height:15px;
        background:url("../../../img/tupian120.png") no-repeat;
        background-size:100%;

      }
    </style>