module.exports = function (api) {
	const config = {
		"presets": [
			["@babel/preset-env", {"modules": false, "useBuiltIns": "usage"}],
		],
		"plugins": [
			"@babel/plugin-syntax-dynamic-import",
			"@babel/plugin-syntax-import-meta",
		],
	};
	if (api.env(["test"])) {
		Object.assign(config, {
			generatorOpts: {
				sourceMaps: "inline",
				shouldPrintComment: () => true,
				compact: true,
				minified: false,
				retainLines: true,
			},
		});
		config.plugins.push(["istanbul", {
			"useInlineSourceMaps": true,
			"exclude": ["test/**/*", "build-utils/**/*"],
		}]);
	}
	console.log("babel config", config);
	return config;
};
