<template>
    <header>
        <nav class="nav">
            <div>
                <div>
                    <router-link :to="{ name: 'home' }" class="fa fa-home fa-lg"></router-link>
                </div>
                <div><a href="#" class="fa fa-random fa-lg" v-on:click="random" onclick="return false;"></a></div>
            </div>
            <div>
                <div><a href="#" class="fa fa-lightbulb-o fa-lg" v-on:click="toggleTheme" onclick="return false;"></a>
                </div>
                <div><a href="/keystone" class="fa fa-cog fa-lg"></a></div>
            </div>
        </nav>
    </header>
</template>

<script>
  import axios from 'axios';
  import jQuery from 'jquery';
  import events from '../../lib/global-events';

  export default {
    name: 'header',

    mounted: function () {
      const $header = jQuery(this.$el);
      const $wrapper = $header.siblings('main');
      const navbarHeight = $header.outerHeight();
      let didScroll;
      let lastScrollPos = 0;

      $wrapper.on('scroll', () => {
        didScroll = true;
      });

      setInterval(() => {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 250);

      function hasScrolled() {
        const scrollPos = $wrapper.scrollTop();
        const documentHeight = $wrapper.height();
        const scrollHeight = $wrapper[0].scrollHeight;

        if (scrollPos > lastScrollPos && scrollPos > navbarHeight) {
          // Scroll Down
          $header.removeClass('nav-down').addClass('nav-up');
          events.trigger('content-scroll', {direction: 'down', scrollPos, documentHeight, scrollHeight});
        } else if (scrollPos < lastScrollPos) {
          // Scroll Up
          $header.removeClass('nav-up').addClass('nav-down');
          events.trigger('content-scroll', {direction: 'up', scrollPos, documentHeight, scrollHeight});
        }

        lastScrollPos = scrollPos;
      }
    },

    data () {
      return {
        theme: this.$attrs.type
      };
    },

    methods: {
      toggleTheme: function () {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        events.trigger('theme-change', this.theme);
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

    $blue: get-color(blue);
    $header-height: rem-calc(55);

    header {
        position: fixed;
        transition: top 0.2s ease-in-out;
        top: 0;
        left: 0;
        right: 0;
        height: $header-height;
        overflow: hidden;
        z-index: 1;

        &.nav-up {
            top: -$header-height;
        }
        .nav {
            background: $blue;
            display: flex;
            justify-content: space-between;

            & > div {
                display: flex;

                & > div {
                    position: relative;

                    &::before {
                        transform: translate(0, -50%);
                        background-color: rgba(255, 255, 255, 0.2);
                        content: " ";
                        left: 0;
                        height: 1em;
                        position: absolute;
                        top: 50%;
                        width: 1px;
                        z-index: 1;
                    }

                    &::first-child::before {
                        display: none;
                    }
                }
            }

            & a {
                box-sizing: content-box;
                color: #fff;
                height: 15px;
                display: inline-block;
                padding: $global-margin;
            }
        }
    }
</style>
