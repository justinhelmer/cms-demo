<template>
    <div id="users">
        <h1>Users</h1>
        <ul>
            <li v-for="user in users" :class="$style.list">
              {{user.name.first}} {{user.name.last}} ({{user.email}})
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'users',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        store: 'users',
        endpoint: 'users'
      });
    },

    computed: {
      users () {
        return this.$store.state.users;
      }
    }
  }
</script>

<style module>
    @value small as m-small from '../css/layout.css';

    .list {
        display: inline-block;
        margin: 0 m-small 0 0;
    }
</style>