import { FastRender } from 'meteor/staringatlights:fast-render'
import { InjectData } from 'meteor/staringatlights:inject-data'
import { onPageLoad } from 'meteor/server-render'

FastRender.onPageLoad = function(callback) {
	FastRender.wait()
	onPageLoad(sink => {
		InjectData.getData('fast-render-data', async function(data) {
			FastRender.init(data)
			callback(sink)
		})
	})
}
