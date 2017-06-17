<template>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
          <SeachUsers></SeachUsers>
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple-light">
          <AddUsers></AddUsers>
      </div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light">
          <BatchDelUsers></BatchDelUsers>
      </div></el-col>
    </el-row>
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    import SeachUsers from "./SeachUsers"
    import AddUsers from "./AddUsers"
    import BatchDelUsers from "./BatchDelUsers"
    export default {
        components:{
            SeachUsers,AddUsers,BatchDelUsers
        }
  }
</script>
<style>

</style>