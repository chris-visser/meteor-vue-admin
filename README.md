WIP: The Meteor Vue Material Admin boilerplate is the ideal kickstarter for people that 
require an admin system that can be easily extended. 

It implements Vue's best practices along with the Vuetify design system (Material) 
and has a fully functional implementation of Meteor's account system. The following things 
are covered:

- Meteor Integration with Vuetify
- Registration
- Login
- Forgot Password flow
- Automatic redirects to the login on authenticated routes

## Getting Started

Run the below command to install the dependencies

```sh
npm install
```

Then start the app in development mode:

```sh
npm start
```

## TODOs

- Document components
- Make user related components more SOLID by extracting the forms from their containers
- Consider bundling the user store module, meteor-users store plugin and gateway mixin.
- Optimize loading behavior after login. (AdminLayout must wait with showing up until the user is fully loaded)


## App Directory Structure

### components
This folder should contain all the Vue components

### core
This folder contains the initialization code that should not have to be changed unless you want to change 
the way the app loads its core functionality. Examples of this functionality are the router, store, app initialization, 
SSR and asyncData calls.

### filters
This is where you put functionality that is shared across multiple components. An example would be a standardized 
way to format dates.

### layouts
Multiple layouts are supported. This is where you add or modify them. If no layout is configured for a page, 
the 'default' layout is loaded. The intention is that you use [Vue Slots](https://vuejs.org/v2/guide/components-slots.html) 
to determine where the page is loaded. 

Simply put `<slot />` on your layout where you want each page to be rendered.

### pages
Pages are configured in the routes.js file and are loaded when its route matches. The page is rendered on a 
designated spot within the configured layout.

This folder contains some pages that are required for the onboarding flow like: Login, Registration, PasswordForgot and VerifyEmail,  

### plugins
Put all VueJS plugins here

### store
This is where the Vuex store modules are located. The store already contains the user module. This 
module provides all of the needed functionality for logging in and logging out with Meteor. The module 
itself does not commit state changes. This is done by the `meteor-users` plugin (located) in `./store/meteor-users`.

> TODO Move forgot password flow methods from components into the store and call the store from 
the components

### mixins
Use this folder to add Vue mixins. By default one mixin is present. The **gateway mixin** 
provides redirect functionality on top of the user store. Users will be redirected automatically 
to the login when not logged in and landing on a route that requires auth. 

> TODO provide more details about the mixin. And iterate on if this is the best place for the mixin.

## Contribution

If you found a bug or have a request for a feature, then please open an issue. If you 
want to contribute then feel free to fork this repo and file a merge request. 

