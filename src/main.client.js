/**
 * The main entry point for the client.
 *
 * A /dist/main.js is generated by webpack.client.config.js and loaded via index.html.
 *
 * Does the following:
 *   1) Bootstraps the client app, router, and data store
 *   2) Informs the router to fetch asynchronous data when routing between routes, before resolving the route
 *   3) Mounts the app to the DOM
 *
 * If SSR is enabled, the app-server will use main.server.js as its entry point. All async data requests are pre-fetched
 * in order to make SSR possible. The results of the pre-fetched requests are stored in the shared data store
 * located at core/store.js.
 *
 * When the client first loads the page that has been fully rendered by the server, the shared data store will be
 * available in window.__INITIAL_STATE__. This initial state will bootstrap the client's data store.
 *
 * @see server/app-server.js
 * @see src/main.server.js
 * @see src/core/store.js
 */
import $ from 'jquery';
import {createApp} from './app';
const {app, router, store} = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  router.beforeResolve(fetchAsyncData);
  app.$mount('#app');
});

/**
 * Fetch all async data when routing to a new route, before resolving the route.
 *
 * Intended to be used as a hook for router.beforeResolve. Should be attached after the initial route is resolved
 * as to not double-fetch the data that is already in the store (if SSR is enabled).
 *
 * The beforeResolve hook is called right before a navigation is confirmed, after all other guards and async
 * components have been resolved.
 *
 * Additionally adds and removes a spinner to the page during navigation
 *
 * @see https://ssr.vuejs.org/en/data.html
 * @see https://router.vuejs.org/en/api/router-instance.html
 */
import spinner from './css/spinner.css';

let $spinner = $(`
  <div class="${spinner.wrapper}">
      <div class="${spinner.doubleBounce1}"></div>
      <div class="${spinner.doubleBounce2}"></div>
  </div>
`);

function fetchAsyncData(to, from, next) {
  const asyncDataHooks = router
    .getMatchedComponents(to)
    .map(component => component.asyncData).filter(_ => _);

  if (!asyncDataHooks.length) {
    return next();
  }

  $spinner.appendTo('body');

  Promise.all(asyncDataHooks.map(asyncData => asyncData({ store, route: to })))
    .then(() => {
      $spinner.detach();
      next();
    })
    .catch(next);
}
