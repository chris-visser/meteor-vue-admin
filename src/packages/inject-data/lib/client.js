import { Meteor } from 'meteor/meteor'
import { InjectData } from './namespace'

// Automatically parse the inject-data payload on Meteor startup
// Load it into memory so it can be fetched by InjectData.getData
Meteor.startup(function() {
	var dom = document.querySelectorAll(
		'script[type="text/inject-data"]',
		document
	)
	var injectedDataString = dom && dom.length > 0 ? dom[0].innerHTML : ''
	InjectData._data = InjectData._decode(injectedDataString) || {}
})

/**
 * Returns the data payload for the specified key.
 * @param {string} key
 * @param {function} callback
 */
InjectData.getData = function(key, callback) {
	Meteor.startup(function() {
		callback(InjectData._data[key])
	})
}
