<template>
  <div>
    <div>{{indexStr}}</div>
    <label for="">{{config.name}}</label><input type="text" v-model="value">
  </div>
</template>
<script>
export default {
  props:["val","indexStr","config"],
  data(){
    return {
      value:this.val
    }
  },
  watch:{
    value(v){
      // console.log(v)
      this.$et.$emit("mutation",this.indexStr,v)
    }
  }
}
</script>

