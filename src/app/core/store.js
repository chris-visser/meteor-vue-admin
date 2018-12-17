import Vue from 'vue';
import Vuex from 'vuex';
import { injectSupply } from 'vue-supply';

import storeOptions from '../store';

Vue.use(Vuex);

export default function createStore() {
  const supplyCache = {};
  const suppliedStoreOptions = injectSupply(storeOptions, supplyCache);

  return new Vuex.Store(suppliedStoreOptions);
}
