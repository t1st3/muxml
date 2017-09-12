import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

const rc = babelrc('.babelrc');
rc.exclude = 'node_modules/**';

export default {
	input: 'src/index.js',
	plugins: [babel(babelrc())],
	external,
	output: [
		{
			file: pkg['jsnext:main'],
			format: 'es',
			exports: 'named',
			sourcemap: true,
			sourcemapFile: pkg['jsnext:main'] + '.map'
		},
		{
			file: pkg.main,
			format: 'umd',
			exports: 'named',
			name: 'muxml',
			sourcemap: true,
			sourcemapFile: pkg.main + '.map'
		}
	]
};
