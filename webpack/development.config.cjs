const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./base.config.cjs");
const webpack = require("webpack");

module.exports = (env = {}) => {
	const base = baseConfig(env);
	let result = merge(base, {
		mode: "development",
		devServer: {},
	});

	Object.keys(result.entry).forEach(key => {
		result.entry[key] = ["webpack-hot-middleware/client?reload=true"].concat(result.entry[key]);
	});
	result.plugins.push(new webpack.HotModuleReplacementPlugin());
	return result;
}
