import Fiber from 'fibers'
import { FastRender } from './namespace'
import { Meteor } from 'meteor/meteor'
import { Picker } from 'meteor/meteorhacks:picker'
import { InjectData } from 'meteor/staringatlights:inject-data'
import PublishContext from './publish_context'
import { IsAppUrl } from './utils'
import { _ } from 'meteor/underscore'
import connect from 'connect'

FastRender._onAllRoutes = []
FastRender.frContext = new Meteor.EnvironmentVariable()

var fastRenderRoutes = Picker.filter(function(req, res) {
	return IsAppUrl(req)
})
fastRenderRoutes.middleware(connect.cookieParser())
fastRenderRoutes.middleware(function(req, res, next) {
	FastRender.handleOnAllRoutes(req, res, next)
})

// handling specific routes
FastRender.route = function route(path, callback) {
	if (path.indexOf('/') !== 0) {
		throw new Error(
			'Error: path (' + path + ') must begin with a leading slash "/"'
		)
	}
	fastRenderRoutes.route(path, FastRender.handleRoute.bind(null, callback))
}

function setQueryDataCallback(req, next) {
	return function(queryData) {
		if (!queryData) return next()

		var existingPayload = InjectData.getData(req, 'fast-render-data')
		if (!existingPayload) {
			InjectData.pushData(req, 'fast-render-data', queryData)
		} else {
			// it's possible to execute this callback twice
			// the we need to merge exisitng data with the new one
			_.extend(existingPayload.subscriptions, queryData.subscriptions)
			_.each(queryData.collectionData, function(data, pubName) {
				var existingData = existingPayload.collectionData[pubName]
				if (existingData) {
					data = existingData.concat(data)
				}

				existingPayload.collectionData[pubName] = data
				InjectData.pushData(req, 'fast-render-data', existingPayload)
			})
		}
		next()
	}
}

FastRender.handleRoute = function(processingCallback, params, req, res, next) {
	var afterProcessed = setQueryDataCallback(req, next)
	FastRender._processRoutes(params, req, processingCallback, afterProcessed)
}

FastRender.handleOnAllRoutes = function(req, res, next) {
	var afterProcessed = setQueryDataCallback(req, next)
	FastRender._processAllRoutes(req, afterProcessed)
}

FastRender.onAllRoutes = function onAllRoutes(callback) {
	FastRender._onAllRoutes.push(callback)
}

FastRender._processRoutes = function _processRoutes(
	params,
	req,
	routeCallback,
	callback
) {
	callback = callback || function() {}

	var path = req.url
	var loginToken = req.cookies['meteor_login_token']
	var headers = req.headers

	var context = new FastRender._Context(loginToken, { headers: headers })

	try {
		FastRender.frContext.withValue(context, function() {
			routeCallback.call(context, params, path)
		})

		if (context.stop) {
			return
		}

		callback(context.getData())
	} catch (err) {
		handleError(err, path, callback)
	}
}

FastRender._processAllRoutes = function _processAllRoutes(req, callback) {
	callback = callback || function() {}

	var path = req.url
	var loginToken = req.cookies['meteor_login_token']
	var headers = req.headers

	new Fiber(function() {
		var context = new FastRender._Context(loginToken, { headers: headers })

		try {
			FastRender._onAllRoutes.forEach(function(callback) {
				callback.call(context, req.url)
			})

			callback(context.getData())
		} catch (err) {
			handleError(err, path, callback)
		}
	}).run()
}

function handleError(err, path, callback) {
	var message =
		'error on fast-rendering path: ' + path + ' ; error: ' + err.stack
	console.error(message)
	callback(null)
}

// adding support for null publications
FastRender.onAllRoutes(function() {
	var context = this
	var nullHandlers = Meteor.default_server.universal_publish_handlers

	if (nullHandlers) {
		nullHandlers.forEach(function(publishHandler) {
			// universal subs have subscription ID, params, and name undefined
			var publishContext = new PublishContext(context, publishHandler)
			context.processPublication(publishContext)
		})
	}
})
