<template>
    <div id="video" class="content">
        <h1>{{video.name}}</h1>

        <div :class="$style.player">
          <video controls :class="$style.player">
            <source :src="video.path" type="video/mp4">
          </video>
        </div>

        <div :class="$style['below-player']">
          <button class="btn" :data-clipboard-text="  windowsPath">Copy path</button>
        </div>
    </div>
</template>

<script>
  if (!require('../lib/is-server')()) {
    const Clipboard = require('clipboard');
    new Clipboard('.btn');
  }

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
      },

      windowsPath () {
        return this.$store.getters.getItemById(this.$route.params.id, 'videos').path
          .replace('/mnt/a', 'A:')
          .replace(/\//g, '\\');
      }
    }
  }
</script>

<style module>
    @value max from '../css/breakpoints.css';
    @value normal as m-normal from '../css/layout.css';

    .player {  
      display: block;
      margin: 0 auto;
      max-width: max;
      height: auto;
      width: 100%;
    }

    .below-player {
      margin: m-normal auto;
      max-width: max;
    }
</style>