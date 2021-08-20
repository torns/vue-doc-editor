module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  configureWebpack: {
    output: {
      library: `${process.env.VUE_APP_APP_NAME}`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${process.env.VUE_APP_APP_NAME}`,
    },
  },
  devServer: {
    port: 9091,
    inline: true, //开启页面自动刷新
    lazy: false, //不启动懒加载
    overlay: true, //在浏览器上全屏显示编译的errors或warnings
    stats: "minimal",
    quiet: false, //控制台中不输出打包的信息
    contentBase: "../", //contentBase默认是当前的工作目录，当它查不到打包在内存中的资源的时候，它就会到contentBase中去找
    compress: true, //开启gzip压缩 类似nginx的配置
    historyApiFallback: {
      rewrites: [{ from: /^.*/, to: "/index.html" }],
    },
    //子系统允许跨域
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
