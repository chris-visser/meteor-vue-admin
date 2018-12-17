/* global Tinytest */
import { FastRender } from 'meteor/staringatlights:fast-render'
import { InjectData } from 'meteor/staringatlights:inject-data'
import { Random } from 'meteor/random'
import { Meteor } from 'meteor/meteor'
import { _ } from 'meteor/underscore'
import { HTTP } from 'meteor/http'

Tinytest.add('integration - with a simple route', function(test) {
	const collName = Random.id()
	const pubName = Random.id()
	const path = `/${Random.id()}`
	const obj = { _id: 'one', aa: 10 }

	const coll = new Meteor.Collection(collName)
	coll.insert(obj)

	Meteor.publish(pubName, function() {
		return coll.find()
	})

	FastRender.route(path, function() {
		this.subscribe(pubName)
	})

	const data = getFRData(path)
	test.isTrue(data.subscriptions[pubName])
	test.equal(data.collectionData[collName][0][0], obj)
})

Tinytest.add('integration - onAllRoutes', function(test) {
	const collName = Random.id()
	const pubName = Random.id()
	const path = `/${Random.id()}`
	const obj = { _id: 'one', aa: 10 }

	const coll = new Meteor.Collection(collName)
	coll.insert(obj)

	const cursorHandler = createCursorHandler(function() {
		return coll.find()
	})

	Meteor.publish(pubName, function() {
		return cursorHandler.get()
	})

	FastRender.onAllRoutes(function() {
		this.subscribe(pubName)
	})

	const data = getFRData(path)
	test.isTrue(data.subscriptions[pubName])
	test.equal(data.collectionData[collName][0][0], obj)
	cursorHandler.stop()
})

Tinytest.add('integration - onAllRoutes + route ', function(test) {
	const collName = Random.id()
	const pubName = Random.id()
	const path = `/${Random.id()}`
	const obj1 = { _id: 'one', aa: 10 }
	const obj2 = { _id: 'two', aa: 10 }

	const coll = new Meteor.Collection(collName)
	coll.insert(obj1)
	coll.insert(obj2)

	const cursorHandler = createCursorHandler(function(id) {
		return coll.find({ _id: id })
	})

	Meteor.publish(pubName, function(id) {
		return cursorHandler.get(id)
	})

	FastRender.onAllRoutes(function() {
		this.subscribe(pubName, 'one')
	})

	FastRender.route(path, function() {
		this.subscribe(pubName, 'two')
	})

	const data = getFRData(path)
	test.isTrue(data.subscriptions[pubName])
	test.equal(data.collectionData[collName][0][0], obj1)
	test.equal(data.collectionData[collName][1][0], obj2)
	cursorHandler.stop()
})

Tinytest.add('integration - null publications', function(test) {
	const collName = Random.id()
	const path = `/${Random.id()}`
	const obj = { _id: 'one', aa: 10 }

	const coll = new Meteor.Collection(collName)
	coll.insert(obj)

	const cursorHandler = createCursorHandler(function() {
		return coll.find()
	})
	Meteor.publish(null, function() {
		return cursorHandler.get()
	})

	const data = getFRData(path)
	test.equal(data.collectionData[collName][0][0], obj)
	cursorHandler.stop()
})

Tinytest.add('integration - send data via this.* apis', function(test) {
	const collName = Random.id()
	const pubName = Random.id()
	const path = `/${Random.id()}`
	const obj = { _id: 'one', aa: 10 }

	Meteor.publish(pubName, function() {
		const sub = this
		sub.added(collName, obj._id, _.omit(obj, '_id'))
		Meteor.setTimeout(function() {
			sub.ready()
		}, 100)
	})

	FastRender.route(path, function() {
		this.subscribe(pubName)
	})

	const data = getFRData(path)
	test.isTrue(data.subscriptions[pubName])
	test.equal(data.collectionData[collName][0][0], obj)
})

Tinytest.add('integration - send data via this.* apis, but delayed', function(
	test
) {
	const collName = Random.id()
	const pubName = Random.id()
	const path = `/${Random.id()}`
	const obj = { _id: 'one', aa: 10 }

	Meteor.publish(pubName, function() {
		const sub = this
		Meteor.setTimeout(function() {
			sub.added(collName, obj._id, _.omit(obj, '_id'))
			sub.ready()
		}, 1000)
	})

	FastRender.route(path, function() {
		this.subscribe(pubName)
	})

	const data = getFRData(path)
	test.isFalse(data.subscriptions[pubName])
	test.equal(data.collectionData, {})
})

Tinytest.add('integration - error inside a publication', function(test) {
	const collName = Random.id()
	const pubName = Random.id()
	const path = `/${Random.id()}`
	const obj = { _id: 'one', aa: 10 }

	const coll = new Meteor.Collection(collName)
	coll.insert(obj)

	Meteor.publish(pubName, function() {
		throw new Error('some bad thing happens')
	})

	FastRender.route(path, function() {
		this.subscribe(pubName)
	})

	const data = getFRData(path)
	test.equal(data.collectionData, {})
})

Tinytest.add('integration - error inside a null publication', function(test) {
	const collName = Random.id()
	const path = `/${Random.id()}`
	const obj = { _id: 'one', aa: 10 }

	const coll = new Meteor.Collection(collName)
	coll.insert(obj)

	Meteor.publish(null, function() {
		throw new Error('some bad thing happens')
	})

	const data = getFRData(path)
	test.equal(data.collectionData, {})
})

Tinytest.add('integration - when path has no leading slash', function(test) {
	const path = Random.id()

	test.throws(function() {
		FastRender.route(path, function() {})
	}, `Error: path (${path}) must begin with a leading slash "/"`)
})

const urlResolve = Npm.require('url').resolve
function getFRData(path) {
	const url = urlResolve(process.env.ROOT_URL, path)
	const options = {
		headers: {
			Accept: 'text/html',
		},
	}
	const res = HTTP.get(url, options)

	const encodedData = res.content.match(/data">(.*)<\/script/)[1]
	return InjectData._decode(encodedData)['fast-render-data']
}

function createCursorHandler(callback) {
	let stop = false
	function getFn() {
		if (stop) {
			return []
		}
		return callback.apply(this, arguments)
	}

	function stopFn() {
		stop = true
	}

	return {
		get: getFn,
		stop: stopFn,
	}
}
