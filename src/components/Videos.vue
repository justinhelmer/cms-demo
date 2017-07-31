<template>
    <div id="videos">
        <div class="grid-x">
            <div v-for="video in videos.results" class="video medium-6 large-4 xlarge-3 xxlarge-2 cell">
                <router-link :to="{ name: 'video', params: { id: video._id }}">
                    <thumbnail :list="video" type="video" at="0"></thumbnail>
                </router-link>
            </div>
        </div>

        <div data-sticky-container>
            <div class="pager sticky" data-sticky data-stick-to="bottom" data-margin-bottom="0">

                <ul class="pagination text-center">
                    <li v-if="videos.previous" class="pagination-previous">
                        <router-link :to="{
                          name: 'videos',
                          params: (videos.previous === 1) ? {} : { page: videos.previous }
                        }">prev
                        </router-link>
                    </li>

                    <router-link tag="li" v-for="page in videos.pages"
                                 exact-active-class="current"
                                 :to="{ name: 'videos', params: (page === 1) ? {} : { page }}">
                        <a>{{page}}</a>
                    </router-link>

                    <li v-if="videos.next" class="pagination-next">
                        <router-link :to="{ name: 'videos', params: { page: videos.next }}">next</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import $ from 'jquery';
  import thumbnail from './shared/Thumbnail.vue';

  export default {
    name: 'videos',

    components: {thumbnail},

    mounted: function() {
      $(window).on('scroll', this.togglePagerVisibility);
      this.foundation();
    },

    updated: function () {
      this.foundation(true);
    },

    destroyed: function() {
      this.pager.destroy();
      $(window).off('scroll', this.togglePagerVisibility);
    },

    methods: {
      foundation: function(update) {
        const Foundation = require('foundation-sites/js/foundation.core').Foundation;
        const $pager = $(this.$el).find('.pager');

        if (update) {
          Foundation.reInit($pager);
        } else {
          this.pager = new Foundation.Sticky($pager);
        }

        // sticky uses $(window).one() which doesn't play nice when this route is loaded via the client router.
        // @see https://github.com/zurb/foundation-sites/issues/9047
        $(window).trigger('load.zf.sticky');
        this.pager._calc(true);
      },

      togglePagerVisibility: function() {
        const $pager = $(this.$el).find('.pager');
        const $window = $(window);

        const scrollTop = $window.scrollTop();
        const isBottom = $window.height() + scrollTop === $(document).height();

        $pager.toggleClass('hidden', (isBottom) ? (false) : (scrollTop > this.prevScrollTop));
        this.prevScrollTop = scrollTop;
      }
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
    @import 'xy-grid/xy-grid.scss';
    @custom-selector :--active .router-link-exact-active, :hover;

    $black: get-color(black);
    $gray: get-color(gray);
    $white: get-color(white);

    .video {
        border: 1px solid $gray;
    }

    .pager {
        background: $black;
        transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1);

        &.hidden {
            transform: translateY(100%);
        }
    }

    .pagination a {
        color: $white;

        &:hover {
            background: none;
        }
    }
</style>