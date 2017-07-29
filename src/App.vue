<template>
    <div id="app" :class="theme">
        <appHeader :theme="theme"></appHeader>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
  import appHeader from './components/global/Header.vue';
  import events from './lib/global-events';
  import moment from 'moment';

  const currentHour = moment().hour();

  export default {
    name: 'app',

    components: {appHeader},

    mounted: function () {
      events.on('theme-change', (theme) => {
        this.theme = theme;
      });
    },

    data() {
      return {
        theme: (currentHour > 18 || currentHour < 8) ? 'dark' : 'light'
      };
    }
  }
</script>

<style lang="scss">
    @import './css/app.scss';
</style>
