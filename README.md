# 基于React+Redux的开发工程模板

## 项目依赖 
* lodash classnames querystring echarts
* react react-redux react-router react-router-redux react-dom react-bootstrap 
* redux redux-form redux-actions redux-async redux-thunk 

## 构建项目 

```bash
git clone https://github.com/TCL-MIG-FE/react-web-spa-startkit.git
cd react-web-spa-startkit && npm install
```                 
```bash
npm run mock            # 开启模拟服务器
npm run start           # 开发环境自动编译
npm run build           # 打包到static目录
```
    
## 目录结构   
    ├─mock-server         # 模拟服务器 
    │  └─api.json         # 模拟数据
    └─resources                 # 源码目录  
       ├─actions          # actions
       ├─components       # react组件
       │  ├─BarCharts 
       │  ├─DashboardModal 
       │  └─Nav 
       ├─constants        # 全局变量和配置
       ├─containers       # 各个路由的入口页面 
       │  ├─App           # 父级模版，所有页面公用
       │  ├─Config 
       │  ├─Dashboard 
       │  ├─NotFound 
       │  └─Statistics 
       ├─layouts          # 通用样式和字体
       │  ├─css 
       │  └─fonts 
       ├─middleware       # 中间件
       ├─reducers         # reducers
       ├─store            # 唯一的store
       ├─utils            # 工具方法
       ├─index.html       # 入口html模板,webpack会把编译后的脚本和样式注入进去
       ├─app.js         # 入口js
       └─routes.js        # 路由

## 说明
* 打包后会把三方依赖合并为vendors_{date}.js，需要调整请修改webpack.config.js中的entry -> vendors，并同时修改vendor日期。由于vendor一般不会发生变化，发生变化后请修改。
* layouts中的css/less非模块化，使用时直接写样式名，container/components中的按模块方式使用
* 图标样式，glyphicon是bootstrap的图标；icon是[iconfont](http://www.iconfont.cn/)图标
* mac linux下`npm build`会报错，请修改package.json中设置环境变量的命令set NODE_ENV
* mock-server端口默认2618，webpack-dev-server默认端口3000，可以在package.json里修改
