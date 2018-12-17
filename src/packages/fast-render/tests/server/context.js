/* global Tinytest */
import { FastRender } from 'meteor/staringatlights:fast-render'
import { Random } from 'meteor/random'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Accounts } from 'meteor/accounts-base'

Tinytest.add('Context - subscribe', function(test) {
	const collName = Random.id()
	const coll = new Mongo.Collection(collName)
	coll.insert({ _id: 'one', age: 20 })
	coll.insert({ _id: 'two', age: 40 })

	const pubName = Random.id()
	Meteor.publish(pubName, function() {
		return coll.find()
	})

	const context = new FastRender._Context()
	context.subscribe(pubName)

	const expectedData = {
		subscriptions: {},
		collectionData: {},
		loginToken: undefined,
	}
	expectedData.subscriptions[pubName] = { '[]': true }
	expectedData.collectionData[collName] = [coll.find().fetch()]

	test.equal(context.getData(), expectedData)
})

Tinytest.add('Context - subscribe with this.x apis', function(test) {
	const collName = Random.id()
	const coll = new Mongo.Collection(collName)
	coll.insert({ _id: 'one', age: 20 })
	coll.insert({ _id: 'two', age: 40 })

	const pubName = Random.id()
	Meteor.publish(pubName, function() {
		const data = coll.find().fetch()
		this.added(collName, data[0]._id, data[0])
		this.added(collName, data[1]._id, data[1])
		this.ready()
	})

	const context = new FastRender._Context()
	context.subscribe(pubName)

	const expectedData = {
		subscriptions: {},
		collectionData: {},
		loginToken: undefined,
	}
	expectedData.subscriptions[pubName] = { '[]': true }
	expectedData.collectionData[collName] = [coll.find().fetch()]

	test.equal(context.getData(), expectedData)
})

Tinytest.add('Context - subscribe with this.x apis - no ready called', function(
	test
) {
	const pubName = Random.id()
	Meteor.publish(pubName, function() {})

	const context = new FastRender._Context()
	context.subscribe(pubName)

	const expectedData = {
		subscriptions: {},
		collectionData: {},
		loginToken: undefined,
	}

	test.equal(context.getData(), expectedData)
})

Tinytest.addAsync('Context - loggedIn user', function(test, done) {
	const id = Random.id()
	const username = Random.id()
	const loginToken = Random.id()

	Meteor.users.insert({ _id: id, username })
	const hashedToken = Accounts._hashLoginToken(loginToken)
	Meteor.users.update(id, {
		$set: { 'services.resume.loginTokens.hashedToken': hashedToken },
	})

	const pubName = Random.id()
	Meteor.publish(pubName, function() {
		test.equal(this.userId, id)
		test.equal(Meteor.userId(), id)
		done()
	})

	const context = new FastRender._Context(loginToken)
	context.subscribe(pubName)
})
