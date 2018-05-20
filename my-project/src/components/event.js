import Vue from "vue";
var e;

Vue.use({
    install(Vue, options){
        // 4. 添加实例方法
        Vue.prototype.$et = eventCreator();
    }
})

function eventCreator() {
    if(e)return e;
    e = new Vue();
    return e;
}
