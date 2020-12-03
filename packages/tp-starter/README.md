# `@popak/tp-starter`

功能：快速创建一个标准的 typescript 项目代码库

## Usage

全局安装

```
npm install -g @popak/tp-starter
```

命令行创建项目

```
tps create xxx
```

## Features

1. 使用 typedoc 生成文档
2. 使用 eslint, prettier 规范代码
3. 使用 husky, lint-staged, pre-commit 进行代码提交检查修正
4. 使用 webpack 打包
5. 使用 typescript 生成 d.ts 文件
6. 自动初始化 git 代码库
7. 自动安装依赖库

todo
1. 支持 gulp x
2. 支持 rollup √
3. 支持 rollup 模板，配置文件等 √
4. 使用 lerna 管理 webpack, rollup 等模板库 √
5. init git √
6. install node_modules √
7. 支持 commit lint √
8. 检查 project 是否存在，提供 覆盖、合并、取消的选择
9. 支持 test 测试初始化
10. 自动 init commit
