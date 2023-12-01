import { isObject } from "@vue/shared";
import { reactive,readonly } from "./reactive";

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
        }
        if(shallow){
            //浅层代理
            return res;
        }
        //res 是一个对象 递归 懒代理
        if(isObject(res)){
            return isReadonly ? readonly(res):reactive(res);
        }
        return res;
    }
}
//set方法
function createSetter(shallow=false){
    
}

export const reactiveHandlers = {
    get,
    set,
}

export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet,
}

export const readonlyHandlers = {

}

export const shallowReadonlyHandlers = {

}