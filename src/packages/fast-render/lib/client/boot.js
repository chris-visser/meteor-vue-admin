import { Meteor } from 'meteor/meteor'
import { InjectData } from 'meteor/staringatlights:inject-data'
import { FastRender } from './fast_render'

Meteor.startup(function() {
	if (!FastRender._wait) {
		InjectData.getData('fast-render-data', function(payload) {
			FastRender.init(payload)
		})
	}
})
