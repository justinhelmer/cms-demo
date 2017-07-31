<template>
    <header>
        <nav id="nav" class="nav sticky top-bar">
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
  import events from '../../lib/global-events';
  import scroll from '../../lib/scroll';

  export default {
    name: 'header',

    mounted: function () {
      const $header = $(this.$el);

      scroll.on('down', () => {
        $header.removeClass('scroll-up').addClass('scroll-down');
      });

      scroll.on('up', () => $header.removeClass('scroll-down').addClass('scroll-up'));
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

    $white: get-color(white);
    $header-height: rem-calc(55);

    header {
        height: $header-height;
        overflow: hidden;

        &.scroll-down {
            border: red;
        }
    }

    a {
        color: $white;
    }

    i {
        margin-right: rem-calc(5);
    }
</style>
