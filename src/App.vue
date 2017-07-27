<template>
    <div id="app">
        <header>
            <nav :class="$style.nav">
              <ul>
                <li><router-link :to="{ name: 'home' }" v-html="icons.home"></router-link></li>
                <li><a href="#" v-html="icons.paintcan" v-on:click="toggleColorScheme"></a></li>
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
  import $ from 'jquery';
  import icons from './lib/icons';

  export default {
    name: 'app',

    created: function() {
      this.color = '#fff';
    },
    
    data () {
      return { icons };
    },

    methods: {
      toggleColorScheme: function () {
        if (this.color === '#fff') {
          this.color = '#000';
        } else {
          this.color = '#fff';
        }

        $('body').css({ backgroundColor: this.color });
      }
    }
  }
</script>

<style>
    @import './css/global/app.css';
</style>

<style module>
@value blue from './css/colors.css';
@value normal as p-normal from './css/layout.css';

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

