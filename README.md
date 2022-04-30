# mynote

## Project create
```
vue create mynote
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 参考
> https://www.w3cschool.cn/css/list/

> https://element-plus.gitee.io/zh-CN/guide/quickstart.html

### 打包成exe

- 参考文档
> https://www.jianshu.com/p/059317152236

> https://github.com/electron/electron-quick-start.git

electron zip包下载
> https://npmmirror.com/ - npmmirror 中国镜像站
> https://npmmirror.com/mirrors/electron/


#### 项目打包步骤

    npm run build // 构建

    cd package
    npm run start // 预览
    npm run packager // 打包

    最后用inno生成安装程序
        Inno Setup Compiler 打开 ./inno/setup.iss， 执行Build->Compile
    
    ./bin/mynote-setup.exe