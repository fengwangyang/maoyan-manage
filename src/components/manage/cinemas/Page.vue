 <template>
 <div>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="allData.curpage"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allData.total">
    </el-pagination>
 
 </div>
 
 </template>
    <script>
        import {mapState} from "vuex"
       export default{
        computed:{
        ...mapState({
             allData:state=>state.cinemas.allData
            })
        },
        methods:{
            handleSizeChange(){
            
            },
        handleCurrentChange(){
        
        },
        
        }
    }
    </script>
    <style></style>