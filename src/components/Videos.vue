<template>
    <div id="videos">
        <ul :class="$style.list">
            <li v-for="video in videos">
              <router-link :to="{ name: 'video', params: { id: video._id }}">
                <thumbnail :list="video" type="video" at="0"></thumbnail>
              </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  import thumbnail from './shared/Thumbnail.vue';

  export default {
    name: 'videos',

    components: { thumbnail },

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
  @value gray from '../css/colors.css';
  @value large as m-large from '../css/layout.css';
  @value thumbnail-width: 28.571428rem;

  .list {
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
</style>