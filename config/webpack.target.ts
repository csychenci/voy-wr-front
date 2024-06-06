const webpack = require('webpack');
const prodConfig = require('./webpack.prod');
const analyConfig = require('./webpack.analy');
const { name: packageName } = require('../package.json');

enum LIBARY_TARGET {
	umd = 'umd',
	cjs = 'cjs',
	esm = 'esm'
}

const targetUMD = (mode: any) => {
	const config = mode === 'analy' ? analyConfig : prodConfig;

	return {
		...config,
		output: {
			...config.output,
			filename: 'umd/[name].js',
			library: {
				name: packageName,
				type: 'umd'
			}
		}
	};
};

const targetCJS = (mode: any) => {
	const config = mode === 'analy' ? analyConfig : prodConfig;
	return {
		...config,
		output: {
			...config.output,
			filename: 'cjs/[name].js',
			library: {
				name: packageName,
				type: 'commonjs'
			}
		}
	};
};
const targetESM = (mode: any) => {
	const config = mode === 'analy' ? analyConfig : prodConfig;
	return {
		...config,
		experiments: {
			outputModule: true
		},
		output: {
			...config.output,
			filename: 'esm/[name].js',
			library: {
				type: 'module',
				export: 'default'
			}
		}
	};
};
const _libraryTargetConfig = new Map([
	[LIBARY_TARGET.umd, targetUMD],
	[LIBARY_TARGET.cjs, targetCJS],
	[LIBARY_TARGET.esm, targetESM]
]);
module.exports = _libraryTargetConfig;
