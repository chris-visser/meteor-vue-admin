This is a fully functional admin system in the form of a boilerplate. 
It shows how Meteor, Vue and Vuetify make the ideal toolset to create dynamic, modular and 
scalable admin systems.

The code is structured according to Vue and Meteor best practices along with the Vuetify design system (Material).

- Meteor's account system: Login, Registration, Access Control, Forgot Password
- Feature based structure as best practice for mid size and large apps
- User Management + Roles
- Ability to choose between modal based or redirect based authentication
- Todo Management as CRUD Example (Create Read Update Delete) 
- Realtime as the default, static as the option.
- A convenient Vuex controlled messaging system to notify users  
- Eslint configured for Meteor + Vue to guard code-style

## Getting Started

Run the below command to install the dependencies. 

>Note that when you don't have a copy of Meteor 
installed on you development environment, this will install it automatically for you.

```sh
npm install
```

Then start the app in development mode:

```sh
npm start
```

Visit http://localhost:3000 and you are up and running!

> Optionally you can switch to a modal based authentication flow by setting the 'gatewayMode' in your `./src/settings.json`.

### First time visit
On first time visit you will ofcourse have to register a new account. The first account 
registered will automatically get 'owner' privileges. 

E-mails are not yet sent at this point. A nice Meteor feature is that when that's the case, 
the mail contents end up in your console. This allows you to click on the verification link 
from the console.

To make use of the e-mail system, 
[set the MAIL_URL environment variable according to the Meteor docs.](https://docs.meteor.com/api/email.html)

## Documentation
The documentation is a continuous work in progress. 
The goal is to have it fully documented and maybe have a dedicated guide. 

If you feel that stuff is missing from the docs or have any struggles. Please file an issue here on Github or create a topic on the 
[Meteor Forum](https://forums.meteor.com/)!

Each feature folder has its own README.md that contains a bit more in dept information about 
what it does and how its implemented. Feel free to have a look:

- [The Auth Readme](https://github.com/chris-visser/meteor-vue-admin/blob/master/src/app/features/auth/README.md)
- [The Notifications Readme](https://github.com/chris-visser/meteor-vue-admin/blob/master/src/app/features/notifications/README.md)
- The Users Readme (TODO)
- The Todos Readme (TODO)

## TODOs

- Introduce semver
- Document features, plugins, components.. Maybe creat a guide...
- Implement edit functionality
- Start testing, its not a POC anymore :)
- Make pluggable features via NPM packages

## App Directory Structure
The structure of the app follows

### components
This folder should contain all the generic Vue components. Right now it only contains 
some layout specific components.

### core
This folder contains the initialization code that should not have to be changed unless you want to change 
the way the app loads its core functionality. Examples of this functionality are the router, store, app initialization and asyncData calls.

### Features
Contains all of the system's features as self-contained modules. More info follows..

### filters
This is where you put generic [Vue filters](https://vuejs.org/v2/guide/filters.html) that are shared across multiple components. An example would be a standardized 
way to format dates.

### layouts
Multiple layouts are supported. This is where you add or modify them. If no layout is configured for a page, 
the 'admin' layout is loaded. The intention is that you use [Vue Slots](https://vuejs.org/v2/guide/components-slots.html) 
to determine where the page is loaded. 

Simply put `<slot />` on your layout where you want each page to be rendered.

### pages
Pages are Vue components that are directly connected to routes. 
Only generic pages should go here. They can be added in the `routes.js`. 
The page is rendered on a designated spot within the configured layout.

This folder should not contain the feature specific routes, because they should 
be added to the pages folder of the feature itself. For example, the Login page is 
located in `./src/app/features/auth/pages`. This one is referenced in `./src/app/features/auth/routes`. 

### plugins
Put all VueJS plugins here

### store
This is the global Vuex store where all of the Vuex store modules are loaded. 
The store already adds the `user` and `notifications` feature store modules. 

### routes.js
Contains the global routes, but also imports feature routes, added with the spread operator.
This allows features to hook into the existing routes list.

### config.js
A centralized place where you can initialize global components and other things if needed. 
Right now it just initializes the 2 layouts `AdminLayut` and `GatewayLayout`.

### index.html

This index.html allows you to add stuff to the head and body area if needed. 
Right now it just contains refs to the Roboto font and the Vuetify styles.

## Contribution

If you found a bug or have a request for a feature, then please open an issue. If you 
want to contribute then feel free to fork this repo and file a merge request. 

