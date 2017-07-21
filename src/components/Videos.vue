<template>
    <div id="videos">
        <h1>videos</h1>
        <ul :class="$style.list">
            <li v-for="video in videos" :class="$style.list">
              {{video.name}}
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

<style module>
    .list {
        display: flex;
    }
</style>