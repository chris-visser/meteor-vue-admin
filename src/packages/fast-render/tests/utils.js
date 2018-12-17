/* global Tinytest */
import { FastRender } from 'meteor/staringatlights:fast-render'

Tinytest.add('AddedToChanged - new fields', function(test) {
	const localCopy = { aa: 10 }
	const added = { fields: { aa: 20, bb: 20 }, msg: 'added' }

	FastRender._AddedToChanged(localCopy, added)

	test.equal(added.msg, 'changed')
	test.equal(added.fields, { aa: 20, bb: 20 })
})

Tinytest.add('AddedToChanged - removed fields', function(test) {
	const localCopy = { aa: 10, cc: 20, bb: 10 }
	const added = { fields: { bb: 20 }, msg: 'added' }

	FastRender._AddedToChanged(localCopy, added)

	test.equal(added.msg, 'changed')
	test.equal(added.fields, { bb: 20 })
	test.equal(added.cleared, ['aa', 'cc'])
})
