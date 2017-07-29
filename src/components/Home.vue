<template>
    <div id="home" class="content">
        <h1>Welcome</h1>

        <ul :class="$style.list">
          <li>
            <router-link :to="{ name: 'videos' }" :class="$style.link">
              <div :class="[$style.icon, 'fa', 'fa-video-camera', 'fa-5x']"></div>
              <h2 :class="$style['icon-text']">Videos</h2>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'photos' }" :class="$style.link">
              <div :class="[$style.icon, 'fa', 'fa-camera', 'fa-5x']"></div>
              <h2 :class="$style['icon-text']">Photos</h2>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'magazines' }" :class="$style.link">
              <div :class="[$style.icon, 'fa', 'fa-file-pdf-o', 'fa-5x']"></div>
              <h2 :class="$style['icon-text']">Magazines</h2>
            </router-link>
          </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'home'
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
      margin: 0 p-normal p-normal;
      max-width: 400px;
      flex-grow: 1;

      & a {
        display: block;
        text-align: center;
      }
    }
  }

  .link {
    color: blue;
    display: inline-block;
  }

  .icon {
    background: gray;
    border-width: 0;
    border-style: solid;
    border-color: gray;
    padding: p-large;
    width: 155px;
  }

  .icon-text {
    margin: 0;
    padding: p-small;
    text-align: center;
  }

  @media bp-small {
    .list li {
      margin: 0 0 p-normal;
      max-width: none;
      width: 100%;
    }

    .icon {
      border-width: 1px 0;
    }

    .icon-text {
      display: none;
    }
  }
</style>