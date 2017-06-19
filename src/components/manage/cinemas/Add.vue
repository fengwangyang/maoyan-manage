 <template>
   
    <div>
  <el-button
          size="middle"
          icon="plus"
          type="success"
          @click="dialogFormVisible = true"
          >添加</el-button>
          
<el-dialog title="添加" :visible.sync="dialogFormVisible" size="middle">
  <el-form label-position="right" label-width="120px" :rules="rules" :model="addForm" ref="addCinemasForm" >
    <el-form-item label="影院名称：" prop="cinemaName" >
      <el-input v-model="addForm.cinemaName" auto-complete="off" class="ipt" ></el-input>
   </el-form-item>
    
    <el-form-item label="影院地址：" prop="address">
      <el-input v-model="addForm.address" auto-complete="off" style="width:250px"></el-input>
    </el-form-item>
    
    <el-form-item label="影院电话："prop="tel" >
      <el-input v-model="addForm.tel" auto-complete="off" style="width:250px"></el-input>
    </el-form-item>
   
     <el-form-item label="官方网站："prop="webAdress" >
      <el-input v-model="addForm.webAdress" auto-complete="off" style="width:250px"></el-input>
    </el-form-item>
  </el-form>
<div slot="footer" class="dialog-footer">
    <el-button 
          size="small"
          icon="plus"
          type="success" 
          @click="addaddHouseVisible = true"
          >添加影厅</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAdd('addCinemasForm')">确 定</el-button>
  </div>
</el-dialog>

          
<el-dialog title="添加影厅" :visible.sync="addaddHouseVisible" size="middle">
  <el-form label-position="right" label-width="120px" :rules="houseRules" :model="addHouse" ref="addHouseForm">
    <el-form-item label="影厅名称：" prop="hName">
      <el-input v-model="addHouse.hName" auto-complete="off" style="width:250px"></el-input>
    </el-form-item>
    <el-form-item label="座位：" prop="sitSetting">
      <el-input v-model="addHouse.sitSetting" auto-complete="off" style="width:250px"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="preSit" class="preSitBtn">座位预览</el-button>
    </el-form-item>
   <el-form-item label="间隔时间：" prop="gapTime">
      <el-input v-model="addHouse.gapTime" auto-complete="off" style="width:250px"></el-input>
    </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
     <el-button @click="addaddHouseVisible = false">取 消</el-button>
    <el-button type="primary" @click="addHouseSubmit('addHouseForm')">确 定</el-button>
  </div>
</el-dialog>
    
    
    
 <el-dialog title="座位预览" :visible.sync="preLookVisible" style="width:800px">
 <div v-for="r in this.sitData" style="margin-left:50px;">
 <label v-for="t in r">
 <label  v-if="t==0" class="showSitImg"></label >
 <label  v-if="t==1" class="hiddenSitImg"></label >
 </label>
 </div>
     
 <div slot="footer" class="dialog-footer">
        <el-button type="primary"@click="preLookVisible = false">确 定</el-button>
  </div>
</el-dialog>

 
 
    </div>
 

 </template>
    <script>
    
     import {ajax} from "@/components/common/ajax"
     import {mapState} from "vuex"
      import store from "@/store"
       export default{
        
       props:["show"],
       data(){
         return{
             addForm:{
                cinemaName:'',
                 address:"",
                 tel:"",
                 webAdress:"",
                },
              
               dialogFormVisible:false,
               addHouse:{
                hName:"",
                sitSetting:"",
                gapTime:"",
               },
               addaddHouseVisible:false,
               preLookVisible:false,
               houses:[],
               rules: {
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
        houseRules:{
            hName: [
                        { required: true, message: '请输入影厅名称', trigger: 'blur' },
                         {pattern:/^[\u4E00-\u9FA5\0-9a-zA-Z]{1,}$/,message:'影院名必须为俩个字符以上', trigger: 'blur' },
                            ],
            sitSetting: [
                        { required: true, message: '输入内容为0或1的二维数组!', trigger: 'blur' },
                         {validator:this.sitValid, trigger: 'blur'},
                           ], 
            gapTime: [
                        { required: true, message: '间隔时间必须为一位或俩位的数字!', trigger: 'blur' },
                         {pattern:/^\d{1,2}$/,message:'间隔时间必须为一位或俩位的数字', trigger: 'blur' },
                           ], 
        }
        }
     },
     computed:{
     ...mapState({
         sitData:state=>state.cinemas.sitData,
      })
     },
     methods:{
      preSit(){
        store.commit("SIT_DATA",this.addHouse.sitSetting);
         this.preLookVisible=true;
        },
      
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
     addHouseSubmit(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
             let name=this.addHouse.hName;
            this.$confirm('确认添加'+name+'厅', '是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }) .then(() => {
                    let obj={};
                    obj.hName=name;
                    obj.sitSetting=this.addHouse.sitSetting;
                    obj.gapTime=this.addHouse.gapTime;
                    this.houses.push(obj);
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
           this.addaddHouseVisible=false; 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          }); 
        });
               
          } else {
              this.$message({
                        type: 'info',
                        message: '内容填写有误!'
                    });
            return false;
          }
        });
        
        },
       
        confirmAdd(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
             let name=this.addForm.cinemaName;
         this.$confirm('确认添加'+name+'影院', '是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                    let obj={};
                    obj.cinemaName=name;
                    obj.address=this.addForm.address;
                    obj.tel=this.addForm.tel;
                    obj.webAdress=this.addForm.webAdress;
                    obj.houses=JSON.stringify(this.houses);
                    console.log(this.houses);
                    ajax({
                        type:"get",
                        url:"/cinemas/add",
                        data:obj,
                        success:()=>{
                        this.$message({
                        type: 'success',
                        message: '添加成功!'
                   });
                   this.houses=[];
                  this.show(1,5);
                  this.dialogFormVisible=false;
              }
          })
                    
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          });          
        });
         
     }else {
              this.$message({
                        type: 'info',
                        message: '内容填写有误!'
                    });
            return false;
          }
        });
        
     },
     }
     
    }
    </script>
    <style scoped>
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