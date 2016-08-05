import process from 'process';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');

let external = Object.keys(pkg.dependencies);

let rc = babelrc('src/.babelrc');
if (process.env.coverage === 'true') {
	rc.plugins = [
		'__coverage__'
	];
}

export default {
	entry: 'src/index.js',
	plugins: [babel(rc)],
	external: external,
	targets: [
		{
			dest: pkg.main,
			format: 'umd',
			exports: 'named',
			moduleName: 'muxml',
			moduleId: 'muxml',
			sourceMap: true,
			sourceMapFile: pkg.main + '.map'
		},
		{
			dest: pkg['jsnext:main'],
			format: 'es',
			exports: 'named',
			sourceMap: true,
			sourceMapFile: pkg['jsnext:main'] + '.map'
		}
	]
};
