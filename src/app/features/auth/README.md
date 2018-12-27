# Auth feature
This feature takes care of the whole authentication and authorization part. 
It connects Meteor's auth system to Vue using components, mixins and the Vuex Store.
The auth feature takes a page based approach where the login, registration, forgot-password 
and reset-password forms each have their own route. 

## Usage

First we need to add the store module and plugin.

```javascript
import user, { plugin as UserPlugin } from '../features/auth/store';

export default {
  plugins: [UserPlugin], // Connects Meteor's reactive user state to the store using Tracker

  modules: {
    user,
  },
};
```

The auth feature supports 2 types of gateway. One is modal based and the other is redirect based.

### Redirect based login
Add the auth routes to the global routes like below:

```javascript
import authRoutes from './features/auth/routes';

export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./pages/Dashboard.vue'),
  },
  ...authRoutes,
  {
    path: '*',
    name: 'not-found',
    component: () => import('./pages/NotFound.vue'),
  },
];
```

Connect the auth store and the plugin to the global store. Since the auth store contains user info
it should be added to the store as 'user'.

As a final step add the redirect mixin to the layout component(s) where needed. On your 
admin component use this: 

```javascript
import AuthRedirectMixin from '../features/auth/redirect-mixin';

export default {
  mixins: [AuthRedirectMixin({ isPrivate: true })],
}
```

On your gateway layout use this: 

```javascript
import AuthRedirectMixin from '../features/auth/redirect-mixin';

export default {
  mixins: [AuthRedirectMixin({ isGateway: true })],
}
```

By not adding the mixin or the routes, you can create your own auth flow and use the 
login component for example in a modal. 

### Modal based login
Since redirect based login is the default, remove the auth routes from `src/app/routes.js`.

Now change the `AdminLayout` from:
```javascript
  import TheHeader from '../components/TheHeader';
  import TheNavigation from '../components/TheNavigation';
  import Notifications from '../features/notifications';

  import AuthRedirectMixin from '../features/auth/mixins/redirect';
  import UserLogoutButton from '../features/auth/components/LogoutButton';

  export default {
    mixins: [AuthRedirectMixin({ isPrivate: true })],

    components: {
      Notifications,
      TheNavigation,
      TheHeader,
      UserLogoutButton,
    },
    ...
```
To this:
```javascript
  import TheHeader from '../components/TheHeader';
  import TheNavigation from '../components/TheNavigation';
  import Notifications from '../features/notifications';

  import GatewayModal from '../features/auth/components/GatewayModal';
  import UserLogoutButton from '../features/auth/components/LogoutButton';

  export default {

    components: {
      GatewayModal,
      Notifications,
      TheNavigation,
      TheHeader,
      UserLogoutButton,
    },
```

Also add the <GatewayModal /> component to the template:
```javascript
    <v-content>

      <v-alert
          slot="page-header"
          :value="showEmailUnverified"
          color="error"
      >
        Please verify your e-mail address. This is required before you can do stuff in this system.
      </v-alert>

      <slot v-if="userId" />

      <GatewayModal />
      <Notifications />
    </v-content>
```

## Functionality guide
A more detailed explanation of where the functionality is and what it does.

### Redirect Mixin
The redirect-mixing will ensure that non-authenticated users will be automatically 
redirected to the 'gateway'. The gateway is essentially the empty layout with 
one of 4 pages active: Login, Registration, ForgotPassword or ResetPassword. 

Whenever people log-in or when they land on the system with an active session 
(happens on refresh or from an external link), they will be automatically directed 
to the index (skipping the gateway).

### Registration hook
In the `api` folder is a `hooks.js` file. This file ensures that when the first 
user registers, he/she becomes automatically the owner. Owners cannot be removed 
from the system using the UI. 

### Auth related emails
Some procedures require e-mail verification. Right now, only 'registration' requires it.
An e-mail will be sent to the user with a link that allows them to confirm. When no 
e-mail configuration is set, the verification e-mail will end up on the server console 
allowing a convinient way for a developer to test this flow locally.

### User session and the Vuex Store
The user session is kept in the Vuex store which allows other components to work 
independently from Meteor's account system. All methods to register, login, logout, 
reset a password using a token or to enter a forgot password e-mail are present in 
the store. 

The store itself does not update the state. This is done by the store plugin located 
in `./store/plugin.js`. This plugin keeps the Meteor user state in sync with the store. 
This is done, because Meteor methods might be called directly without using the UI. Another 
example is that when an account gets removed by an admin, the account will now automatically 
log-out or when an admin changes user information it will automatically update on that user's 
screen aswell without the need of a refresh.

Another feature of the store is the `userDetailsLoaded`. In Meteor, the userId might already 
be set, meaning the user is logged in. However, the user subscription 
(the one that loads the email and the profile) will at first not be finished. This flag 
will indicate that those details are loaded aswell. It is therefore recommended to use 
this flag to check if the user is logged in, before you show for example the displayName.



