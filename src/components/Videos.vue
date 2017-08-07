<template>
    <div id="videos">
        <grid :items="videos" store="videos" endpoint="video"></grid>
    </div>
</template>

<script>
  export default {
    name: 'videos',

    components: {
      grid: () => import(/* webpackChunkName: "shared" */ './shared/Grid.vue')
    },

    asyncData({store, route}) {
      return store.dispatch('fetch', {
        store: 'videos',
        endpoint: 'video',
        params: {
          page: route.params.page || 1
        }
      });
    },

    computed: {
      videos() {
        return this.$store.state.videos;
      }
    }
  }
</script>
