    <template>
    <div>
    <el-dialog title="修改" :visible.sync="updateVisible" style="width:800px" :before-close="hiddenUpdateDialog">
  <el-form :model="form" label-position="right" label-width="120px" :rules="rulesUpdate"  ref="updateCinemasForm">
    <el-form-item label="影院名称：" prop="cinemaName">
      <el-input v-model="form.cinemaName" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
       <el-form-item label="影院地址：" prop="address" >
      <el-input v-model="form.address" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
       <el-form-item label="影院电话：" prop="tel">
      <el-input v-model="form.tel" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
     </el-form-item>
       <el-form-item label="官方网站：" prop="webAdress">
      <el-input v-model="form.webAdress" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
   
  </el-form>
<div slot="footer" class="dialog-footer">
        <el-button @click="updateHouse" icon="edit"type="info">修改影厅</el-button>
       <el-button @click="resetUpdateVisible">取 消</el-button>
    <el-button type="primary" @click="confirmUpdate('updateCinemasForm')">确 定 修 改</el-button>
  </div>
</el-dialog>

<el-dialog title="修改影厅" :visible.sync="updateHouseVisibel" style="width:800px">
 <div v-for="House in this.houseData " class="formHouse" >
  <el-form :model="House" label-position="right" label-width="120px" :rules="rulesUpdateHouse"  ref="updateHouseForm" >
    <el-form-item label="影厅名称：" prop="hName">
      <el-input v-model="House.hName" auto-complete="off" class="ipt" disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="座位：" prop="sitSetting">
      <el-input v-model="House.sitSetting" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    <el-button @click="preSit(House.sitSetting)">预览座位</el-button>
    <el-button @click="removeHouse(House.hName)"  class="removeHouse"icon="delete"type="warning">删除影厅</el-button>
 </el-form>
    
  </div>
 <div slot="footer" class="dialog-footer">
 <el-button @click="addHouseVisible=true" icon="plus"type="success">增加影厅</el-button>
 <el-button type="primary" @click="comfirUpdateHouse">保存影厅修改</el-button>
  <el-button @click="updateHouseVisibel=false "type="success">关 闭</el-button>
  
 </div>
</el-dialog>

<el-dialog title="添加影厅" :visible.sync="addHouseVisible" style="width:800px">
  <el-form label-position="right" label-width="120px" :model="updateAddHouseFrom" ref="updateAddHouse"  :rules="rulesUpdateAddHouse" >
    <el-form-item label="影厅名称：" prop="hName">
      <el-input v-model="updateAddHouseFrom.hName" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    <el-form-item label="座位：" prop="updateSit">
      <el-input v-model="updateAddHouseFrom.updateSit" auto-complete="off" class="ipt"></el-input>
    </el-form-item>
    <el-button type="primary" @click="()=>preSit(this.updateAddHouseFrom.updateSit)">座位预览</el-button>
