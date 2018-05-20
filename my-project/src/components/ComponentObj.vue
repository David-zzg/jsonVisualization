<template>
  <div class="obj">
      <h1>obj:</h1>
      <button v-if="hasDelete" @click="deleteItem">删除</button>
    <slot></slot>  
  </div>
</template>
<script>
export default {
  props:['config'],
  computed:{
      hasDelete(){
          return this.$parent.componentType === "list"
      }
  },
  methods:{
      deleteItem(){
          this.$et.$emit("deleteItem",this.indexStr)
      }
  },
  created(){
      window._that = this
  }
}
</script>

<style lang="less">
    .obj{
        h1{
            margin: 0;
        }
        padding-left: 40px;
        text-align: left;
    }
</style>
