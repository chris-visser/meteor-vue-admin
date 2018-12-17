Tinytest.addAsync('Clinet - get data', function(test, done) {
	InjectData.getData('hello', function(data) {
		console.warn(data)
		test.equal(data, { meteorhacks: 'rocks' })
		done()
	})
})
