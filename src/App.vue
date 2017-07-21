<template>
    <div id="app">
        <header>
            <nav :class="$style.nav">
              <ul>
                <li><router-link :to="{ name: 'home' }" v-html="icons.home"></router-link></li>
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
  const config = require('../config');
  import icons from './lib/icons';

  export default {
    name: 'app',
    data () {
      return {
        title: config.template.title,
        icons: icons
      }
    }
  }
</script>

<style>
    @import './css/global/app.css';
</style>

<style module>
@value blue from './css/colors.css';
@value normal as m-normal from './css/layout.css';

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
    padding: m-normal;
  }
}
</style>

