import Vue from 'vue';
import Router from 'vue-router';

import routes from '../routes';

Vue.use(Router);

/**
 * These routes take advantage of code splitting. Each page is loaded when the route is loaded
 * @returns {VueRouter}
 */

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes,
  });
}