</el-form>
<div slot="footer" class="dialog-footer">
    <el-button @click="addHouseVisible= false">取 消</el-button>
    <el-button type="primary" @click="addHouse('updateAddHouse')">确 定</el-button>
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
                 updateAddHouseFrom:{
                    updateSit:"",
                 },
                
                rulesUpdate: {
                  cinemaName: [
                        { required: true, message: '请输入影院名称', trigger: 'blur' },
                         {pattern:/^[\u4E00-\u9FA5\0-9a-zA-Z]{1,}$/,message:'影院名必须为俩个字符以上', trigger: 'blur' },
                            ],
                  address: [
                        { required: true, message: '请输入影院地址', trigger: 'blur' },
                         {pattern:/^[\u4E00-\u9FA5\0-9a-zA-Z]{1,}$/,message:'影院地址必须为俩个字符以上', trigger: 'blur'},
                           ], 
                 tel: [
                        { required: true, message: '请输入影院电话', trigger: 'blur' },
                         {pattern:/^\d{3}-\d{8}$/,message:'影院电话必须为×××-××××××××' ,trigger: 'blur'},
                           ],
                 webAdress: [
                        { required: true, message: '请输入官网方网站', trigger: 'blur' },
                         {pattern:/^www\.\w{2,}\.com$/,message:'必须为www.xx.com',trigger: 'blur'},
                           ],
                   },
            rulesUpdateHouse: {
                  hName: [
                        { required: true, message: '请输入影院名称', trigger: 'blur' },
                         {pattern:/^[\u4E00-\u9FA5\0-9a-zA-Z]{1,}$/,message:'影院名必须为俩个字符以上', trigger: 'blur' },
                            ],
                  sitSetting: [
                        { required: true, message: '输入内容为0或1的二维数组!', trigger: 'blur' },
                         {validator:this.sitValid, trigger: 'blur'},
                           ], 
                   } ,
            rulesUpdateAddHouse: {
                  hName: [
                        { required: true, message: '请输入影院名称', trigger: 'blur' },
                         {pattern:/^[\u4E00-\u9FA5\0-9a-zA-Z]{1,}$/,message:'影院名必须为俩个字符以上', trigger: 'blur' },
                            ],
                 updateSit: [
                        { required: true, message: '输入内容为0或1的二维数组!', trigger: 'blur' },
                         {validator:this.sitValid, trigger: 'blur'},
                           ], 
                   }
                }
            },
       
     computed:{
        ...mapState({
            updateVisible:state=>state.cinemas.updateVisible,
            form:state=>state.cinemas.updateData,
            houseData:state=>state.cinemas.houseData,
            sitData:state=>state.cinemas.sitData,
            allData:state=>state.cinemas.allData,
      })
     },
     methods:{
      sitValid(rule, value, callback){
             var valueArr= JSON.parse(value);
                 var flag=[];
                 var count=0;
                    if(typeof valueArr=="object"){
                          for(let a of valueArr){
                              for(var i=0;i<a.length;i++){
                                 if(a[i]!=0&&a[i]!=1){
                                   flag.push(0);
                                   }
                                  else{
                                    flag.push(1);
                                  }
                             }
                        }
                for(let a of flag){
                    if(a==0){
                       callback(new Error('输入内容为0或1的二维数组!'));
                }
                    else{
                       count++ ;
                    }
               }
                 if(count==flag.length){
                     callback();
                 }
              }
                     else{
                  callback(new Error('输入内容为0或1的二维数组!'));
                     }
        },
       
     confirmUpdate(formName){
         this.$refs[formName].validate((valid) => {
              if (valid) {
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
        })
        
        }else {
              this.$message({
                        type: 'info',
                        message: '内容填写有误!'
                    });
            return false;
          }
        });
        
        },
        hiddenUpdateDialog(){
         store.commit("UPDATE_VISIBLE",false);
        },
         updateHouse(){
           this.updateHouseVisibel=true;
                  
        },
        comfirUpdateHouse(){
         this.updateHouseVisibel=false;
        },
        addHouse(formName){
         this.$refs[formName].validate((valid) => {
              if (valid) {
        let name=this.updateAddHouseFrom.hName;
            for(let i=0;i<this.houseData.length;i++){
                if(name==this.houseData[i].hName){
                   this.$message({
                        type: 'info',
                        message: '该影厅已存在!'
                    });
                     return;
                }
            }
         this.$confirm('确认添加'+name+'厅', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                     let obj={};
                    obj.hName=name;
                    obj.sitSetting=this.updateAddHouseFrom.updateSit;
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
        })
        }else {
              this.$message({
                        type: 'info',
                        message: '内容填写有误!'
                    });
            return false;
          }
        });
        },
      
    preSit(sitData){
        console.log(sitData);
        store.commit("SIT_DATA",sitData);
         this.preLookSitVisible=true;
           
        },
        resetUpdateVisible(){
           ajax({
            type:"get",
            url:"/cinemas/find",
            data:{_id:this.form._id},
            success:(data)=>{
                console.log(data);
               store.commit("HOUSE_DATA",data.houses);
               store.commit("UPDATE_VISIBLE",false);
              }
            });
            
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