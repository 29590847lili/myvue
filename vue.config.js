module.exports = {
  publicPath: './', // 配置根目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录（js,css,image）
  lintOnSave: 'default', // 是否开启eslint检测,false不开启，有效值：true || false || default
  productionSourceMap: false, // 生成环境下面开启sourceMap支持断点调试
  devServer: {
    open: true, // 是否启动打开浏览器
    host: '0.0.0.0', // 主机，0.0.0.0支持局域网地址，可以用真机测试
    port: 8080, // 端口
    https: false, // 是否启动https
    // 配置跨域代理http,https  http://192.168.2.23:8095/ http://192.168.0.29:40010/ 卢涛 http://192.168.0.187:40010
    proxy: {
      '/api': {
        target: 'http://192.168.2.28:8080/api/', // 测试ip 30005 \ 8095
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/wx': {
        target: 'https://mp.weixin.qq.com/', // 目标接口域名
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/wx': '' // 重写接口,后面可以使重写的新路径，一般不做更改
        }
      }
    }
  }
}
