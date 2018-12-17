import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

// Meteor Tracker integration
import VueMeteorTracker from 'vue-meteor-tracker';
import VueSupply from 'vue-supply';
import VueObserveVisibility from 'vue-observe-visibility';
import VeeValidate from 'vee-validate';

import './vuetify.js';


Vue.use(VeeValidate); // Used for form Validations


Vue.use(VueRouter); // Routing
Vue.use(Vuex); // State store

Vue.use(VueMeteorTracker); // Connects Meteor's reactivity system to Vue

// This option will apply Object.freeze on the Meteor data to prevent Vue from setting up reactivity on it.
// This can improve the performance of Vue when rendering large collection lists for example.
// By default, this option is turned off.
Vue.config.meteor.freeze = true;


Vue.use(VueSupply);

Vue.use(VueObserveVisibility);

