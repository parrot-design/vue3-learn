// 引入相关依赖
import ts from "rollup-plugin-typescript2" // 解析ts
import json from "@rollup/plugin-json"
import resolvePlugin from "@rollup/plugin-node-resolve" // 解析第三方插件
import path from "path"

// 获取文件路径
let packagesDir = path.resolve(__dirname, "packages")

// 2.1 获取需要打包的包
let packageDir = path.resolve(packagesDir, process.env.TARGET)

// 2.2 获取 每个包的项目配置
let resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const name = path.basename(packageDir)

console.log("pkg",pkg,name)