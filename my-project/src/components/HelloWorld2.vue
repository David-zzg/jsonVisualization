<template>
  <div>
    <JsonCreator :obj="list" ></JsonCreator>
    <div id="jsonDom"></div>
    <pre>
      {{jsonStr}}
    </pre>
    <!-- <JsonCreator2 :config="json" ></JsonCreator2> -->
  </div>    
</template>

<script>
import {init,getValueByIndexStr} from "../../../index"
import String from "./String";
import Main from "./Main"
import event from "./event";
import Vue from "vue";
const json = {
    name:'david',
    obj:{
        name:"david2",
        list:[{
            name:"david3",
            list:[{
              str:"333"
            }]
        }]
    },
    list:[{
        name:"david3"
    },{
        name:"david311"
    }]
}

const config = {
    "name":{
        type:"string"
    },
    "obj.name":{
        type:"string"
    },
    "list[0].name":{
        type:"string"
    },
    'obj.list[0].name':{
      type:"string"
    },
    'obj.list[0].list[0].str':{
      type:"string"
    }
}

// const json = {
//   applicationList:[{
//     name:"钓鱼",
//     appid:"1002"
//   }]
// }

// const config = {
//   'applicationList[0].name':{
//     type:"string",
//     name:"应用名字"
//   },
//   'applicationList[0].appid':{
//     type:"string",
//     name:"appid"
//   }
// }

var json2 = [
  {
    type:"string",
    key:"name",
    name:"应用",
    componentType:"string",
    sort:1,
    defaultValue:"钓鱼"
},
{
    type:"obj",
    key:"attr",
    name:"属性",
    componentType:"obj",
    sort:1,
    children:[{
        type:"string",
        key:"style",
        name:"属性",
        componentType:"string",
        sort:1,
        defaultValue:""
    },{
        type:"string",
        key:"style",
        name:"链接",
        componentType:"string",
        sort:1,
        defaultValue:""
    }]
},
{
    type:"list",
    key:"list",
    name:"属性",
    componentType:"list",
    sort:1,
    children:[{
        type:"string",
        key:"style",
        name:"属性",
        componentType:"string",
        sort:1,
        defaultValue:""
    },{
        type:"string",
        key:"style",
        name:"链接",
        componentType:"string",
        sort:1,
        defaultValue:""
    }]
}
]




function createJsonCreator(json,config) {
  var dom = document.getElementById("jsonDom");
  dom.innerHTML = "";
  var innerDom = document.createElement("div");
  innerDom.id = "jsonInner";
  dom.appendChild(innerDom);
  new Vue({
    render(h,context){
      return h("JsonCreator",{
        props:{
          obj:init(json,config)
        }
      },[])
    }
  }).$mount('#jsonInner')
}
export default {
  name: 'HelloWorld',
  data () {
    return {
      json:json,
      json2:json2,
      list:config
    }
  },
  computed:{
    jsonStr(){
      return JSON.stringify(this.json);
    }
  },
  mounted(){
    // createJsonCreator(json,config)
    this.$et.$on("mutation",(indexStr,value)=> {
      var target = getValueByIndexStr(indexStr,this.json);
      target.obj[target.key] = value;
    })
    this.$et.$on("addList",(indexStr)=> {
      var target = getValueByIndexStr(indexStr,this.json);
      var lastObj = target.obj[target.key][target.obj[target.key].length-1];
      console.log(indexStr)
      if(lastObj){
        lastObj = JSON.parse(JSON.stringify(lastObj))
        target.obj[target.key].push(Object.assign({},lastObj));
      }
    })
    this.$et.$on("deleteItem",(indexStr)=>{
      var target = getValueByIndexStr(indexStr,this.json);
      target.obj.splice(parseInt(target.key),1);
      // var newArr = JSON.parse(JSON.stringify(this.json));
      // var target = getValueByIndexStr(indexStr,newArr);
      // target.obj.splice(parseInt(target.key),1);
      createJsonCreator(this.json,config)
      // this.json = newArr
      // this.json = JSON.parse(JSON.stringify(this.json));
      // delete targetb.ojb[target.key]
      // console.log(target.obj.filter((item,i)=>i!=target.key))
      // target.obj = target.obj.filter((item,i)=>i!=target.key)

      // var newArr = JSON.parse(JSON.stringify(target.obj));
      // newArr = newArr.filter((item,i)=>i!=target.key)
      // console.log(newArr)
      // target.obj = newArr
      // console.log(target.obj)
    })
  },
  components:{
    String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
