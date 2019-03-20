/* global __dirname */
const webpack = require("webpack");
const path = require("path");
const pkg = require("../package.json");
const ma = pkg._moduleAliases || {};
const alias = Object.keys(ma).reduce((acc, key) => (acc[key] = path.resolve(__dirname, "../", ma[key])  , acc), {});

module.exports = (env = {}) => {
	return ({
		entry: `./src/sqnc.js`,
		output: {
			path: path.resolve(__dirname, "../dist/"),
			filename: "sqnc.js",
			library: "sqnc",
			libraryExport: "default",
			libraryTarget: "umd",
			// publicPath: `/js/`,
			globalObject: "typeof self !== 'undefined' ? self : this",
		},
		resolve: {
			alias: alias,
		},
		devtool: "source-map",
		module: {
			rules: [
				// {
				// 	test: /\.(js|mjs)$/,
				// 	exclude: /(node_modules)/,
				// 	use: [{
				// 		loader: "babel-loader",
				// 		options: {
				// 			babelrc: true,
				// 			// envName: "browser",
				// 		},
				// 	}],
				// },
				{
					test: /(\.html|\.txt)$/,
					use: [
						{
							loader: "raw-loader"
						}
					]
				},
			],
		},
		plugins: [
		],
	});
}
