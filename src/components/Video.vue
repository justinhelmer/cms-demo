<template>
    <div id="video" :class="$style.wrapper">
        <h1>{{video.name}}</h1>

        <div :class="$style.player">
          <video controls>
            <source :src="video.path" type="video/mp4">
          </video>
        </div>
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
    @value max-width from '../css/layout.css';

    .wrapper {
      display: flex;
      flex-direction: column;
    }

    .player {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-grow: 1;

      & video {  
        height: auto;
        max-width: max-width;
        width: 100%;
      }
    }
</style>