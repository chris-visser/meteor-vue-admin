/* global Package Npm */
Package.describe({
	summary:
		'Render your app before the DDP connection even comes alive - magic?',
	version: '3.0.3',
	git: 'https://github.com/abecks/meteor-fast-render',
	name: 'staringatlights:fast-render',
})

Npm.depends({
	connect: '2.13.0',
})

Package.onUse(function(api) {
	api.versionsFrom('METEOR@1.6.1')
	api.mainModule('lib/client/fast_render.js', 'client')
	api.mainModule('lib/server/namespace.js', 'server')
	api.use('staringatlights:inject-data@2.2.0', ['client', 'server'])
	api.use('chuangbo:cookie@1.1.0', 'client')
	api.use('meteorhacks:picker@1.0.3', 'server')
	api.use('meteorhacks:meteorx@1.4.1', 'server')

	api.use(
		[
			'minimongo',
			'livedata',
			'ejson',
			'underscore',
			'webapp',
			'routepolicy',
			'accounts-base',
			'random',
		],
		['server']
	)
	api.use(
		['minimongo', 'underscore', 'deps', 'ejson', 'accounts-base'],
		['client']
	)

	api.addFiles(
		[
			'lib/server/utils.js',
			'lib/server/routes.js',
			'lib/server/publish_context.js',
			'lib/server/context.js',
			'lib/server/ssr_helper.js',
		],
		'server'
	)

	api.addFiles(
		[
			'lib/client/id_tools.js',
			'lib/client/debugger.js',
			'lib/client/ddp_update.js',
			'lib/client/auth.js',
			'lib/client/ssr_helper.js',
			'lib/client/boot.js',
		],
		'client'
	)
	api.use(['ecmascript', 'server-render'], ['client', 'server'])
	// api.export('FastRender', ['client', 'server'])
	// api.export('__init_fast_render', ['client'])
})

Package.onTest(function(api) {
	api.use(['ecmascript'], ['client', 'server'])
	api.use('staringatlights:fast-render', ['client', 'server'])
	api.use('tinytest', ['client', 'server'])
	api.use('http', 'server')
	api.use('random', ['server', 'client'])
	api.use('mongo', ['server', 'client'])
	api.use('server-render', ['server', 'client'])

	api.addFiles(
		[
			'tests/utils.js',
			'tests/client/fast_render.js',
			'tests/client/ddp_update.js',
		],
		'client'
	)

	api.addFiles(
		['tests/server/context.js', 'tests/server/integration.js'],
		'server'
	)
})
