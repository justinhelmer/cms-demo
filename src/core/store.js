import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore ({ userAgent }) {
  return new Vuex.Store({
    state: {
      photos: { results: [] },
      videos: { results: [] }
    },
    actions: {
      fetch({commit}, {endpoint, store, id, params}) {
        let uri = '/api/' + endpoint;

        if (id) {
          uri += '/' + id;
        }

        return axios.get(uri, {
            params,
            proxy: { port: 3000 },
            headers: { 'X-User-Agent': userAgent } // tablet, mobile or desktop
          })
          .then(function ({data}) {
            if (id) {
              commit('setItem', {store, id, data});
            } else {
              commit('replaceItems', {store, data});
            }
          })
          .catch(err => console.log(err));
      }
    },
    getters: {
      getItemById: state => (id, store) => state[store].results.find(item => item._id === id)
    },
    mutations: {
      setItem (state, { store, id, data }) {
        const idx = state[store].results.find(item => item.id === id);

        if (idx) {
          state[store].results[idx] = data;
        } else {
          state[store].results.push(data);
        }
      },

      replaceItems (state, {store, data}) {
        state[store] = data;
      }
    }
  });
}