import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      photos: [],
      videos: []
    },
    actions: {
      fetch({commit}, {endpoint, store, id}) {
        const base = '/api';

        let uri = 'http://localhost:3000' + base + '/' + endpoint;

        if (id) {
          uri += '/' + id;
        }

        return axios.get(uri)
            .then(function ({data}) {
              if (id) {
                commit('setItem', {store, id, data});
              } else {
                commit('replaceItems', {store, data});
              }
            })
            .catch(error => console.log(error));
      }
    },
    getters: {
      getItemById: state => (id, store) => state[store].find(item => item._id === id)
    },
    mutations: {
      setItem (state, { store, id, data }) {
        const idx = state[store].find(item => item.id === id);

        if (idx) {
          state[store][idx] = data;
        } else {
          state[store].push(data);
        }
      },

      replaceItems (state, {store, data}) {
        state[store] = data;
      }
    }
  });
}