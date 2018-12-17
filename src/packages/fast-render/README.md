# Fast Render 3 (Updated for Meteor 1.6.1)

Fast Render is back!

Fast Render can improve the initial load time of your app, giving you 2-10 times faster initial page loads. It provides the same effect as Server Side Rendering (SSR), but still sends data over the wire to avoid breaking one of Meteor’s core principles.

#### This is a continuation of `meteorhacks:fast-render` by @arunoda

### Disclaimer: 3.0 is still experimental. Use in production only after thorough testing. Please let me know your experience.

**Table of Contents**

* [Fast Render 3.x vs 2.x](#fast-render-3x-vs-2x)
* [Demo](#demo)
* [Usage](#usage)
* [How Fast Render Works](#how-fast-render-works)
* [Using Fast Render's route APIs](#using-fast-renders-route-apis)
* [Security](#security)
* [Known Issues](#known-issues)
* [Debugging](#debugging)

## Fast Render 3.x vs 2.x

### Client-side timing control

Have you ever seen the error `Expected to find a document not present for an add` or something similar when in development? You can now control the timing of FastRender so you can ensure it has loaded all of the documents before it makes a real subscription:

```js
FastRender.wait() // tell fastrender not to start loading the data automatically
InjectData.getData('fast-render-data', function(data) {
	FastRender.init(data)
	// it is now safe to begin routing/rendering
})
```

#### New SSR APIs

Fast Render 3.x comes with helpers for server-side rendering:

### Data Hydration

FastRender will track subscriptions and load their data after your initial HTML render has been sent. The data will be immediately available for hydrating on the client. Use `FastRender.onPageLoad` instead of Meteor's `server-render` `onPageLoad`. You can use `Meteor.subscribe` in your React containers and the data will automatically be appended to the HTML document. `FastRender.route` and `FastRender.onAllRoutes` will still work as expected.

On the server:

```js
FastRender.onPageLoad(sink => {
	sink.renderIntoElementById('app', renderToString(<App />))
})
```

On the client:

```js
FastRender.onPageLoad(async sink => {
	const App = (await import('/imports/components/App/App')).default
	ReactDOM.hydrate(<App />, document.getElementById('app'))
})
```

**Let's talk about hydration:** This is a great opportunity to make fast server-side rendered applications. Your HTML output can be rendered in a stream to the client, and the JS is only loaded and parsed once the HTML has been fully rendered. The data added by this method would not slow down the initial load time (when using streams). By injecting all of the necessary data after the HTML, the page can be rendered by the server and loaded on the client very quickly, and then the client can hydrate the DOM as soon as the JS payload loads, without then waiting for the data to load. Keep an eye on Meteor's support for `renderToNodeStream`.

#### What else can we do?

* Critical CSS - We can inline the CSS used by components (css-modules, etc.) and defer loading of the main stylesheet
* Support for dynamically loaded components (react-loadable, etc.)

### Iron Router

IronRouter support has been dropped to focus on supporting various SSR methods. If someone still needs it and wants to maintain it, feel free to PR it back in.

## Demo

Let's look at a demo. Here is the leaderboard example from [BulletProof Meteor](https://bulletproofmeteor.com). It's written using Meteor and Iron Router:

![a Meteor app Without Fast Render](https://cldup.com/v4PmJqPtlY.png)

Here you see the loading screen while we wait on data to render the actual leaderboard.

---

Now let's see how the leaderboard loads when using Fast Render: [click here](https://bulletproofmeteor.com/leaderboard).

You never see the loading screen becuase we don't have to wait on data. Right after the page is loaded, the leaderboard is there. To do this, all we've done is add Fast Render to the app and insert a single line of configuration.

Check this demo [video](https://www.youtube.com/watch?v=mGcE6UVOqPk) if you need to see more what Fast Render can do.

## Usage

> **Attention**
> If you are new to Fast Render, I highly recommend you follow [this BulletProof Meteor lesson](https://bulletproofmeteor.com/basics/no-more-loading). It explains how to use Fast Render and why you might want to.

Add Fast Render to your Meteor app:

```shell
meteor add staringatlights:fast-render
```

After that, make sure you've moved your route related code (`router.js` file or relavant files) to a place which can be access by both server and client. (i.e. the `lib` folder).

**To add Fast Render support to FlowRouter, visit [here](https://github.com/kadirahq/flow-router#fast-render).**

Rest of the documentation is for apps utilizing Iron Router.

Then add the `fastRender: true` option to your route:

```js
this.route('leaderboard', {
	path: '/leaderboard/:date?',
	waitOn: function() {
		return Meteor.subscribe('leaderboard')
	},
	fastRender: true,
})
```

## How Fast Render Works

Fast render runs the `waitOn` function (or one of the Fast Render API calls) on the server and gets the subscription data relavant to the page you are loading. Then it sends that data along with the initial HTML of the Meteor app as shown below:

![Meteor Subscription Data with Initial HTML](https://cldup.com/RFgMhjv7qR.png)

Then Fast Render parses and loads that data into Meteor collections. This makes your Meteor app code (Iron Router) think the data connection has been made, and it renders the page right away.

> If you want to learn more about how Fast Render works, refer to [this article](https://meteorhacks.com/fast-render-internals-and-how-it-works.html).

## Using Fast Render's route APIs

If you're doing some custom subscription handling, Fast Render won't be able to identify those subscriptions. This is also true when you are not using Iron Router.

If you want to use Fast Render in these cases, you'll need to map subscriptions manually to routes. It can be done using the following APIs:

> The following APIs are available on the server only.

#### FastRender.route(callback)

This declares server side routes using a URL pattern similar to Iron Router's. The callback runs in a context very similar to Meteor and you can use any Meteor APIs inside it (it runs on a Fiber). Inside, you can subscribe to publications using `this.subscribe`.

Use it like this:

```js
FastRender.route('/leaderboard/:date', function(params) {
	this.subscribe('leaderboard', params.date)
})
```

#### FastRender.onAllRoutes(callback)

This is very similar to `FastRender.route`, but lets you register a callback which will run on all routes.

Use it like this:

```js
FastRender.onAllRoutes(function(path) {
	this.subscribe('currentUser')
})
```

## Security

Fast Render has the ability to get data related to a user by detecting `loggedIn` status. It does this by sending the same loginToken used by the DDP connection using cookies.

This is not inherently bad, but this might potentially cause some security issues. Those issues are described below along with possible countermeasures. Fortunately, Fast Render has features to prevent some of them.

> These issues were raised by [Emily Stark](https://twitter.com/estark37) from the [meteor-core team](https://groups.google.com/forum/#!msg/meteor-talk/1Fg4rNk9JZM/ELX3672QsrEJ).

#### Side Effects

It is possible to send custom HTTP requests to routes handled by Fast Render either using an XHR request or a direct HTTP request.

So if you are doing some DB write operations or saving something to the filesystem, the code sent will be executed. this could be bad if the HTTP request is an XHR request called by a malicious user. They wouldn't be able read anything, but they could cause side effects.

It is wise to avoid side effects from following places:

* publications
* fastRender routes
* IronRouter waitOn and subscriptions methods

#### CORS Headers

If your app adds [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) headers via connect handlers, there is a potential security issue.

Fast Render detects CORS headers with conflicting routes and turns off fast rendering for those routes.

It's okay to add CORS headers to custom server side routes, but if they conflict with the client side routes (which are handled by Fast Render), then there will be a security issue. It would allow malicious XHR requests from other domains to access loggedIn user's subscription data.

#### Cookie Tossing

If your app is available under a shared domain like `*.meteor.com` or `*.herokuapp.com`, there is a potential [security issue](https://groups.google.com/forum/#!topic/meteor-talk/Zhy1c6MdOH8).

**We've made some [protection](https://groups.google.com/d/msg/meteor-talk/LTO2n5D1bxY/J5EnVpJo0rAJ) to this issue; so you can still use Fast Render.**

If you host your app under `*.meteor.com` etc. but use a separate domain, then your app will not be vulnerable in this way.

## Known Issues

### Client Error: "Server sent add for existing id"

If you are getting this issue, it seems like you are doing a database write operation inside a `Template.rendered` (Template.yourTemplate.rendered).

To get around with this issue, rather than invoking a DB operation with MiniMongo, try to invoke a method call.

Related Issue & Discussion: <https://github.com/meteorhacks/fast-render/issues/80>

### No data is injected when using "AppCache" package

Currently FastRender does not support simultaneous usage with [appcache package](https://atmospherejs.com/meteor/appcache)

Related Issue & Discussion: <https://github.com/kadirahq/fast-render/issues/136>

### No data is injected when using Meteor Subscription Cache

When using the subscache package (`ccorcos:subs-cache` or `blockrazor:subscache-c4`) the parameters passed to the subscription must the identical on both Fast Render and Subscache or no data will be injected.

## Debugging

Sometimes, you need to test whether Fast Render is working or not. You can do this using the built-in debugger. The debugger works on the client and is safe to run it on a deployed app. It has a few useful features:

#### Block DDP

You can block the DDP connection and check whether the page was fast rendered or not. Once blocked, no DDP messages will be accepted. To block, apply following command in the browser console:

```
FastRender.debugger.blockDDP()
```

You can unblock it with:

```
FastRender.debugger.unblockDDP()
```

#### Get Payload

With the following command you can inspect the data that comes on a Fast Render page load:

```
FastRender.debugger.getPayload()
```

It will be in this format:

```js
{
  // subscriptions processed
  subscriptions: {
    courses: true,
    leaderBoard: true
  },

  // data grouped by collection name
  data: {
    courses: [
      [...],
    ],
    users: [
      [...]
    ]
  }
}
```

> You can also apply `FastRender.debugger.getPayloadJSON()` to get the logs as a JSON string.

#### Disable Fast Render

You can also use a command to disable Fast Render:

```
FastRender.debugger.disableFR()
```

Re-enable it with:

```
FastRender.debugger.enableFR()
```

#### Logs

Fast Render has robust logging.

You can turn it on using `FastRender.debugger.showLogs()`.

Hide them again using `FastRender.debugger.hideLogs()`.

You can get all of the log messages by using `FastRender.debugger.getLogs()` and `FastRender.debugger.getLogsJSON()`.
