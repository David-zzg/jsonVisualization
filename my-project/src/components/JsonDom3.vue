<template name="jsonDom">
    <div id="jsonDom"></div>
</template>
<script>
import {
  configToJson,
  JsonConfigToMap,
  json,
  isObjectOrArray,
  isArrayByType,
  render,
  getValueByIndexStr
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
    config: { type: Object },
    $et: { type: Object }
  }
});
Vue.component("JsonDom", {
  name:'JsonDom',
  mounted() {
    this.init();
  },
  template:`<div id="jsonDom"></div>`,
  methods: {
    init() {
      var dom = document.getElementById("jsonDom");
      dom.innerHTML = "";
      var innerDom = document.createElement("div");
      innerDom.id = "jsonInner";
      dom.appendChild(innerDom);
      const configMap = this.configMap;
      const initialJson = this.initialJson;
      const json = this.json;
      const $et = this.$et;
      new Vue({
        render(h, context) {
          return h(
            "JsonCreator",
            {
              props: {
                configMap,
                initialJson,
                json,
                $et
              }
            },
            []
          );
        }
      }).$mount("#jsonInner");
    }
  },
  props: ["json","config"],
  created() {
    this.configMap = JsonConfigToMap(this.config);
    this.initialJson = configToJson(this.config);
    this.$et = new Vue();
    this.$et.$on("delete", (config, parent, key) => {
      this.init();
    });
  }
});
export default {
  name:'jsonDom',
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var dom = document.getElementById("jsonDom");
      dom.innerHTML = "";
      var innerDom = document.createElement("div");
      innerDom.id = "jsonInner";
      dom.appendChild(innerDom);
      const configMap = this.configMap;
      const initialJson = this.initialJson;
      const json = this.json;
      const $et = this.$et;
      new Vue({
        render(h, context) {
          return h(
            "JsonCreator",
            {
              props: {
                configMap,
                initialJson,
                json,
                $et
              }
            },
            []
          );
        }
      }).$mount("#jsonInner");
    }
  },
  props: ["json","config"],
  created() {
    this.configMap = JsonConfigToMap(this.config);
    this.initialJson = configToJson(this.config);
    this.$et = new Vue();
    this.$et.$on("delete", (config, parent, key) => {
      this.init();
    });
  }
};
</script>

