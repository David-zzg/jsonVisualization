<template>
  <div class="list">
      <h1>列表</h1>
      <button @click="add">增加</button>
      <div>
          <slot></slot>  
          <!-- {{this.children}} -->
      </div>
      <!-- <slot v-for="(item,index) in val"></slot>   -->
  </div>
</template>
<script>
export default {
  props:['config'],
  created(){
  },
  methods:{
      add(){
          this.$et.$emit("addList",this.indexStr);
      }
  }
}
</script>
<style>
.list{
    padding-left: 40px;
}
</style>


