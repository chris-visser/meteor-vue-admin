# staringatlights:inject-data

#### A way to inject data to the client with initial HTML. A continuation of `meteorhacks:inject-data`.

This is the package used by [`fast-render`](https://github.com/meteorhacks/fast-render) to push data to the client with the initial HTML.

## Upgrading from 2.0.0

Due to changes to Meteor 1.6.1, the way Inject Data internally accumulates the data payload has changed. The payload was previously attached to the `response` object, which is now unavailable. It is now attached to the `request.headers` object (which is the only object that seems to persist between the `server-renders` `sink.request` object and `WebAppInternals.registerBoilerplateDataCallback`'s `request` object, unfortunately). If you were calling InjectData methods directly (eg. `pushData` you must now pass in the `request` object instead of the `response`).

## Installation

meteor add staringatlights:inject-data

## Push Data

We need to use this package with a server side router. We've extended nodejs `http.OutgoingMessage` and provides an API like this.

Here is an example with [picker](https://github.com/meteorhacks/picker).

```js
Picker.route('/', function(params, req, res, next) {
	var ejsonData = { aa: 10 }
	InjectData.pushData(req, 'some-key', ejsonData)
	// make sure to move the routing forward.
	next()
})
```

## Get Data

You can get data with the following API from the **client**.

```js
InjectData.getData('some-key', function(data) {
	console.log(data)
})
```

## Disable Automatic Injection

You may wish to manually inject the data payload if you are using SSR.

```js
InjectData._disableInjection = true
```

## Injection Location

By default, the injector will place the payload inside the `<head>` element. This is render blocking and intended to front-load the data for client-side rendering apps.

You can disable this functionality by setting `InjectData.injectToHead = false`. The payload will be placed before the closing `</body>` tag. Use this setting to deliver payloads after the initial render, e.g. SSR data hydration.
