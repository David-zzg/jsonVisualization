import Vue from 'vue';
import JsonArray from "@/components/JsonArray";
import JsonObject from "../components/JsonObject";
import JsonString from "../components/JsonString";
import {render} from '@/core/index';
Vue.component("JsonCreator", {
    created() { },
    render(h) {
        return render.call(this, h, {
            array: JsonArray,
            object: JsonObject,
            string: JsonString
        });
    },
    props: {
        configMap: { type: Object },
        initialJson: { type: Object },
        json: { type: Object },
    }
});