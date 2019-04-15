# person-mpvue-demo

> demo

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


#下面为项目说明：

#### vxUI 可用

#### vuex 可用，有本地存储功能

#### scss 可用

#### mpvue分包 可用
    两个子包：sub_manager(掌柜) 和 sub_my(我的)
    子包页面调试放在主包中，调试好后放入子包
    
#### flyio API 框架未引入使用，后期添加




#
