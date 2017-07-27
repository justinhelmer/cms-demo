<template>
    <div id="app" :class="themeCss">
        <header>
            <nav :class="$style.nav">
              <ul>
                <li><router-link :to="{ name: 'home' }" v-html="icons.home"></router-link></li>
                <li><a href="#" v-html="icons.paintcan" v-on:click="toggleTheme"></a></li>
              </ul>
              <ul>
                <li><a href="/keystone" v-html="icons.dashboard"></a></li>
              </ul>
            </nav>
        </header>
        <main><router-view></router-view></main>
    </div>
</template>

<script>
  import icons from './lib/icons';
  import moment from 'moment';

  export default {
    name: 'app',
    
    data () {
      return {
        icons,
        theme: moment().hour() > 18 ? 'dark' : 'light'
      };
    },

    computed: {
      themeCss () {
        return this.$style['theme-' + this.theme];
      }
    },

    methods: {
      toggleTheme: function () {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
      }
    }
  }
</script>

<style>
    @import './css/global/app.css';
</style>

<style module>
@value white, black, blue from './css/colors.css';
@value normal as p-normal from './css/layout.css';
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

.theme-light {
  background-color: white;
}

.theme-dark {
  background-color: black;

  & :--heading {
    color: white;
    border-color: white;
  }
}

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

