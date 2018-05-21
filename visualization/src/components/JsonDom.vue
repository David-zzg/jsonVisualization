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
} from "../core/index";
export default {
  name: "jsonDom",
  props: ["json", "config"],
  data() {
    const initialJson = configToJson(this.config);
    return {
      configMap: JsonConfigToMap(this.config),
      initialJson: initialJson
    };
  }
};
</script>
