//1.定义effect 
export function effect(fn,options){
    const effect = createReactEffect(fn,options);
    //判断一下
    if(!options.lazy){
        effect();//默认执行
    }
    return effect;
}

let uid=0;
let activeEffect // 保存当前的effect

function createReactEffect(fn,options){
    const effect = function reactiveEffect() {

    };
    effect.id = uid++; // 区分effect
    effect._isEffect = true; // 区分effect是不是响应式的effect
    effect.raw = fn; // 保存用户的方法
    effect.options = options // 保存用户的属性
    return effect;
}


// 3.收集effect 在获取数据的时候触发 get
export function Track(target,type,key){
    if (activeEffect === undefined) {
        // 没有在effect中使用
        return
    }
}