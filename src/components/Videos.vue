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
  import jQuery from 'jquery';
  import events from '../lib/global-events';
  import thumbnail from './shared/Thumbnail.vue';

  export default {
    name: 'videos',

    components: { thumbnail },

    mounted: function() {
      const $vm = this;
      const $el = jQuery(this.$el);
      const $pager = $el.find('.' + this.$style.pager);
      
      events.on('content-scroll', function(event) {
        const bottom = event.scrollPos + event.documentHeight === event.scrollHeight;
        const direction = bottom ? 'up' : event.direction;        
        const opposite = direction === 'up' ? 'down' : 'up';

        $pager.addClass($vm.$style['nav-' + opposite]).removeClass($vm.$style['nav-' + direction]);
      });
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
  @value small as bp-small, med as bp-med, lrg as bp-lrg, xl as bp-xl from '../css/breakpoints.css';
  @value gray-dark, black, blue from '../css/colors.css';
  @value neg-normal as m-neg-normal from '../css/layout.css';
  @value pager-height: 50px;
  @custom-selector :--active .router-link-exact-active, :hover;

  .grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & li {
      border: 1px solid gray-dark;
      width: 20%;

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

  @media bp-xl {
    .grid li {
      width: 25%;
    }
  }

  @media bp-lrg {
    .grid li {
      width: 33.33333%;
    }
  }

  @media bp-med {
    .grid li {
      width: 50%;
    }
  }

  @media bp-small {
    .grid li {
      width: 100%;
    }
  }

  .pager {
    background: black;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    position: fixed;
    transition: bottom 0.2s ease-in-out;
    bottom: 0;
    left: 0;
    right: 0;

    &.nav-up {
      bottom: calc(pager-height * -1);
    }

    &.nav-down {
      bottom: 0;
    }

    & li {
      border-right: 1px solid gray-dark;
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