<template>
    <header data-sticky-container>
        <nav id="nav" class="nav sticky top-bar" data-sticky data-margin-top="0">
            <div class="top-bar-left">
                <ul class="menu">
                    <li>
                        <router-link :to="{ name: 'home' }">
                            <i class="fa fa-home"></i><span class="show-for-medium">Home</span>
                        </router-link>
                    </li>
                    <li>
                        <a href="#" v-on:click="random" onclick="return false;">
                            <i class="fa fa-random"></i><span class="show-for-medium">Random Video</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="top-bar-right">
                <ul class="menu align-right">
                    <li>
                        <a href="#" v-on:click="toggleTheme" onclick="return false;">
                            <i class="fa fa-lightbulb-o"></i><span class="show-for-medium">Change Theme</span>
                        </a>
                    </li>
                    <li>
                        <a href="/keystone">
                            <i class="fa fa-cog"></i><span class="show-for-medium">Admin Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
  import axios from 'axios';
  import $ from 'jquery';

  export default {
    name: 'header',

    mounted: function () {
      const Foundation = require('foundation-sites/js/foundation.core').Foundation;
      const $window = $(window);
      const $nav = $(this.$el).find('nav.sticky');
      let previousScrollTop = 0;

      $window.on('scroll', () => {
        const scrollTop = $window.scrollTop();
        $nav.toggleClass('hidden', scrollTop > previousScrollTop);
        previousScrollTop = scrollTop;
      });

      new Foundation.Sticky($nav);
    },

    data () {
      return {
        theme: this.$attrs.type
      };
    },

    methods: {
      toggleTheme: function () {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      },

      random: function () {
        axios
          .get('/api/random/video', {
            proxy: {
              port: 3000
            }
          })
          .then(({data}) => {
            this.$router.push({name: 'video', params: {id: data._id}});
          });

        return false;
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../css/settings.scss';

    $white: get-color(white);

    nav.sticky {
        transition: transform 0.5s cubic-bezier(0.86, 0, 0.07, 1);

        &.hidden {
            transform: translateY(-100%);
        }
    }

    a {  color: $white;  }
    i {  margin-right: rem-calc(5); }
</style>
