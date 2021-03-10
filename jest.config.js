module.exports = {
	bail: false,
	moduleFileExtensions: ['js'],
	transform: {
		'^.+\\.js$': 'babel-jest'
	},
	testEnvironment: 'jsdom',
	verbose: true
}
