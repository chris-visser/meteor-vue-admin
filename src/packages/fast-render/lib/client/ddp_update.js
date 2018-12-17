import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { EJSON } from 'meteor/ejson'
import { FastRender } from './fast_render'
import { IDTools } from './id_tools'

let reconnecting = false

const originalLivedataData = Meteor.connection._livedata_data
Meteor.connection._livedata_data = function(msg) {
	if (FastRender._blockDDP && !msg.frGen) {
		FastRender.debugger.log('blocking incoming ddp', msg)
		return
	}
	// fast-render adds data manually while initializing
	// But when the server sends actual data via DDP, it also tries to add
	// Then we need to detect that and alter
	//
	// But we don't need to interfer with Meteor's simulation process
	// That's why we are checking for serverDocs and ignore manual handling
	//
	// We don't need this logic after our special handling reverted back to
	// original. But we can't detect when null publications completed or not
	// That's why we need keep this logic
	//
	// It's okay to ignore this logic after sometime, but not sure when exactly

	if (msg.msg === 'added') {
		const id = IDTools.idParse(msg.id)
		const serverDoc = this._getServerDoc(msg.collection, id)

		if (!reconnecting && !serverDoc) {
			const localCollection = this._mongo_livedata_collections[msg.collection]
			const pendingStoreUpdates = this._updatesForUnknownStores[msg.collection]
			if (localCollection) {
				const existingDoc = localCollection.findOne(id)
				if (existingDoc) {
					FastRender.debugger.log('re writing DDP for:', msg)
					FastRender._AddedToChanged(existingDoc, msg)
				}
			} else if (pendingStoreUpdates) {
				let mergedDoc = null
				const existingDocs = _.filter(pendingStoreUpdates, function(doc) {
					return doc.id === msg.id
				})

				_.each(existingDocs, function(cachedMsg) {
					mergedDoc = FastRender._ApplyDDP(mergedDoc, cachedMsg)
				})

				if (mergedDoc) {
					FastRender.debugger.log('re writing DDP for:', msg)
					FastRender._AddedToChanged(mergedDoc, msg)
				}
			}
		}
	}

	// if we've completed our tasks, no need of special handling
	if (!FastRender._revertedBackToOriginal && FastRender._dataReceived) {
		// This will take care of cleaning special subscription handling
		// after the actual subscription comes out
		if (msg.msg === 'ready' && !msg.frGen && FastRender._subscriptions) {
			msg.subs.forEach(function(subId) {
				const subscription = FastRender._subscriptionIdMap[subId]
				if (subscription) {
					FastRender.debugger.log(
						'actual subscription completed:',
						subscription,
						subId
					)
					// we don't need to handle specially after this
					const paramsKeyMap = FastRender._subscriptions[subscription.name] || {}
					delete paramsKeyMap[subscription.paramsKey]
					if (EJSON.equals(FastRender._subscriptions[subscription.name], {})) {
						delete FastRender._subscriptions[subscription.name]
					}
					delete FastRender._subscriptionIdMap[subId]
				}
			})
		}

		// if all the subscriptions have been processed,
		// there is no need to keep hijacking
		if (EJSON.equals(FastRender._subscriptions, {})) {
			FastRender.debugger.log('fast rendering completed!')
			FastRender._revertedBackToOriginal = true
		}
	}

	return originalLivedataData.call(this, msg)
}

const originalSend = Meteor.connection._send
Meteor.connection._send = function(msg) {
	// if looking for connect again to the server, we must need to revert back to
	// original to prevent some weird DDP issues
	//  normally it is already reverted, but user may added subscriptions
	//  in server, which are not subscribed from the client
	if (msg.msg === 'connect' && msg.session !== undefined) {
		FastRender._revertedBackToOriginal = true
		reconnecting = true
	}

	const self = this

	// if we've completed our tasks, no need of special handling
	if (!FastRender._revertedBackToOriginal && FastRender._dataReceived) {
		const paramsKey = EJSON.stringify(msg.params)
		const canSendFakeReady =
			msg.msg === 'sub' &&
			FastRender._subscriptions[msg.name] &&
			FastRender._subscriptions[msg.name][paramsKey]

		FastRender.debugger.log('new subscription:', msg.name)
		if (canSendFakeReady) {
			FastRender.debugger.log('sending fake ready for sub:', msg.name)
			FastRender.injectDdpMessage(self, {
				msg: 'ready',
				subs: [msg.id],
				frGen: true,
			})
			// add the messageId to be handled later
			FastRender._subscriptionIdMap[msg.id] = {
				name: msg.name,
				paramsKey,
			}
		}
	}

	return originalSend.call(this, msg)
}
