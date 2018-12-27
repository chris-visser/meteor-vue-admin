# Auth feature
This feature takes care of the whole authentication and authorization part. 
It connects Meteor's auth system to Vue using components, mixins and the Vuex Store.
The auth feature takes a page based approach where the login, registration, forgot-password 
and reset-password forms each have their own route. 

## Redirect Mixin
The redirect-mixing will ensure that non-authenticated users will be automatically 
redirected to the 'gateway'. The gateway is essentially the empty layout with 
one of 4 pages active: Login, Registration, ForgotPassword or ResetPassword. 

Whenever people log-in or when they land on the system with an active session 
(happens on refresh or from an external link), they will be automatically directed 
to the index (skipping the gateway).

## Registration hook
In the `api` folder is a `hooks.js` file. This file ensures that when the first 
user registers, he/she becomes automatically the owner. Owners cannot be removed 
from the system using the UI. 

## Auth related emails
Some procedures require e-mail verification. Right now, only 'registration' requires it.
An e-mail will be sent to the user with a link that allows them to confirm. When no 
e-mail configuration is set, the verification e-mail will end up on the server console 
allowing a convinient way for a developer to test this flow locally.

## User session and the Vuex Store
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




