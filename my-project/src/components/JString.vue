<template>
    <div class="string">
        <h4>{{config.name}}</h4>
        <Input :value="value"  @input="_updateValue" placeholder="Enter something..." style="width: 300px"></Input>
        <!-- <Form>
            <FormItem :label="config.defaultValue">
                <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input>
            </FormItem>
        </Form> -->
    </div>
</template>
<script>
import {getValueByIndexStr} from '../../../index2';
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
//   watch:{
//       value(val){
          
//           this.updateValue(val);
//           console.log('mutation======>'+val)
//       }
//   }
}
</script>
<style <style lang="less" scoped>
    .string{
        h4{
            margin-bottom: 4px;
            margin-top: 6px;
        }
    }
</style>

