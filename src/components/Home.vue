<template>
    <div id="home">
        <h1>Welcome</h1>

        <ul :class="$style.list">
          <li>
            <router-link :to="{ name: 'videos' }" :class="$style.link">
              <div v-html="icons['device-camera-video']" :class="$style.icon"></div>
              <h2 :class="$style['icon-text']">Videos</h2>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'photos' }" :class="$style.link">
              <div v-html="icons['device-camera']" :class="$style.icon"></div>
              <h2 :class="$style['icon-text']">Photos</h2>
            </router-link>
          </li>
        </ul>
    </div>
</template>

<script>
  import icons from '../lib/icons';

  export default {
    name: 'home',
    data () {
      return {icons};
    }
  }
</script>

<style module>
  @value small as bp-small from '../css/breakpoints.css';
  @value blue, gray from '../css/colors.css';
  @value small as p-small, normal as p-normal, large as p-large from '../css/layout.css';
  @value xl as t-xl from '../css/typography.css';

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & li {
      margin: 0 p-large p-large;
      max-width: 400px;
      flex-grow: 1;

      & a {
        display: block;
      }
    }
  }

  @media bp-small {
    .list li {
      margin: 0 0 p-normal;
      max-width: none;
      width: 100%;
    }
  }

  .link {
    border: ;
    color: blue;
    display: inline-block;
  }

  .icon {
    border: 2px solid gray;
    padding: p-large;

    & svg {
      height: auto;
      width: 100%;
    }
  }

  .icon-text {
    background: gray;
    margin: 0;
    padding: p-small;
    text-align: center;
  }
</style>