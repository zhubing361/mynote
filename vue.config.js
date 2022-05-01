const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: undefined,   
  publicPath: './',   
  outputDir: './package/dist',   // './webview/ mynote_app/web'
  assetsDir: undefined,   
  runtimeCompiler: undefined,   
  productionSourceMap: undefined,   
  parallel: undefined,   
  css: undefined,
  //webpack配置
	configureWebpack: {
    //关闭 webpack 的性能提示
    // performance: {
    //     hints:false
    // },

    //警告 webpack 的性能提示
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'mynote'
        return args
      })
  }
})
