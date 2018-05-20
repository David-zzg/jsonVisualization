<template>
  <JsonCreator :configMap="configMap"
                :initialJson = "initialJson"
                :json="json"></JsonCreator>
</template>
<script>
import {
  configToJson,
  JsonConfigToMap,
  json,
  isObjectOrArray,
  isArrayByType,
  render,
  getValueByIndexStr,
  connectJson
} from "../../../index2";
import Vue from "vue";
import JArray from "./JArray";
import JObject from "./JObject";
import JString from "./JString";
Vue.component("JsonCreator", {
  created() {},
  render(h) {
    return render.call(this, h, {
      array: JArray,
      object: JObject,
      string: JString
    });
  },
  props: {
    configMap: { type: Object },
    initialJson: { type: Object },
    json: { type: Object },
  }
});
export default {
  name:'jsonDom',
  props: ["json","config"],
  data(){
      const initialJson = configToJson(this.config);
      return {
          configMap:JsonConfigToMap(this.config),
        //   connectJson:connectJson(initialJson,this.json),
          initialJson:initialJson
      }
  },
  created() {
    // this.configMap = JsonConfigToMap(this.config);
    // this.initialJson = configToJson(this.config);
    // this.json = connectJson(this.initialJson,this.data);
    // this.$et = new Vue();
    // this.$et.$on("delete", (config, parent, key) => {
    //   this.init();
    // });
  }
};
</script>
