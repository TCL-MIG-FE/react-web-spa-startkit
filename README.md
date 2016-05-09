# webpack react SPA scaffold 
> react单页项目模版 


## 依赖 
* lodash classnames querystring echarts
* react react-redux react-router react-router-redux react-dom react-bootstrap 
* redux redux-form redux-actions redux-async redux-thunk 

## Get Start 
    # 开发环境（未安装mtt）
    ---------
    git clone https://github.com/mtt-scaffold/webpack-react-spa.git
    npm install webpack -g
    cd webpack-react-spa && npm install                  
    
    # 开发环境（安装了mtt）
    ----------
    mtt init webpack-react-spa
    
    # 开发和打包
    ---------
    npm run mock            # 开启模拟服务器
    npm start               # 开发环境自动编译
    npm run build           # 打包到dist目录
    
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
       │  └─font 
       ├─middleware       # 中间件
       ├─reducers         # reducers
       ├─store            # 唯一的store
       ├─utils            # 工具方法
       ├─index.html       # 入口html
       ├─index.js         # 入口js
       └─routes.js        # 路由

## 说明
* 打包后会把三方依赖合并为vendor.v{date}.js，需要调整请修改webpack.config.js中的entry -> vendor，并同时修改vendor日期
* layouts中的css/less非模块化，使用时直接写样式名，container/components中的按模块方式使用
* 图标样式，glyphicon是bootstrap的图标；icon是[iconfont](http://www.iconfont.cn/)图标
* mac linux下`npm build`会报错，请修改package.json中设置环境变量的命令set NODE_ENV
* mock-server端口默认2618，webpack-dev-server默认端口3000，可以在package.json里修改
