Tinytest.add('Utils - encode decode', function(test) {
	var data = { aa: 10, date: new Date() }
	var str = InjectData._encode(data)
	var decoded = InjectData._decode(str)

	test.equal(decoded.aa, data.aa)
	test.equal(decoded.date.getTime(), data.date.getTime())
})

Tinytest.add('Utils - decode empty', function(test) {
	var str = ''
	var decoded = InjectData._decode(str)
	test.equal(decoded, null)
})

Tinytest.add('Utils - encode decode special chars', function(test) {
	var data = { special: '#://' }
	var str = InjectData._encode(data)

	test.isFalse(/#/.test(str))
})
