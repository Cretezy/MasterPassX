import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const formats = ["cjs", "es"];
export default formats.map(format => ({
	input: 'src/index.js',
	output: {
		file: `dist/index.${format}.js`,
		format
	},
	plugins: [
		resolve({
			preferBuiltins: false
		}),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			presets: [
				[
					"env",
					{
						modules: false
					}
				]
			],
			plugins: [
				"external-helpers"
			],
			babelrc: false
		})
	]
}));