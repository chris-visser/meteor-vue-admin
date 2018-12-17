Tinytest.add('integration - sending some data', function(test) {
	var path = '/' + Random.id()
	Picker.route(path, function(params, req, res, next) {
		InjectData.pushData(req, 'aa', { bb: 10 })
		next()
	})

	var data = getInjectedData(path)
	var expected = { aa: { bb: 10 } }
	test.equal(data, expected)
})

Tinytest.add('integration - get data on the client', function(test) {
	var expected = { bb: 10 }
	var path = '/' + Random.id()
	Picker.route(path, function(params, req, res, next) {
		InjectData.pushData(req, 'aa', { bb: 10 })
		test.equal(InjectData.getData(req, 'aa'), expected)
		next()
	})

	getInjectedData(path)
})

Tinytest.add('integration - different types of data', function(test) {
	var path = '/' + Random.id()
	var sendingData = {
		kk: { bb: 10 },
		c: true,
		d: 'string',
	}

	Picker.route(path, function(params, req, res, next) {
		_.each(sendingData, function(val, key) {
			InjectData.pushData(req, key, val)
		})
		next()
	})

	var data = getInjectedData(path)
	test.equal(data, sendingData)
})

Tinytest.add(
	'integration - sending some bad chars where HTML does not like well',
	function(test) {
		var path = '/' + Random.id()
		var text = "<s> sdsd //\\ </script>alert('hello');</script>"
		Picker.route(path, function(params, req, res, next) {
			InjectData.pushData(req, 'aa', text)
			next()
		})

		var data = getInjectedData(path)
		var expected = { aa: text }
		test.equal(data, expected)
	}
)

Tinytest.add('integration - no data sending', function(test, done) {
	var path = '/' + Random.id()
	var data = getInjectedData(path)
	test.equal(data, null)
})

Tinytest.add('integration - send with CORS', function(test, done) {
	var path = '/' + Random.id()
	Picker.route(path, function(params, req, res, next) {
		InjectData.pushData(req, 'aa', { bb: 10 })
		res.writeHead(200, {
			'access-control-allow-origin': '*',
		})
		res.write('<!DOCTYPE html>')
		res.end()
	})

	var data = getInjectedData(path)
	test.equal(data, null)
})

Tinytest.add('integration - send with other than HTML', function(test, done) {
	var path = '/' + Random.id()
	Picker.route(path, function(params, req, res, next) {
		InjectData.pushData(res, 'aa', { bb: 10 })
		res.write('some other data')
		res.end()
	})

	var data = getInjectedData(path)
	test.equal(data, null)
})

var urlResolve = Npm.require('url').resolve
function getInjectedData(path) {
	var url = urlResolve(process.env.ROOT_URL, path)
	var res = HTTP.get(url)
	var matched = res.content.match(/inject-data">(.*)<\/script/)
	if (matched) {
		var encodedData = matched[1]
		return InjectData._decode(encodedData)
	} else {
		return null
	}
}
