import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

const rc = babelrc('.babelrc');
rc.exclude = 'node_modules/**';

export default {
	entry: 'src/index.js',
	plugins: [babel(babelrc())],
	external,
	targets: [
		{
			dest: pkg['jsnext:main'],
			format: 'es',
			exports: 'named',
			sourceMap: true,
			sourceMapFile: pkg['jsnext:main'] + '.map'
		},
		{
			dest: pkg.main,
			format: 'umd',
			exports: 'named',
			moduleName: 'muxml',
			moduleId: 'muxml',
			sourceMap: true,
			sourceMapFile: pkg.main + '.map'
		}
	]
};
