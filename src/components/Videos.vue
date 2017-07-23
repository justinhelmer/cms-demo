<template>
    <div id="videos">
        <ul :class="$style.grid">
            <li v-for="video in videos.results">
              <router-link :to="{ name: 'video', params: { id: video._id }}">
                <thumbnail :list="video" type="video" at="0"></thumbnail>
              </router-link>
            </li>
        </ul>

        <ul :class="$style.pager">
          <li v-for="page in videos.pages">
            <router-link :to="{ name: 'videos', params: { page: page }}">{{page}}</router-link>
          </li>
        </ul>
    </div>
</template>

<script>
  import thumbnail from './shared/Thumbnail.vue';

  export default {
    name: 'videos',

    components: { thumbnail },

    beforeRouteUpdate (to, from, next) {
      console.log('TO', to);
      console.log('FROM', from);
      next();
    },

    asyncData ({ store, route }) {
      return store.dispatch('fetch', {
        store: 'videos',
        endpoint: 'video',
        params: {
          page: route.params.page || 1
        }
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
  @value gray from '../css/colors.css';
  @value large as m-large from '../css/layout.css';
  @value thumbnail-width: 28.571428rem;

  .grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: m-large;

    & li {
      border: 1px solid gray;

      & a {
        display: block;
        width: calc(thumbnail-width);
        height: calc(thumbnail-width / 1.77778);
        overflow: hidden;

        & img {
          width: 100%;
        }
      }
    }
  }

  .pager {
    display: flex;

    & li {

      & a {
        display: block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
    }
  }
</style>