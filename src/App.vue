<template>
    <div id="app" :class="themeCss">
        <header>
            <nav :class="$style.nav">
              <ul>
                <li><router-link :to="{ name: 'home' }" v-html="icons.home"></router-link></li>
              </ul>
              <ul>
                <li><a href="#" v-html="icons.eye" v-on:click="toggleTheme" onclick="return false;"></a></li>
                <li><a href="/keystone" v-html="icons.gear"></a></li>
              </ul>
            </nav>
        </header>
        <main><router-view></router-view></main>
    </div>
</template>

<script>
  import jQuery from 'jquery';
  import moment from 'moment';
  import events from './lib/global-events';
  import icons from './lib/icons';

  export default {
    name: 'app',

    mounted: function() {
      const $el = jQuery(this.$el);
      const $wrapper = $el.find('> main');
      const $header = $el.find('> header');
      const $footer = $el.find('footer').first();
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
          events.trigger('content-scroll', { direction: 'down', scrollPos, documentHeight, scrollHeight });
        } else if (scrollPos < lastScrollPos) {
          // Scroll Up
          $header.removeClass('nav-up').addClass('nav-down');
          events.trigger('content-scroll', { direction: 'up', scrollPos, documentHeight, scrollHeight });
        }

        lastScrollPos = scrollPos;
      }
    },
    
    data () {
      return {
        icons,
        theme: moment().hour() > 18 ? 'dark' : 'light'
      };
    },

    computed: {
      themeCss () {
        return 'theme-' + this.theme;
      }
    },

    methods: {
      toggleTheme: function () {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      }
    }
  }
</script>

<style lang="scss">
    @import './css/global/app.scss';
</style>

<style module>
@value white, black, blue from './css/colors.css';
@value normal as p-normal from './css/layout.css';
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

.nav {
  background: blue;
  display: flex;
  justify-content: space-between;

  & ul {
    display: flex;
  }

  & li {
    position: relative;
  }

  & li::before {
    transform: translate(0, -50%); 
    background-color: rgba(255,255,255,0.2);
    content: " ";
    left: 0;
    height: 1em;
    position: absolute;
    top: 50%;
    width: 1px;
    z-index: 1;
  }

  & li:first-child::before {
    display: none
  }

  & a {
    color: #fff;
    display: inline-block;
    padding: p-normal;
  }
}
</style>

