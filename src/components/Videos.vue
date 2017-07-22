<template>
    <div id="videos">
        <h1>videos</h1>
        <ul>
            <li v-for="video in videos">
              <router-link :to="{ name: 'video', params: { id: video._id }}">{{video.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'videos',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        store: 'videos',
        endpoint: 'video'
      });
    },

    computed: {
      videos () {
        return this.$store.state.videos;
      }
    }
  }
</script>