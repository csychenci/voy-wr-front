const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpackCommon = require("./webpack.common");
const ZipWebpackPlugin = require("zip-webpack-plugin");

const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(webpackCommon, {
	mode: "production",
	devtool: "source-map",
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "../public"), // 复制public下文件
					to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
					filter: (source) => {
						return !source.includes("index.html"); // 忽略index.html
					}
				}
			]
		}),
		new CompressionPlugin({
			test: /.(js|css|otf|ttf)$/, // 只生成css,js压缩文件
			filename: "[path][base].gz", // 文件命名
			algorithm: "gzip", // 压缩格式,默认是gzip
			threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
			minRatio: 0.8 // 压缩率,默认值是 0.8
		}),
		new CleanWebpackPlugin(),
		new ZipWebpackPlugin({
			path: "../", //路径名
			filename: "dist.zip" //打包名
		})
	]
});
