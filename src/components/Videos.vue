<template>
    <div id="videos">
        <div class="grid">
            <div v-for="video in videos.results" class="video">
                <router-link :to="{ name: 'video', params: { id: video._id }}">
                    <thumbnail :list="video" type="video" at="0"></thumbnail>
                </router-link>
            </div>
        </div>

        <ul class="pager">
            <li v-if="videos.previous">
                <router-link :to="{
                      name: 'videos',
                      params: (videos.previous === 1) ? {} : { page: videos.previous }
                    }">prev
                </router-link>
            </li>

            <li v-for="page in videos.pages">
                <div v-if="page === '...'">...</div>
                <router-link
                        v-if="page !== '...'"
                        :to="{ name: 'videos', params: (page === 1) ? {} : { page }}">{{page}}
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

    components: {thumbnail},

    mounted: function () {
      const $vm = this;
      const $el = jQuery(this.$el);
      const $pager = $el.find('.pager');

      events.on('content-scroll', function (event) {
        const bottom = event.scrollPos + event.documentHeight === event.scrollHeight;
        const direction = bottom ? 'up' : event.direction;
        const opposite = direction === 'up' ? 'down' : 'up';

        $pager.addClass('nav-' + opposite).removeClass('nav-' + direction);
      });
    },

    asyncData({store, route}) {
      return store.dispatch('fetch', {
        store: 'videos',
        endpoint: 'video',
        params: {
          page: route.params.page || 1
        }
      });
    },

    computed: {
      videos() {
        return this.$store.state.videos;
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../css/settings.scss';
    @custom-selector :--active .router-link-exact-active, :hover;

    $black: get-color(black);
    $blue: get-color(blue);
    $gray: get-color(gray);
    $white: get-color(white);

    $pager-height: 50px;

    .grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .video {
        border: 1px solid $gray;
    }

    @include breakpoint(small only) {
        .video {
            width: 100%;
        }
    }

    @include breakpoint(medium only) {
        .video {
            width: 50%;
        }
    }

    @include breakpoint(large only) {
        .video {
            width: 33.3333333%;
        }
    }

    @include breakpoint(xlarge only) {
        .video {
            width: 25%;
        }
    }

    @include breakpoint(xxlarge up) {
        .video {
            width: 20%;
        }
    }

    .pager {
        background: $black;
        display: flex;
        margin: 0 auto;
        justify-content: center;
        position: fixed;
        transition: bottom 0.2s ease-in-out;
        bottom: 0;
        left: 0;
        right: 0;

        &.nav-up {
            bottom: -$pager-height;
        }

        &.nav-down {
            bottom: 0;
        }

        & li {
            border-right: 1px solid $gray;
            color: $white;
            flex-grow: 1;
            list-style-type: none;
            text-align: center;
            height: $pager-height;
            line-height: $pager-height;
            max-width: 90px;

            &:last-child {
                border-right: 0 none;
            }

            & a {
                display: block;
                color: $white;

                &:--active {
                    background: $blue;
                    color: $white;
                    font-weight: bold;
                }
            }
        }
    }
</style>