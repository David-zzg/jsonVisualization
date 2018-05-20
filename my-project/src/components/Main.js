import Vue from "vue";
import CString from "./String.vue"
import CObj from "./CObj.vue"
import CList from "./CList.vue"
import ComponentObj from "./ComponentObj"
import ComponentString from "./ComponentString"
import ComponentList from "./ComponentList"
const component = {
  obj:ComponentObj,
  string:ComponentString,
  list:ComponentList
}
Vue.component('JsonCreator', {
  render: function (createElement, context) {
    function createComponent (obj,i) {
      if(Array.isArray(obj)){
        return obj.map((item,i)=>createComponent(item,i))
      }else{
        let children = obj.children?createComponent(obj.children):[]
        console.log(obj)
        let data = {
          props:{
            indexStr:obj.indexStr,
            val:obj.value,
            componentType:obj.type,
            config:obj.config
          }
        };
        return createElement(component[obj.type],data,children)
      }
    }
    let obj = this.obj;

    return createComponent(obj)
  },
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  key:1
})



window.a = Vue.component('JsonCreator2',{
  render:function (h) {
    function createSingleComponent(item) {
      let child = item.children?createComponent(item.children,item.type):[];
      console.log('type',item,item.type)
      return h(component[item.type],{
        props:{
          config:item
        }
      },child)
    }
    function createComponent(json,type) {
      if(Array.isArray(json)){
        if(!type){
          return h(component.list,{
          },json.map(
            (item)=>createSingleComponent(item)
          ))
        }else{
          return json.map(
            (item)=>createSingleComponent(item)
          )
        }
      }else{
        return createSingleComponent(json)
      }
    }
    return createComponent(this.config);
  },
  props:{
    config:{
      type:Array,
      required:true
    }
  }
})

Vue.component('ComponentObj',{
  render:function (h,c) {
    let child = [
      h('p','obj对象')
    ]
    if(this.$slots&&this.$slots.default){
      child.push(...this.$slots)
    }
    return h('div',{},child)
  }
})

console.log(a)
console.log(CObj)