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
                <div class="grid-container grid-container-padded">
                    <ul class="align-center">
                        <li v-if="videos.previous" class="auto cell">
                            <router-link :to="{
                              name: 'videos',
                              params: (videos.previous === 1) ? {} : { page: videos.previous }
                            }">prev
                            </router-link>
                        </li>

                        <li v-for="page in videos.pages" class="auto cell">
                            <div v-if="page === '...'">...</div>
                            <router-link
                                    v-if="page !== '...'"
                                    :to="{ name: 'videos', params: (page === 1) ? {} : { page }}">{{page}}
                            </router-link>
                        </li>

                        <li v-if="videos.next" class="auto cell">
                            <router-link :to="{ name: 'videos', params: { page: videos.next }}">next</router-link>
                        </li>
                    </ul>
                </div>
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

    mounted: function () {
      const Foundation = require('foundation-sites/js/foundation.core').Foundation;
      this.pager = new Foundation.Sticky($(this.$el).find('.pager.sticky'));

      // sticky uses $(window).one() which doesn't play nice when this route is loaded via the client router.
      // @see https://github.com/zurb/foundation-sites/issues/9047
      $(window).trigger('load.zf.sticky');
      this.pager._calc(true);

      $(window).on('scroll', this.togglePagerVisibility);
    },

    destroyed: function() {
      this.pager.destroy();
      $(window).off('scroll', this.togglePagerVisibility);
    },

    methods: {
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
    $blue: get-color(blue);
    $gray: get-color(gray);
    $white: get-color(white);

    $pager-height: 50px;

    .video {
        border: 1px solid $gray;
    }

    .pager {
        background: $black;
        transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1);

        &.hidden {
            transform: translateY(100%);
        }

        ul {
            @include xy-grid(horizontal, false);
            margin: 0;

            li {
                border-right: 1px solid $gray;
                color: $white;
                list-style-type: none;
                text-align: center;
                height: $pager-height;
                line-height: $pager-height;

                &:last-child {
                    border-right: 0 none;
                }

                a {
                    color: $white;
                    display: block;
                    padding: 0 rem-calc(20);

                    &:--active {
                        background: $blue;
                        color: $white;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>