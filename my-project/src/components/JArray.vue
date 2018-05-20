<template>
    <div class="array">
        <h4>{{config.name}}</h4>
        <Table stripe :columns="columns" :data="list"></Table>
        <Button type="primary" @click="add">增加</Button>
        <!-- <h1>数组:{{config.name}}</h1>
        <Button type="primary" @click="addListItem">增加</Button>
        <Collapse v-model="value">
            <slot></slot>
        </Collapse> -->
    </div>
</template>
<script>
import {
    configToJson,
    JsonConfigToMap,
} from "../../../index2";
import Vue from 'vue';
Vue.component(
  'JsonDom',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./JsonDom2')
)
// import JsonDom from './JsonDom2'
// console.log('Jsondom',JsonDom)
console.log('Jsondom',Vue.component('JsonDom'))
export default {
//   props:['json','config','$jsonCreator','$$parent','$$key','componentType','configMap'],
  props:['config','addListItem','list','delListItem','updateListItem','resetListItem'],
  name:"jsonArray",
  data(){
      return {
          value:"0",
          show:false,
          index:0,
          childJson:this.list[this.index]||null,
        //   childJson:null
      }
      
    },
    computed:{
          columns(){
              const childList = this.config.children[0].children;
              const list = childList.map(item => {
                  return {
                      title:item.name,
                      key:item.key
                  }
              });
              const that = this;
              list.unshift({
                  title:"操作",
                  key:"_operator",
                  render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    that.init(params.index)
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.delListItem(params.index);
                                    // this.remove(params.index)
                                }
                            }
                        }, '删除')
                    ]);
                }
              })
              return list;
          },
          slotConfig(){
              return this.config.children[0].children;
          }
          ,
        //   childJson(){
        //       return this.list[this.index]||null;
        //     //   return this.list[this.index]?JSON.parse(JSON.stringify(this.list[this.index])):null;
        //   }
    },
    methods:{
        init(index){
            // debugger
            const that = this;
            this.index = index;
            this.childJson = this.list[this.index]||null;
            this.$nextTick(()=>{
                this.$JsonModal({
                    render: (h,context) => {
                        return h('JsonDom', {
                            props: {
                                config: this.slotConfig,
                                json: context.json
                            }
                        })
                        // return h('h1','测试')
                    },
                    'mask-closable':false,
                    on:{
                        'on-ok':this.update,
                        'on-cancel':this.reset
                    },
                    childJson:that.childJson,
                    context:that,
                    update:that.update
                })
            })
            
            // this.$Modal.confirm({
            //     render: (h) => {
            //         return h('JsonDom', {
            //             props: {
            //                 config: this.slotConfig,
            //                 json: this.childJson
            //             }
            //         })
            //     },
            //     onOk:this.update,
            //     onCancel:this.reset
            // })
            // this.show = true;
            // debugger
            // const config = this.config.children[0].children;
            // const json = this.list[index]; 
            // console.log(index)
        },
        add(){
            this.addListItem()
            this.$forceUpdate()
        },
        update(){
            this.updateListItem(this.childJson,this.index);
            this.$forceUpdate()
            console.log('update')
        },
        reset(){
            this.index = -1;
            this.$forceUpdate()
        }
    },
    watch:{
        index(){
            this.childJson = this.list[this.index]||null;
        }
    }
}
</script>

