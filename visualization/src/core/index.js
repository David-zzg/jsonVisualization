const DataType = {
    String:'string',
    Object:'object',
    Array:'array'
}

function configToJson(config) {
    function configItemToJson(configItem,obj) {
        const key = configItem.key;
        if(!key){
            throw new Error('missing key');
        }
        const type = configItem.type;
        if(!type){
            throw new Error('missing type');
        }
        if(isObjectOrArrayByType(type)){
            // 如果是数组或者对象
            if(configItem.children){
                obj[key] = getDefaultValueByType(type);
                if(isArrayByType(type)){
                    // obj[key] = [{}];
                    main(configItem.children,obj[key]);
                }else{
                    main(configItem.children,obj[key]);
                }
            }else{
                throw new Error('array or obj missing children');
            }
        }else{
            obj[key] = configItem.defaultValue || getDefaultValueByType(type);
        }
    }

    function main(config,json) {
        if(isArray(config)){
            // 权重排序
            config = config.sort((pre,next) => {
                return pre.sort < next.sort
            })
            for(var i in config){
                const configItem = config[i];
                if(typeof configItem === "undefined"){
                    debugger
                }
                main(configItem,json);
            }
        }else{
            configItemToJson(config,json);
        }
    }
    window.totalJson = {};//根元素肯定是对象
    main(config,totalJson,'object');
    return totalJson;
}

/**
 * 判断是否是数组或者对象
 * @param {目标对象} target 
 */
function isObjectOrArray(target) {
    const str = Object.prototype.toString.call(target);
    return str === '[object Object]' || str === '[object Array]';
}

/**
 * 根据type字符串判断是否是数组或对象
 * @param {*} type 
 */
function isObjectOrArrayByType(type) {
    return type === DataType.Object || type === DataType.Array;
}

/**
 * 判断是否是数组
 * @param {*} target 
 */
function isArray(target) {
    return Object.prototype.toString.call(target) === '[object Array]';
}

/**
 * 判断是否是对象
 * @param {*} target 
 */
function isObject(target) {
    return Object.prototype.toString.call(target) === '[object Object]';
}

/**
 * 根据字符串判断类型
 * @param {*} type 
 */
function isArrayByType(type) {
    return type === DataType.Array;
}


/**
 * 根据数据类型返回默认值
 * @param {类型} type 
 */
function getDefaultValueByType(type) {
    switch (type) {
        case DataType.String:
            return '';
            break;
        case DataType.Object:
            return {};
        case DataType.Array:
            return [];
        default:
            throw new Error('err type')
            break;
    }
}

// configToJson(json)




function tranformJsonConfigToMap(json,configJson) {
    
}

/**
 * 数据库的json配置转化成map对象
 * @param {*} params 
 */
function defalutJsonToMap(defalutJson) {
    function handleDefaultJsonItem(defalutJsonItem,indexStr,mapObj) {
        mapObj
    }
    function main(defalutJson,mapObj) {
        if(isObjectOrArray(defalutJson)){

        }else{
            handleDefaultJsonItem(defalutJson,'',mapObj)
        }
    }
    var mapObj = {};
    main(defalutJson,mapObj)
}


function JsonConfigToMap(jsonConfig) {
    function handleJsonConfigItem(jsonConfigItem,indexStr,mapObj) {
        indexStr+=`.${jsonConfigItem.key}`;
        mapObj[indexStr] = Object.assign({},jsonConfigItem,{indexStr});
        // if(isArrayByType(jsonConfigItem.type)){
        //     indexStr +='[0]';
        // }
        if(jsonConfigItem.children){
            main(jsonConfigItem.children,indexStr,mapObj)
        }
    }

    function main(jsonConfig,indexStr,mapObj) {
        if(isArray(jsonConfig)){
            for(let i in jsonConfig){
                const jsonConfigItem = jsonConfig[i];
                main(jsonConfigItem,indexStr,mapObj);
            }
        }else{
            handleJsonConfigItem(jsonConfig,indexStr,mapObj);
        }
    }
    let mapObj = {};
    main(jsonConfig,'',mapObj);
    return mapObj;
}

// JsonConfigToMap(json)



