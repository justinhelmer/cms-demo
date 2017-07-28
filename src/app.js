import Vue from 'vue';
import App from './App.vue';
import {createRouter} from './core/router';
import {createStore} from './core/store';
import {sync} from 'vuex-router-sync';

export function createApp({ userAgent }) {
  const router = createRouter();
  const store = createStore({ userAgent });

  sync(store, router);

  const app = new Vue({router, store, render: h => h(App)});

  return {app, router, store};
}
