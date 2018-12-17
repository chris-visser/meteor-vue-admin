Tinytest.add('Utils - encode decode', function(test) {
	const data = { aa: 10, date: new Date() }
	const str = InjectData._encode(data)
	const decoded = InjectData._decode(str)

	test.equal(decoded.aa, data.aa)
	test.equal(decoded.date.getTime(), data.date.getTime())
})

Tinytest.add('Utils - decode empty', function(test) {
	const str = ''
	const decoded = InjectData._decode(str)
	test.equal(decoded, null)
})

Tinytest.add('Utils - encode decode special chars', function(test) {
	const data = { special: '#://' }
	const str = InjectData._encode(data)

	test.isFalse(/#/.test(str))
})
