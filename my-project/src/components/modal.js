var plugins = {
    
}
plugins.install = function (Vue,options) {
    if(plugins.hasIntalled)return;
    plugins.hasIntalled = true;
    Vue.prototype.$JsonModal = function (params) {
        console.log('jsonmodal')
        const id = createDom(document.body);
        new Vue({
            data(){
                return {
                    show:false,
                    json:JSON.parse(JSON.stringify(params.childJson))
                }
            },
            mounted(){
                this.show = true;
            },
            render(h, context) {
                const that = this;
              return h(
                "Modal",
                {
                  props: Object.assign({},params,{
                      value:that.show
                  }),
                  on:{
                      'on-ok':(json)=>{
                          params.context.childJson = JSON.parse(JSON.stringify(that.json));
                          console.log(params.context)
                          console.log(that)
                          params.update();
                      }
                  }
                },
                [params.render(h,that)]
              );
            }
        }).$mount(`#${id}`);
    }
}

function createDom(container) {
    if(!container)return;
    const dom = document.createElement("div");
    //保证唯一性
    const id = 'dom'+parseInt(Math.random()*100) + (new Date()).getTime();
    dom.id = id;
    container.appendChild(dom);
    return id;
}

export default plugins;