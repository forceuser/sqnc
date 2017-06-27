/* global __dirname */
const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	entry: {
		"active-data": path.resolve(__dirname, "../src/cjs-entry.js"),
    	"active-data.min": path.resolve(__dirname, "../src/cjs-entry.js")
	},
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "[name].js",
		library: "activeData",
		libraryTarget: "umd"
	},
	devtool: "source-map",
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: [{
				loader: "babel-loader",
				options: {
					presets: [
						["es2015", {
							modules: false
						}]
					],
					plugins: []
				}
			}]
		}]
	},
	plugins: [
		new UglifyJSPlugin({
			include: /\.min\.js$/,
      		minimize: true,
			sourceMap: true,
			compress: {
				warnings: false,
				keep_fnames: true
			},
			mangle: {
				keep_fnames: true
			}
		})
	]
};
