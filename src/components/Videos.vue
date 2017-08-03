<template>
    <div id="videos">
        <grid :items="videos" store="videos" endpoint="video"></grid>
    </div>
</template>

<script>
  import grid from './shared/Grid.vue';

  export default {
    name: 'videos',

    components: {grid},

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
