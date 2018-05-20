<template>
<div>
  <JsonDom :config="config" :json="json"></JsonDom>
  <pre>
      {{jsonStr}}
    </pre>
</div>
</template>
<script>
import Vue from 'vue';
import {
    configToJson,
    JsonConfigToMap,
    json,
    connectJson
} from "../../../index2";
import JsonDom from './JsonDom2'
console.log('Jsondom',JsonDom)
const configMap = JsonConfigToMap(json)
const initialJson = configToJson(json)
initialJson.classobj = "aaa"
console.log('初始化+++',initialJson)
import modal from './modal';
Vue.use(modal)
const testData =       {"classobj":"aaa","classobj111":"","classobj3":[{name:111}]}
const finalJson = connectJson(json,testData);
// console.log(connectJson(initialJson,{
//   classobj:'b'
// }));

export default {
  data(){
    return {
      config:json,
      configMap,
      initialJson,
      // json:JSON.parse(JSON.stringify(initialJson))
      json:finalJson


    
    }
  },
  // components:{JsonDom},
  computed:{
    jsonStr(){
      return JSON.stringify(this.json)
    }
  }
}
</script>

