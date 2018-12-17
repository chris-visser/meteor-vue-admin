import { _ } from 'meteor/underscore'
import { Meteor } from 'meteor/meteor'
import { InjectData } from './namespace'
import { WebApp, WebAppInternals } from 'meteor/webapp'
import { Random } from 'meteor/random'

const Env = new Meteor.EnvironmentVariable()

// Supports legacy uses of inject data, SSR users should turn this to false
InjectData.injectToHead = true

WebAppInternals.registerBoilerplateDataCallback(
	'inject-data',
	(req, data, arch) => {
		if (
			req &&
			req.headers &&
			req.headers._injectPayload &&
			!InjectData.disableInjection
		) {
			const payload = `<script type="text/inject-data">${InjectData.encode(
				req.headers._injectPayload
			)}</script>`

			if (InjectData.injectToHead) {
				if (!data.dynamicHead) {
					data.dynamicHead = ''
				}
				data.dynamicHead += payload
			} else {
				if (!data.dynamicBody) {
					data.dynamicBody = ''
				}
				data.dynamicBody += payload
			}
		}
		return false
	}
)

/**
 * Pushes data into the InjectData payload.
 * @param {object} node request object
 * @param {string} key
 * @param {*} value
 */
InjectData.pushData = function pushData(req, key, value) {
	if (!req.headers) {
		req.headers = {}
	}
	if (!req.headers._injectPayload) {
		req.headers._injectPayload = {}
	}

	req.headers._injectPayload[key] = value
}

/**
 * Returns the object associated with the specified key.
 * @param {string} key
 */
InjectData.getData = function getData(req, key) {
	if (req.headers._injectPayload) {
		return _.clone(req.headers._injectPayload[key])
	} else {
		return null
	}
}
