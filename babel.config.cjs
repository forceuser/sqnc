module.exports = function (api) {
	const config = {
		"presets": [
			["@babel/preset-env"],
		],
		"plugins": [
			["@babel/plugin-transform-runtime", {
				"corejs": 3,
			}],
		],
		env: {
			production: {},
		},
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
