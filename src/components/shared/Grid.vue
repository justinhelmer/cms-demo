<template>
    <div class="content-grid">
        <div class="grid-x">
            <div v-for="item in $attrs.items.results" class="medium-6 large-4 xlarge-3 xxlarge-2 cell">
                <router-link :to="{ name: $attrs.endpoint, params: { id: item._id }}">
                    <thumbnail :list="item" :endpoint="$attrs.endpoint" :show-name="$attrs['show-name']" at="0"></thumbnail>
                </router-link>
            </div>
        </div>

        <div v-if="!$attrs['no-pager']" data-sticky-container>
            <div class="pager sticky" data-sticky data-stick-to="bottom" data-margin-bottom="0">

                <ul class="pagination text-center">
                    <li v-if="$attrs.items.previous" class="pagination-previous">
                        <router-link :to="{
                          name: $attrs.store,
                          params: ($attrs.items.previous === 1) ? {} : { page: $attrs.items.previous }
                        }">prev
                        </router-link>
                    </li>

                    <router-link tag="li" v-for="(page, index) in $attrs.items.pages"
                                 :key="index"
                                 exact-active-class="current"
                                 :to="{ name: $attrs.store, params: (page === 1) ? {} : { page }}">
                        <a>{{page}}</a>
                    </router-link>

                    <li v-if="$attrs.items.next" class="pagination-next">
                        <router-link :to="{ name: $attrs.store, params: { page: $attrs.items.next }}">next</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import $ from 'jquery';
  import thumbnail from './Thumbnail.vue';

  export default {
    name: 'grid',

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
    }
  }
</script>

<style lang="scss">
    @import '../../css/settings.scss';
    @custom-selector :--active .router-link-exact-active, :hover;

    $black: get-color(black);
    $white: get-color(white);

    .content-grid .cell a {
      width: 100%;
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