Tinytest.add('integration - sending some data', function(test) {
	const path = `/${Random.id()}`
	Picker.route(path, function(params, req, res, next) {
		InjectData.pushData(req, 'aa', { bb: 10 })
		next()
	})

	const data = getInjectedData(path)
	const expected = { aa: { bb: 10 } }
	test.equal(data, expected)
})

Tinytest.add('integration - get data on the client', function(test) {
	const expected = { bb: 10 }
	const path = `/${Random.id()}`
	Picker.route(path, function(params, req, res, next) {
		InjectData.pushData(req, 'aa', { bb: 10 })
		test.equal(InjectData.getData(req, 'aa'), expected)
		next()
	})

	getInjectedData(path)
})

Tinytest.add('integration - different types of data', function(test) {
	const path = `/${Random.id()}`
	const sendingData = {
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

	const data = getInjectedData(path)
	test.equal(data, sendingData)
})

Tinytest.add(
	'integration - sending some bad chars where HTML does not like well',
	function(test) {
		const path = `/${Random.id()}`
		const text = "<s> sdsd //\\ </script>alert('hello');</script>"
		Picker.route(path, function(params, req, res, next) {
			InjectData.pushData(req, 'aa', text)
			next()
		})

		const data = getInjectedData(path)
		const expected = { aa: text }
		test.equal(data, expected)
	}
)

Tinytest.add('integration - no data sending', function(test, done) {
	const path = `/${Random.id()}`
	const data = getInjectedData(path)
	test.equal(data, null)
})

Tinytest.add('integration - send with CORS', function(test, done) {
	const path = `/${Random.id()}`
	Picker.route(path, function(params, req, res, next) {
		InjectData.pushData(req, 'aa', { bb: 10 })
		res.writeHead(200, {
			'access-control-allow-origin': '*',
		})
		res.write('<!DOCTYPE html>')
		res.end()
	})

	const data = getInjectedData(path)
	test.equal(data, null)
})

Tinytest.add('integration - send with other than HTML', function(test, done) {
	const path = `/${Random.id()}`
	Picker.route(path, function(params, req, res, next) {
		InjectData.pushData(res, 'aa', { bb: 10 })
		res.write('some other data')
		res.end()
	})

	const data = getInjectedData(path)
	test.equal(data, null)
})

const urlResolve = Npm.require('url').resolve
function getInjectedData(path) {
	const url = urlResolve(process.env.ROOT_URL, path)
	const res = HTTP.get(url)
	const matched = res.content.match(/inject-data">(.*)<\/script/)
	if (matched) {
		const encodedData = matched[1]
		return InjectData._decode(encodedData)
	}
	return null
}
