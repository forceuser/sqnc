/* global __dirname */
const path = require("path");

module.exports = {
	entry: [
		path.resolve(__dirname, "../test/index.js")
	],
	output: {
		path: path.resolve(__dirname, "../test/build"),
		filename: "index.js"
	},
	node: {
		fs: "empty"
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
					plugins: [
						["istanbul", {
							"exclude": [
								"test/**/*"
							]
						}]
					]
				}
			}]
		}]
	},
	plugins: []
};
