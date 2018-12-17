module.exports = {
	extends: [
		'standard',
		'plugin:meteor/recommended',
		// 'plugin:import/errors',
		// 'plugin:import/warnings',
	],
	plugins: ['meteor' /*'import'*/],
	// settings: {
	// 	'import/resolver': {
	// 		meteor: {
	// 			extensions: ['.js', '.jsx'],
	// 		},
	// 	},
	// },
	rules: {
		'comma-dangle': 0,
		'space-before-function-paren': 0,
		indent: ['error', 'tab'],
		'no-tabs': 0,
	},
}
