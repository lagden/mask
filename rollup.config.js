import commonjs from '@rollup/plugin-commonjs'
export default [
	{
		input: './src/mask.js',
		output: {
			file: 'dist/mask.cjs',
			format: 'cjs',
			strict: false,
			sourcemap: false,
		},
		plugins: [
			commonjs(),
		]
	},
]