function render(h,componentObj) {
    function createComponent(item,configMap,indexStrArr) {
        const key = indexStrArr.join('');
        const config = configMap[key];
        // console.log(key,config);
        return h(componentObj.string,{},[])
    }
    function main(key,value,configMap,initialJson,context,indexStrArr) {
        if(isObjectOrArray(value)){
            // 可遍历
            return Object.keys(value).map((i,index) => {
                let component;
                if(isArray(value)){
                    indexStrArr.push(`.0`);
                }else{
                    indexStrArr.push(`.${i}`);
                }
                // indexStrArr.push(`.${i}`);
                let config = configMap[indexStrArr.join("")];
                if(typeof config === 'undefined'){
                    debugger
                    throw new Error('missing config');
                }
                component = componentObj[config.type];
                let children = main(i,value[i],configMap,initialJson,context,indexStrArr);
                indexStrArr.pop();
                const componentOptions = getComponentOptionsByType(config,initialJson,value,i,json,context);
                const componentPayload = {props:{config:config,json,$jsonCreator:$vm,$$parent:value,$$key:i,componentType:config.type,configMap:configMap}};
                return h(component,componentOptions,Array.isArray(children)?[...children]:[children])
            })
        }else{
            return createComponent(key,configMap,indexStrArr)
        }
    }
    let finalresult = null;
    const $vm = this;
    const json = this.json;
    const configMap = this.configMap;
    let children = [];
    const initialJson = JSON.parse(JSON.stringify(this.initialJson));

    const result = main(0,json,configMap,initialJson,this,[]);
    
    // return null;
    return h("div",{},result)
}

function getComponentOptionsByType(config,initialJson,parent,key,json,context) {
    const type = config.type;
    if(!type){
        throw new Error('config missing type');
    }
    const options = {
        props:{
            config:config,
            json:json,
            initialJson:initialJson
        }
    }
    switch (type) {
        case DataType.Array:
            const obj = getValueByIndexStr(initialJson, config.indexStr);
            options.props.list = parent[key];
            options.props.addListItem = function (params) {
                console.log(obj);
                // const list = JSON.parse(JSON.stringify(obj.obj[obj.last]));
                const list = obj.obj[obj.last];
                parent[key].push(...list);
            }
            options.props.delListItem = function (index) {
                parent[key].splice(index,1);
            }
            options.props.updateListItem = function (json,index) {
                // parent[key].splice(index,1,JSON.parse(JSON.stringify(json)));
                parent[key].splice(index,1,json);
            }
            options.props.resetListItem = function (index) {
                parent[key].splice(index,1,JSON.parse(JSON.stringify(parent[key][index])));
            }
            break;
        case DataType.Object:
            options.props.canDelete = function (params) {
                return isArray(parent); 
            }
            options.props.deleteItem = function (params) {
                parent.splice(key,1);
                context.$et.$emit('delete');
            } 
            options.props.index = key;
        default:
            options.props.val =  parent[key];
            options.props.updateValue = function (val) {
                parent[key]=val
            }
            break;
    }
    console.log('options',options)
    return options;
}

/**
 * 根据字符串路径获取上层对象
 * @param {*} json 
 * @param {*} indexStr 
 */
function getValueByIndexStr(json,indexStr) {
    if(!json || !indexStr){
        throw new Error("missing params");
    }
    const arr = indexStr.split(".");
    if(arr.length === 1){
        //只有一个的情况
        return {
            obj:json,
            last:indexStr
        };
    }else{
        // 一直遍历到倒数第一个
        let last = arr.pop();
        try{
            const result = arr.reduce((total,next) => {
                if(next)return total[next]
                return total;
            },json);
            return {
                obj:result,
                last
            };
        }catch(e){
            throw new Error('parse json error');
        }
    }
}

/**
 * 获取加成后的json
 * @param {} params 
 */
function connectJson(config,json) {
    const initialJson = configToJson(config);
    return  _connectJson(initialJson,json);
}

function _connectJson(initialJson,json) {
    let finnalJson;
    if(Object.prototype.toString.call(initialJson) !==  Object.prototype.toString.call(json)){
        finnalJson = initialJson;
        return finnalJson;
    }
    if(isObjectOrArray(initialJson)){
        const isArrayTag = isArray(initialJson)?true:false;
        finnalJson = isArrayTag?[]:{};
        if(isArrayTag){
            finnalJson = json.map((item,index)=>{
                return _connectJson(initialJson[0],json[index]);
            })
        }else{
            for(let i in initialJson){
                const item = initialJson[i];
                if(json.hasOwnProperty(i)){
                    finnalJson[i] = _connectJson(item,json[i]);
                }else{
                    finnalJson[i] = item;
                }
            }
        }
        
        return finnalJson;
    }else{
        finnalJson = json;
        return finnalJson;
    }
}

import plugins from './plugins';

export {
    configToJson,
    JsonConfigToMap,
    isObjectOrArray,
    isArrayByType,
    render,
    getValueByIndexStr,
    connectJson,
    plugins
}

