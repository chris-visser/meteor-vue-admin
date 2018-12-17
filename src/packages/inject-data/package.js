/* global Package */
Package.describe({
	summary: 'A way to inject data to the client with initial HTML',
	version: '2.2.0',
	git: 'https://github.com/abecks/meteor-inject-data',
	name: 'staringatlights:inject-data',
})

Package.onUse(function(api) {
	api.versionsFrom('METEOR@1.6.1')
	api.use('webapp', 'server')
	api.use(['ejson', 'underscore', 'ecmascript'], ['server', 'client'])
	api.mainModule('lib/namespace.js', ['server', 'client'])
	api.addFiles('lib/utils.js', ['server', 'client'])
	api.addFiles('lib/server.js', 'server')
	api.addFiles('lib/client.js', 'client')
	api.export('InjectData', ['client', 'server'])
})

Package.onTest(function(api) {
	api.use('staringatlights:inject-data')
	api.use('webapp', 'server')
	api.use(['underscore', 'tinytest'], ['client', 'server'])
	api.use('http', 'server')
	api.use('random', 'server')
	api.use('meteorhacks:picker@1.0.1', 'server')
	api.addFiles(['tests/init.js'], 'server')
	api.addFiles(['tests/utils.js'], ['client', 'server'])
	api.addFiles(['tests/client.js'], 'client')
	api.addFiles(['tests/integration.js'], 'server')
})
