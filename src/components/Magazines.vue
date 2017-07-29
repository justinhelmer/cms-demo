<template>
    <div id="magazines">
        <h1>magazines</h1>
        <ul :class="$style.list">
            <li v-for="magazine in magazines" :class="$style.list">
              {{magazine.name}}
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'magazines',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        store: 'magazines',
        endpoint: 'magazine'
      });
    },

    computed: {
      magazines () {
        return this.$store.state.magazines;
      }
    }
  }
</script>

<style module>
    .list {
        display: flex;
    }
</style>