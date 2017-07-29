<template>
    <div id="magazines">
        <h1>magazines</h1>
        <ul class="list">
            <li v-for="magazine in magazines">
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

<style lang="scss" scoped>
    .list {
        display: flex;
    }
</style>