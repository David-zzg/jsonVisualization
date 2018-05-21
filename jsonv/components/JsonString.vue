<template>
    <div class="string">
        <h4>{{config.name}}</h4>
        <Input :value="value"  @input="_updateValue" placeholder="Enter something..." style="width: 300px"></Input>
    </div>
</template>
<script>
import {getValueByIndexStr} from '@/core/index';
export default {
  props:['config','val','updateValue'],
  data(){
      return {
          value:this.val,
      }
  },
  methods:{
      _updateValue(val){
          this.updateValue(val);
      }
  }
}
</script>

