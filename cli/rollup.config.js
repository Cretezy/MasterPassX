import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import shebang from 'rollup-plugin-shebang';

export default [{
	input: 'src/WelcomeScreen.js',
	output: {
		file: `dist/index.js`,
		format: "cjs"
	},
	plugins: [
		resolve({
			preferBuiltins: true,
			module: true,
		}),
		commonjs(),
		json({
			preferConst: true,
		}),
		babel({
			exclude: 'node_modules/**',
			presets: [
				[
					"env",
					{
						modules: false,
						targets: {
							node: "8"
						}
					}
				]
			],
			plugins: [
				"external-helpers"
			],
			babelrc: false,
		}),
		shebang()
	]
}];
