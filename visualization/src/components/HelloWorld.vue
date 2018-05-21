<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <JsonDom :config="config" :json="json"></JsonDom>
  </div>
</template>
<script>
import {
    configToJson,
    JsonConfigToMap,
    json,
    connectJson
} from "@/core/index";
const config = [{
    type:"string",
    key:"classobj",
    name:"同学",
    defaultValue:"1111"
},{
    type:"string",
    key:"classobj111",
    name:"同学2",
    defaultValue:""
},{
    type:"array",
    key:"classobj3",
    name:"同学3",
    children:[{
        type:"object",
        key:"0",
        name:"对象",
        children:[{
            type:"string",
            key:"classobj",
            name:"同学",
            defaultValue:"1111"
        },{
            type:"object",
            key:"classobj3",
            name:"同学",
            defaultValue:"113311",
            children:[{
                type:"string",
                key:"classobj2",
                name:"同学",
                defaultValue:"113311"
            }]
        },{
            type:"array",
            key:"classobj4",
            name:"同学",
            defaultValue:"113311",
            children:[{
                type:"object",
                key:"classobj3",
                name:"同学",
                key:"0",
                defaultValue:"113311",
                children:[{
                    type:"string",
                    key:"classobj2",
                    name:"同学",
                    defaultValue:"113311"
                },{
                    type:"array",
                    key:"classobj4",
                    name:"同学",
                    defaultValue:"113311",
                    children:[{
                        type:"object",
                        key:"classobj3",
                        name:"同学",
                        key:"0",
                        defaultValue:"113311",
                        children:[{
                            type:"string",
                            key:"classobj2",
                            name:"同学",
                            defaultValue:"113311"
                        }]
                    }]
                }]
            }]
        }]
    }]
}]
const data = {"classobj":"aaa","classobj111":"","classobj3":[{name:111}]}
const finalJson = connectJson(config,data);
console.log(finalJson)
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      config,
      json:finalJson
    }
  }
}
</script>