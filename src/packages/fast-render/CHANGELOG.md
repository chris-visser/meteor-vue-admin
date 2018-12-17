# Change Log

### 3.0.3

* Add support for an async callback in `FastRender.onPageLoad`

### 3.0.2

* Fix server-render dependency

### 3.0.1

* Add weak dependency on server-render

### v3.0.0

* Added SSR helper APIs
* Removed support for iron router
* Updated for Meteor 1.6.1

### v2.16.5

* Fixed "document already present for an add" issue (thanks @anubhav756)

### v2.16.4

* Update for Meteor 1.5+ (thanks @hexsprite)

### v2.16.3

* Updating `staringatlights:inject-data` dependency

### v2.16

* Releasing as `staringatlights:fast-render`

### v2.14.0

* Add support for Meteor 1.3.2 with buffered DDP. See [PR167](https://github.com/kadirahq/fast-render/pull/167)

### v2.13.0

* Use a real subscription as the Publication context. See [PR160](https://github.com/kadirahq/fast-render/pull/160).

### v2.12.0

* Use inject-data's 2.0 API.

### v2.11.0

* Refactor the way how context process data. With this, we can fix [this](https://github.com/kadirahq/flow-router/issues/431) FlowRouter SSR issue.

### v2.10.0

* Throw an exception, when a route start without "/". See: [#135](https://github.com/meteorhacks/fast-render/pull/135)

### v2.9.0

* Add support for Meteor 1.2

### v2.8.1

* Fix some integration tests

### v2.8.0

* Add more internal APIs to support SSR

### v2.5.1

* Add some updates to DeepCopy function

### v2.5.0

* Add IE8 Support
