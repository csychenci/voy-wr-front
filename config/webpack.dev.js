const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const webpackCommon = require("./webpack.common");

module.exports = merge(webpackCommon, {
	devtool: "eval-cheap-module-source-map",
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		hot: true,
		open: true,
		host: "0.0.0.0",
		compress: false, // gzip压缩,开发环境不开启,提升热更新速度
		historyApiFallback: true, // 解决history路由404问题
		port: 7878,
		client: {
			progress: true,
			logging: "info",
			overlay: false
		},
		static: {
			directory: path.join(__dirname, "../public") //托管静态资源public文件夹
		}
	}
});
