<template>
    <div id="video">
        <h1>{{video.name}}</h1>
        <h2>{{video.path}}</h2>
    </div>
</template>

<script>
  export default {
    name: 'video',

    asyncData ({ store, route }) {
      return store.dispatch('fetch', {
        id: route.params.id,
        store: 'videos',
        endpoint: 'video'
      });
    },

    computed: {
      video () {
        return this.$store.getters.getItemById(this.$route.params.id, 'videos');
      }
    }
  }
</script>

<style module>
    .list {
    }
</style>