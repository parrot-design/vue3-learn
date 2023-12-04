import { isObject } from "@vue/shared";
import { reactive,readonly } from "./reactive";
import { TrackOpTypes } from "./operations";
import { Track } from "./effect";

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

const set = createSetter();

//get方法
function createGetter(isReadonly=false,shallow=false){
    return function get(target,key,receiver){
        //获取真正的值-反射
        const res = Reflect.get(target, key, receiver);
        //判断
        if(!isReadonly){
            //是否只读
            //收集依赖
            Track(target,TrackOpTypes.GET,key);
        }
        if(shallow){
            //浅层代理
            return res;
        }
        //res 是一个对象 递归 懒代理?
        if(isObject(res)){
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    }
}
//set方法
function createSetter(shallow=false){
    return function set(target,key,value,receiver){
        const result = Reflect.set(target, key, value, receiver);

        return result;
    }
}+

export const reactiveHandlers = {
    get,
    set,
}

export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet,
}

// 进行set方法合并
let readonlyObj = {
    set: (target, key, value) => {
      console.log(`set ${value} on key: ${key} is faild`)
    },
}

export const readonlyHandlers = {
    get:readonlyGet,
}

export const shallowReadonlyHandlers = {
    get:shallowReadonlyGet
}