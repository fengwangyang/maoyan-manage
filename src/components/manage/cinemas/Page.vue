 <template>
 <div>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="allData.curpage"
      :page-sizes="[5, 6, 7, 8]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allData.total">
    </el-pagination>
 
 </div>
 
 </template>
    <script>
        import store from "@/store"
        import {mapState} from "vuex"
       export default{
        props:["show"],
            data(){
            return{
                size:"",
            }
        },
        computed:{
         ...mapState({
             allData:state=>state.cinemas.allData,
             searchType:state=>state.cinemas.searchType.searchType,
             searchValue:state=>state.cinemas.searchType.searchValue,
            })
        },
        methods:{
        handleSizeChange(value){
          store.commit("PAGE_SIZE",value);
          this.size=value,
          this.show(this.allData.curpage,value,this.searchType,this.searchValue);
            },
        handleCurrentChange(value){
          this.show(value,this.size,this.searchType,this.searchValue);
        },
       
        }
    }
    </script>
    <style></style>