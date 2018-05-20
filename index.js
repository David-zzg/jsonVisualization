const json = {
    name:'david',
    obj:{
        name:"david2"
    },
    list:[{
        name:"david3"
    }]
}

const component = {
    string:"string",
    obj:"obj",
    list:"list"
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
    }
}

function createComponent(obj,indexStr,container,config) {
    if(isObj(obj)){
        //对象
        let innerContainer = [];
        for(var i in obj ){
            let item = obj[i];
            createComponent(item,`${indexStr}.${i}`,innerContainer,config);
        }
        container.push({
            type:"obj",
            children:innerContainer,
            indexStr:indexStr
        });
        return container;
    }else if(isArr(obj)){
        //数组
        let innerContainer = [];
        for(var i in obj ){
            let item = obj[i];
            createComponent(item,`${indexStr}.[${i}]`,innerContainer,config);
        }
        container.push({
            type:"list",
            children:innerContainer,
            indexStr:indexStr
        });
        return container;
        // let _obj = obj[0];
        // let innerContainer = [];
        // container.push({
        //     type:"list",
        //     children:innerContainer
        // })
        // createComponent(_obj,`${indexStr}.[0]`,innerContainer,config);
    }else{
        let result = getValueByStr(indexStr,config);
        container.push({
            type:result.type,
            value:obj,
            indexStr:indexStr,
            config:result
        });
        
        return container;
    }
    // if(canLoop(obj)){
    //     let innerContainer = [];
    //     for(var i in obj ){
    //         let item = obj[i];
    //         createComponent(item,indexStr+"",innerContainer);
    //     }
    //     return innerContainer;
    // }else{
    //     // let component = config.type;
    //     container.push(indexStr);
    //     return container;
    // }
}

export function init(json,config) {
    let result = createComponent(json,"",[],config);
    return result[0];
}

export function getValueByIndexStr(str,json) {
    var arr = str.split(".").filter(item=>item).map(item=>item.replace(/\[(\d+)\]/g,'$1'));
    var last = arr.pop();
    var obj =  arr.reduce((total,next)=>{
    return total[next]  
    },json);
    return {
        obj:obj,
        key:last
    }
}



function isObj(target) {
    const targetStr = Object.prototype.toString.call(target);
    return  targetStr === "[object Object]";
}

function isArr(target) {
    const targetStr = Object.prototype.toString.call(target);
    return  targetStr === "[object Array]";
}

//根据字符串索引获取内容
// const json = {
//     name:'david',
//     obj:{
//         name:"david2"
//     },
//     list:[{
//         name:"david3"
//     }]
// }
// getValueByStr(".list[0].name",json)
function getValueByStr(str,obj) {
    let temStr = str.slice(1);
    temStr = temStr.replace(/\.\[/g,"[").replace(/\[\d+\]/g,'[0]');
    return obj[temStr];
}