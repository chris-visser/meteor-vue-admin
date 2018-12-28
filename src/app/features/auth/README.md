# Auth feature
This feature takes care of the whole authentication and authorization part. 
It connects Meteor's auth system to Vue using components, mixins and the Vuex Store.

The system allows 2 types of onboarding: Redirect and Modal based. Both options have 
pros and cons which you can read about after the usage part. 

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

The second step is to include the gateway. The gateway handles which type of onboarding 
logic is used based on the "gatewayMode" setting. The only thing you need to do is add 
it to the Root.vue file like below:

```javascript
<template>
  <the-gateway :adminLayout="adminLayout" :publicLayout="publicLayout">
    <router-view />
  </the-gateway>

</template>

<script>
  import TheGateway from './features/auth/components/TheGateway';

  export default {
    components: {
      TheGateway,
    },
    data() {
      return {
        adminLayout: () => import('./layouts/AdminLayout'),
        publicLayout: () => import('./layouts/PublicLayout'),
      }
    }
  };
</script>
```

The gateway component accepts 2 arguments: adminLayout and publicLayout. 
These should be your layout components and they will be loaded whenever they are 
needed and depending on the "gatewayMode" setting. 

When gatewayMode is set to "modal", the publicLayout property is optional. 


### Redirect based auth

You can enable redirect based auth via the `./src/settings.json` file like below:

```javascript
{
  "public": {
    "auth": {
      "gatewayMode": "redirect"
    }
  }
}
```

This will set the auth gateway to redirect the user from and to the login page. If a page 
is not flagged as `isPublic: true` and the user lands un-authenticated on this page, he/she 
will automatically be redirected to the `/login` page. The other way round also applies: 
Whenever a user logs in from a public page, he/she will be redirected to the `/` (admin).

Users can navigate to 4 different pages on the gateway:

- `/login`: The login page
- `/registration`: The registration page
- `/forgot-password`: Allows users to enter a mail which sends them a reset e-mail
- `/reset-password`: Shows a change password form to allow the user to reset his/her password

### Pros
- The public layout allows for additional information about the system to be shown.
- Gives a secure feeling, because users go 'trough a wall' to get to the private area.
- Clean URL's

### Cons
- No chance to show what's inside
- User steps away from the initially requested page (interrupted workflow)


### Modal based auth

You can enable the modal based approach in `./src/settings.json` like below:

```javascript
{
  "public": {
    "auth": {
      "gatewayMode": "modal"
    }
  }
}
```

Modal based auth will show a modal / dialog with a login screen whenever an un-authenticated use lands 
on the system. The modal is controlled via the url. This allows users to directly 
navigate to the registration screen. 

Notice that the urls are slightly different from the redirect based approach. 
This is because, the user never actually navigates away from the page and therefore its a 'mode' within 
this page.

- `?modal=login`: The login page
- `?modal=registration`: The registration page
- `?modal=forgot-password`: Allows users to enter a mail which sends them a reset e-mail
- `?modal=reset-password`: Shows a change password form to allow the user to reset his/her password

### Pros
- User stays on the page he/she initialy requested
- Less layouts to worry about
- Gives hints about what the system is and does, before actually being logged in

### Cons
- Might give an insecure feeling to the user (since the private area is visible)


## Functionality guide
A more detailed explanation of where the functionality is and what it does.

### The Auth Mixin
The auth mixin will be an empty object or an actual mixin depending on the `gatewayMode` setting 
Only when its set to redirect, it will act as a mixin. This mixin ensures
that users will be automatically redirected from and to the 'gateway' depending on there 
authenticated state. 

Whenever people log-in or when they land on the system with an active session 
(happens on refresh or from an external link), they will be automatically directed 
to the index (skipping the gateway).

### Registration hook
In the `api` folder is a `hooks.js` file. This file ensures that when the first 
user registers, he/she becomes automatically the owner. Owners cannot be removed 
from the system using the UI. 

### Auth related emails
Some procedures require e-mail verification.
An e-mail will be sent to the user with a link that allows them to confirm their action. 
When no e-mail configuration is set, the verification e-mail will end up on the 
server console allowing a convenient way for a developer to test this flow locally.

The url in the reset password url in the e-mail is slightly different depending on the selected 
`gatewayMode`. In case of "redirect" it will be `/reset-password?token={token}`. In case of "modal" 
it will be `?modal=reset-password&token={token}` 

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



