<template >
  <div class="object">
    <h4>{{config.name}}</h4>
    <Card >
      <slot></slot>
    </Card>
  </div>
</template>
<script>
export default {
  props:['config','canDelete','deleteItem','index'],
  // computed:{
  //   canDelete(){
  //     return this.$parent && this.$parent.componentType === 'array';
  //   }
  // },
  // methods:{
  //   deleteItem(){
  //     debugger
  //     this.$$parent.splice(this.$$key,1);
  //     this.$jsonCreator.$et.$emit('delete')
  //   }
  // }
}
</script>

