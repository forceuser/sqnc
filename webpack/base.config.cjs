const webpack = require("webpack");
const pkg = require("../package.json");
const nodePath = require("node:path");

module.exports = (env = {}) => {
	return ({
		entry:  nodePath.resolve(__dirname, "../src/sqnc.js"),
		// target: ["node", "web"],
		output: {
			path: nodePath.resolve(__dirname, "../dist/"),
			filename: "sqnc.js",
			chunkFilename: "[name].[contenthash].js",
			library: {
				name: "sqnc",
				type: "umd",
				// umdNamedDefine: true,
				export: "default",
				// export: "default",
				// target: "umd",
			},
		},
		optimization: {
			chunkIds: "named",
			splitChunks: {
				chunks: "all",
				cacheGroups: {
					// commons: {
					// 	// name: "vendor",
					// 	test (module) {
					// 		return module.resource
					// 		&& module.resource.includes("node_modules")
					// 		&& !["aes-js", "elliptic"].some(id => module.resource.includes(id));
					// 	},
					// 	// name: "vendors",
					// 	chunks: "all",
					// 	reuseExistingChunk: true,
					// },
					defaultVendors: {
						// name: "vendor",
						priority: -10,
						test (module) {
							return module.resource
							&& module.resource.includes("node_modules")
							&& !["aes-js", "elliptic"].some(id => module.resource.includes(id));
						},
						// name: "vendors",
						chunks: "async",
						reuseExistingChunk: true,
					},
				},
			},
		},
		resolve: {

		},
		devtool: "source-map",
		module: {
			rules: [
				{
					exclude: /node_modules/,
					use: [
						{
							loader: "ts-loader"
						}
					],
				},
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
