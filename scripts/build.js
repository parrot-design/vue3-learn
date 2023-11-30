// 进行打包 monerepo
// 1获取打包 目录
const execa = require("execa")
const fs = require("fs")

//fs.readdirSync读取目录的内容
const dirs = fs.readdirSync('packages').filter(p=>{
    //statSync读取文件状态 过滤文件夹
    return fs.statSync(`packages/${p}`).isDirectory()
});

//2.并行打包 ==================================================================
 
runParallel(dirs,build).then(()=>{
    console.log("成功！")
});

// 2进行打包 并行打包
async function build(target) {
    await execa("rollup", ["-c", "--environment", `TARGET:${target}`], {
      stdio: "inherit",
    }) // 子进程的输出在父包中输出
}

function runParallel(dirs,buildFn){
    let result = [];
    for(let dir of dirs){
        result.push(buildFn(dir));
    }
    return Promise.all(result);
}
