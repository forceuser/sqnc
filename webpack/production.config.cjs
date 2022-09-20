const {merge} = require("webpack-merge");
const baseConfig = require("./base.config.cjs");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env = {}) => {
	const result = merge(baseConfig(env), {
		mode: "production",
		devtool: "source-map",
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: {
							drop_console: true,
						},
					},
				}),
			]
		},
		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 1,
			}),
		],
	});
	// result.plugins.push(new webpack.optimize.MinChunkSizePlugin({minChunkSize: 100000}));

	return result;
};
