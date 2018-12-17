Picker.route('/', function(params, req, res, next) {
	InjectData.pushData(req, 'hello', { meteorhacks: 'rocks' })
	next()
})
