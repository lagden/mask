'use strict'

import buble from 'rollup-plugin-buble'

export default {
	input: 'src/index.mjs',
	output: {
		file: 'dist/index.js',
		format: 'umd',
		name: 'Mask',
		sourcemap: true,
		strict: true
	},
	plugins: [buble()]
}
