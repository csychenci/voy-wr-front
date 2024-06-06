const path = require("path");
const { merge } = require('webpack-merge');
const webpack = require("webpack");
const webpackCommon = require("./webpack.common");

module.exports = merge(webpackCommon, {
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    open: true,
    host: '0.0.0.0',
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    historyApiFallback: true, // 解决history路由404问题
    port: 3333,
    client: {
      progress: true,
      logging: 'info',
      overlay: false
    },
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
    proxy: {
      '/gateway/sys': {
        // target: "http://10.10.25.28",
        // target: "https://voy.fltins.cn",
        // target: "http://gate.fltins.com:18082",
        target: "http://gate.fltins.com:18084",
        changeOrigin: true
      },
      '/gateway/voyage': {
        // target: "https://voy.fltins.cn",
        // target: "http://10.10.25.28",
        // target: "http://gate.fltins.com:18082",
        target: "http://gate.fltins.com:18084",
        changeOrigin: true
      },
      '/voyage/v1': {
        target: "http://10.10.80.18:9090",
        // target:"http://gate.fltins.com:18080",
        // target: "https://voyapi.fltins.com",

        changeOrigin: true
      },
      '/pfapi/voyage/v1': {
        target: "http://10.10.25.26:9090",
        // target:"http://gate.fltins.com:18080",
        changeOrigin: true
      },
      '/biz/v1': {
        // target: "http://10.10.25.26:9090",
        target: "http://gate.fltins.com:18080",
        // target:"http://10.10.25.26:18080",
        // target: "https://voyapi.fltins.com",
        // target:"https://voy.fltins.cn",
        changeOrigin: true,
        logLevel: "info",
      },
      '/biz/v2': {
        // target: "http://10.10.25.26:9090",
        target: "http://gate.fltins.com:18080",
        // target:"http://10.10.25.26:18080",
        // target: "https://voyapi.fltins.com",
        // target:"https://voy.fltins.cn",
        changeOrigin: true,
        logLevel: "info",
      },
      '/gateway/distbl': {
        target: "http://gate.fltins.com:18084",
        // target: "https://voyapi.fltins.com",
        changeOrigin: true,
        logLevel: "info",
      },
      '/pfapi/biz/v1': {
        // target:"http://gate.fltins.com:18080",
        target: "https://voyapi.fltins.com",
        changeOrigin: true,
        logLevel: "info",
      },
      '/gpt': {
        target: "http://gate.fltins.com:18080",
        changeOrigin: true,
        logLevel: "info",
      },
      '/ais': {
        // target: "https://voyapi.fltins.com",
        target: "http://gate.fltins.com:18080",
        changeOrigin: true,
        logLevel: "info",
      },
      '/s3file': {
        // target: "https://voyapi.fltins.com",
        target: "http://gate.fltins.com:18080",
        changeOrigin: true,
        logLevel: "info",
      },
      '/dev/seaweather': {
        target: "https://kk03yec3ai.execute-api.ap-northeast-1.amazonaws.com",
        changeOrigin: true,
        logLevel: "info",
      },
      '/api/meteorological': {
        target: "http://gate.fltins.com:8000",
        changeOrigin: true,
        logLevel: "info",
      },
      '/api': {
        target: "http://gate.fltins.com:18080",
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/biz/api'
        },
      },
      '/weather/copernicus': {
        target: "http://gate.fltins.com:18080",
        changeOrigin: true
      }
      // '/v1': {
      //   target: "http://10.10.25.26:9090",
      //   changeOrigin: true
      // }
      // '/api/v1': {
      //   // target: "http://120.78.132.73:80",
      //   // target:"http://192.168.2.78:8081",
      //   changeOrigin: true,
      //   // logLevel: "debug",
      // },
      // '/sysweb/voyageMap': {
      //   target: "http://47.106.155.200:8013/sysweb/voyageMap",
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/voyageMap': '/sysweb/voyageMap'
      //   // },
      // },
      // '/auth': {
      //   target: "http://47.106.155.200:8013/auth",
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/auth': '/auth'
      //   // },
      // },
      // '/api':{
      //   target: "http://47.106.155.200:8000/api",
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/api': '/api'
      //   // },
      // },
      // '/sysweb': {
      //   target: "http://47.106.155.200:8000/sysweb",
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/sysweb': '/sysweb'
      //   // },
      // },
    }
  }
});
