<template>
    <div id="actor" class="grid-container grid-container-padded">
        <div class="grid-y">
            <h1 class="grid-x align-justify">{{actor.name}} <span><a :href="editUrl"><i class="fa fa-cog"></i></a></span></h1>

            <div class="orbit" data-orbit>
              <div class="orbit-wrapper">
                <div class="orbit-controls">
                  <button class="orbit-previous">&#9664;&#xFE0E;</button>
                  <button class="orbit-next">&#9654;&#xFE0E;</button>
                </div>
                <ul class="orbit-container">
                  <li v-for="(thumb, index) in actor.thumbs" :class="{'orbit-slide': true, 'is-active': index === 0}">
                    <figure class="orbit-figure">
                      <thumbnail :list="actor" endpoint="actor" :at="index"></thumbnail>
                    </figure>
                  </li>
                </ul>
              </div>
              <nav class="orbit-bullets">
                <button v-for="(thumb, index) in actor.thumbs" :data-slide="index" :class="{'is-active': index === 0}"></button>
              </nav>
            </div>

            <grid :items="{ results: actor.videos }" store="videos" endpoint="video"></grid>
        </div>
    </div>
</template>

<script>
  import $ from 'jquery';
  import grid from './shared/Grid.vue';
  import thumbnail from './shared/Thumbnail.vue';

  export default {
    name: 'actor',

    components: {grid, thumbnail},

    mounted: function () {
      const Foundation = require('foundation-sites/js/foundation.core').Foundation;
      const $orbit = $(this.$el).find('.orbit');
      new Foundation.Orbit($orbit);
    },

    asyncData({store, route}) {
      return store.dispatch('fetch', {
        id: route.params.id,
        store: 'actors',
        endpoint: 'actor'
      });
    },

    computed: {
      actor() {

        let actor = this.$store.getters.getItemById(this.$route.params.id, 'actors');
        console.log(actor);
        return actor;
      },

      editUrl() {
        return '/keystone/actors/' + this.actor._id;
      }
    },
  }
</script>

<style lang="scss" scoped>
  .orbit {
    margin: 0 auto;
    width: 50%;
  }
</style>