const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerplugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const WebpackBar = require("webpackbar");
const DotEnvWebpackPlugin = require("dotenv-webpack");

const isDevelopment = (args) => {
	return args?.includes("development");
};

const isDev = isDevelopment(process?.argv);

console.log(
	"env",
	isDev,
	path.resolve(__dirname, `../.env.${isDev ? "develoment" : "production"}`)
);

module.exports = {
	entry: {
		app: path.join(__dirname, "../src/index.tsx")
		// docs:path.join(__dirname,"../docs/index.tsx")
	},
	output: {
		path: path.join(__dirname, "../dist"),
		filename: "static/js/[name].[chunkhash:8].js",
		publicPath: "/",
		clean: true
	},
	optimization: {
		minimizer: [
			new CssMinimizerplugin(),
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					compress: {
						// ["pure_funcs"]: [!isDev ? "console.log(" : ""],
						drop_console: isDev ? false : true,
						drop_debugger: isDev ? false : true
					}
				}
			})
		],
		splitChunks: {
			cacheGroups: {
				vendors: {
					// 提取node_modules代码
					test: /node_modules/, // 只匹配node_modules里面的模块
					name: "vendors", // 提取文件命名为vendors,js后缀和chunkhash会自动加
					minChunks: 1, // 只要使用一次就提取出来
					chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
					minSize: 0, // 提取代码体积大于0就提取出来
					priority: 1 // 提取优先级为1
				},
				commons: {
					// 提取页面公共代码
					name: "commons", // 提取文件命名为commons
					minChunks: 2, // 只要使用两次就提取出来
					chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
					minSize: 0 // 提取代码体积大于0就提取出来
				}
				// mapboxgl: {
				//   priority: 20,
				//   name: 'mapboxgl-gl',
				//   test: /mapboxgl-gl/,
				//   reuseExistingChunk: true
				// },
			}
		}
	},
	module: {
		rules: [
			{
				include: [path.resolve(__dirname, "../src")],
				test: /\.(js|ts|tsx)$/,
				use: ["thread-loader", "babel-loader"],
				generator: {
					filename: "static/js/[name].[chunkhash:8].js"
				}
			},
			{
				test: /\.css$/,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["autoprefixer"]
							}
						}
					}
				]
			},
			{
				test: /\.less$/,
				include: [path.resolve(__dirname, "../src")],
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader"
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["autoprefixer"]
							}
						}
					},
					{
						loader: "less-loader"
					}
				]
			},
			{
				test: /.(png|jpg|jpeg|gif)$/, // 匹配图片文件
				type: "asset", // type选择asset
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024 // 小于10kb转base64位
					}
				},
				generator: {
					filename: "static/images/[name].[contenthash:8][ext]" // 文件输出目录和命名
				}
			},
			{
				test: /\.svg$/, // 匹配图片文件
				type: "asset", // type选择asset
				generator: {
					filename: "static/images/[name].[contenthash:8][ext]" // 文件输出目录和命名
				}
			},
			{
				test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
				type: "asset", // type选择asset
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024 // 小于10kb转base64位
					}
				},
				generator: {
					filename: "static/fonts/[name].[contenthash:8][ext]" // 文件输出目录和命名
				}
			},
			{
				test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
				type: "asset", // type选择asset
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024 // 小于10kb转base64位
					}
				},
				generator: {
					filename: "static/media/[name].[contenthash:8][ext]" // 文件输出目录和命名
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "static/css/[name].[contenthash:8].css"
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
			inject: true, // 自动注入静态资源
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: false
			}
		}),
		new webpack.DefinePlugin({
			"process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV)
		}),
		new WebpackBar({
			color: "#85d",
			basic: false, // 默认true，启用一个简单的日志报告器
			profile: false // 默认false，启用探查器。
		}),
		new DotEnvWebpackPlugin({
			path: path.resolve(
				__dirname,
				`../.env.${isDev ? "develoment" : "production"}`
			)
		}),
		new EslintWebpackPlugin({
			context: path.resolve(__dirname, "src")
		})
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		modules: [path.resolve(__dirname, "../node_modules")], // 查找第三方模块只在本项目的node_modules中查找

		alias: {
			static: path.resolve("public"),
			workSrc: path.resolve("src"),
			"@": path.join(__dirname, "../src") // 配置别名
		}
	},
	externals: [
		{
			"./cptable": "var cptable",
			"../xlsx.js": "var _XLSX"
		}
	]
};
