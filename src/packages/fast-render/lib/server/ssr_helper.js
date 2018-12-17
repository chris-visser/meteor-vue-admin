import { Meteor } from 'meteor/meteor'
import { FastRender } from 'meteor/staringatlights:fast-render'
import { InjectData } from 'meteor/staringatlights:inject-data'
import { onPageLoad } from 'meteor/server-render'
import { _ } from 'meteor/underscore'

const originalSubscribe = Meteor.subscribe
Meteor.subscribe = function(name, ...args) {
	const frContext = FastRender.frContext.get()
	if (!frContext) {
		throw new Error(
			`Cannot add a subscription: ${name} without FastRender Context`
		)
	}
	frContext.subscribe(name, ...args)

	if (originalSubscribe) {
		originalSubscribe.apply(this, arguments)
	}

	return {
		ready: () => true,
	}
}

FastRender._mergeFrData = function(req, queryData) {
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
}

FastRender.onPageLoad = function(callback) {
	InjectData.injectToHead = false
	onPageLoad(async sink => {
		const frContext = new FastRender._Context(
			sink.request.cookies.meteor_login_token,
			{
				headers: sink.headers,
			}/home/cloudspider/Server/open-source/vue-meteor/packages/vue-ssr
		)

		await FastRender.frContext.withValue(frContext, async function() {
			await callback(sink)
			FastRender._mergeFrData(
				sink.request,
				FastRender.frContext.get().getData()
			)
		})
	})
}
