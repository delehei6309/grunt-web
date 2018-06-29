# grunt-web

## grunt基础搭建

### 1、全局安装grunt
``` bash
cnpm install -g grunt-cli
```
### 2、安装依赖
``` bash
cnpm install
```
### 3 开发中运行
``` bash
grunt
```

## 本地服务node
``` bash
node server
```
访问 [localhost:8086/base](http://localhost:8086/base)

## 代码规范

### 目录结构
* 如src/ 下所示
* html，less，jses6，images

### 命名规则
* js，less文件用小写字母命名，单词之间以 - 分割，image文件实际上也应该如此
* 函数，变量名使用驼峰命名规则，比如user，getUser
* 样式的class 用小写字母命名，单词之间以 - 分割，比如.login，.login-tab

### 样式书写规则

* 每个less文件由独立，唯一的class包裹，通常为该less的文件名，比如login.less如下
```less
.login {
    width: 100%;
    height: 100%;
    .other{
    ...
    }
}
```
这样可避免样式冲突，每个container组件对应一个less文件

* 使用变量，常用的字体颜色以及背景颜色变量存放于less/variables.less文件里，使用时只需引入该文件

* 使用rem，设计稿基于iphone6 ，less/rem.less以针对不同机型做了适配，
使用时将设计师标注的px数值除以20变算为rem数值，rem数值精确到0.05.
* 使用padding或者margin来控制边距，通常为0.8rem
* 这样可以使.index占满宽度，并且边上由一定空隙,比如
```less
.index {
    position:relative;
    padding:0.5rem 0.8rem;
}
```


### 使用es6
* 使用es6语法
* 为保证兼容性，不可以使用es6新增的原型方法 ，比如 Array.prototype.filter ,String.prototype.startWith等
 因为要使用这些方法，必须引入 babel-polyfill ,然后这个文件巨大。
*  如有需要可使用lodash/core里等方法,链接[lodash/core](https://github.com/lodash/lodash/wiki/build-differences)

