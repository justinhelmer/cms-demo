<template>
    <div id="video" class="grid-container grid-container-padded">
        <div class="grid-y">
            <h1>{{video.name}}</h1>

            <div class="player">
                <video controls>
                    <source :src="video.path" type="video/mp4">
                </video>
            </div>

            <div class="below-player">
                <button id="copy-path" class="button large ffab fa-clipboard show-for-xlarge" :data-clipboard-text="windowsPath">Copy path
                </button>
            </div>
        </div>
    </div>
</template>

<script>
  import $ from 'jquery';

  export default {
    name: 'video',

    mounted: function () {
      const Clipboard = require('clipboard');
      new Clipboard('#copy-path');
    },

    asyncData({store, route}) {
      return store.dispatch('fetch', {
        id: route.params.id,
        store: 'videos',
        endpoint: 'video'
      });
    },

    computed: {
      video() {
        return this.$store.getters.getItemById(this.$route.params.id, 'videos');
      },

      windowsPath() {
        return this.$store.getters.getItemById(this.$route.params.id, 'videos').path || ''
          .replace('/mnt/a', 'A:')
          .replace(/\//g, '\\');
      }
    },

    // note that routing from /video/:id to /video/:id will trigger update cycle, not full render cycle.
    watch: {
      // browser needs to reload the src of the video
      ['video.path']() {
        $(this.$el).find('video')[0].load();
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../css/settings.scss';

    .player {
        display: block;
        margin: 0 auto;
        max-width: $global-width;
        height: auto;
        width: 100%;

        video {
            width: 100%;
        }
    }

    .below-player {
        margin: $global-margin auto;
        max-width: $global-width;
        text-align: right;
    }
</style>