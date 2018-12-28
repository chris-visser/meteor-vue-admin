import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import '../plugins';
import '../filters';

import createStore from './store';
import createRouter from './router';

import Root from '../Root.vue';

const hyphenToCamel = str => str.replace(/-([a-z])/g, chunk => chunk[1].toUpperCase());

/**
 * This function is called on both client and server
 * @returns {{app, router, store}}
 */
function createApp() {
  const router = createRouter();
  const store = createStore();


  router.beforeEach(({ query }, from, next) => {
    if (query.action) {
      store.dispatch(hyphenToCamel(query.action), query);
      router.replace({ query: {} });
    }

    next();
  });


  const app = new Vue({
    el: '#app', // Mount to the #app element
    router,
    store,
    ...Root, // Connect the Root Vue component
  });

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  return {
    app,
    router,
    store,
  };
}

export default createApp;
