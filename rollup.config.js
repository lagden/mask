'use strict'

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

function plugins() {
	return [
		resolve({browser: true}),
		commonjs()
	]
}

const config = [
	{
		input: 'src/index.js',
		output: [
			{
				file: 'dist/index.js',
				format: 'es',
				name: 'Mask',
				sourcemap: true,
				strict: false
			}
		],
		external: ['@tadashi/hex-id']
	},
	{
		input: 'src/index.js',
		output: [
			{
				file: 'dist/index.umd.js',
				format: 'umd',
				name: 'Mask',
				sourcemap: true,
				strict: false
			}
		],
		plugins: plugins()
	}
]

export default config
