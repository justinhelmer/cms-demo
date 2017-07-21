<template>
    <div id="home">
        <h1>Welcome</h1>

        <ul :class="$style.list">
          <li>
            <router-link :to="{ name: 'videos' }" :class="$style.link">
              <div v-html="icons['device-camera-video']" :class="$style.icon"></div>
              <div :class="$style.iconText">Videos</div>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'photos' }" :class="$style.link">
              <div v-html="icons['device-camera']" :class="$style.icon"></div>
              <div :class="$style.iconText">Photos</div>
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
  @value blue, gray from '../css/colors.css';
  @value small as p-small, large as p-large from '../css/layout.css';
  @value xl as t-xl from '../css/typography.css';

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & li {
      margin: 0 p-large p-large;
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
      height: 200px;
      width: 200px;
    }
  }

  .icon-text {
    background: gray;
    font-size: t-xl;
    padding: p-small;
    text-align: center;
  }
</style>