<template>
   
      <div>
          <SeachUsers :show="show" style="float:left"></SeachUsers>
    
      
          <AddUsers :show="show" style="float:left;marginLeft:20px"></AddUsers>
      
   
          <BatchDelUsers :show="show" style="float:left;marginLeft:20px"></BatchDelUsers>
      </div>
   
</template>
<script>
    import {ajax} from "@/components/common/ajax"
    import SeachUsers from "./SeachUsers"
    import AddUsers from "./AddUsers"
    import BatchDelUsers from "./BatchDelUsers"
    export default {
        props:["show"],
        components:{
            SeachUsers,AddUsers,BatchDelUsers
        }
  }
</script>
<style>

</style>