<template>
    <div id="videos" :class="$style.wrapper">
        <ul :class="$style.grid">
            <li v-for="video in videos.results">
              <router-link :to="{ name: 'video', params: { id: video._id }}">
                <thumbnail :list="video" type="video" at="0"></thumbnail>
              </router-link>
            </li>
        </ul>

        <ul :class="$style.pager">
          <li v-if="videos.previous">
            <router-link :to="{
              name: 'videos',
              params: (videos.previous === 1) ? {} : { page: videos.previous }
            }">prev</router-link>
          </li>

          <li v-for="page in videos.pages">
            <div v-if="page === '...'">...</div>
            <router-link
                v-if="page !== '...'"
                :to="{ name: 'videos', params: (page === 1) ? {} : { page }}"
                :exact-active-class="$style['router-link-exact-active']">{{page}}
            </router-link>
          </li>

          <li v-if="videos.next">
            <router-link :to="{ name: 'videos', params: { page: videos.next }}">next</router-link>
          </li>
        </ul>
    </div>
</template>

<script>
  import thumbnail from './shared/Thumbnail.vue';

  export default {
    name: 'videos',

    components: { thumbnail },

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
  @value small as bp-small from '../css/breakpoints.css';
  @value gray, black, blue from '../css/colors.css';
  @value neg-normal as m-neg-normal, large as m-large from '../css/layout.css';
  @value pager-height: 50px;
  @custom-selector :--active .router-link-exact-active, :hover;

  .wrapper {
    margin: m-neg-normal;
    overflow-y: auto;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: m-large;
    margin-bottom: pager-height;

    & li {
      border: 1px solid gray;
      width: 25%;

      & a {
        display: block;
        overflow: hidden;

        & img {
          display: block;
          width: 100%;
        }
      }
    }
  }

  @media bp-small {
    .grid li a {
      height: auto;
      width: 100%;
    }
  }

  .pager {
    background: black;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    margin: 0 auto;
    justify-content: center;

    & li {
      border-right: 1px solid gray;
      color: white;
      flex-grow: 1;
      text-align: center;
      height: pager-height;
      line-height: pager-height;
      max-width: 90px;

      &:last-child {
        border-right: 0px none;
      }

      & a {
        display: block;
        color: white;

        &:--active {
          background: blue;
          color: white;
          font-weight: bold;
        }
      }
    }
  }
</style>