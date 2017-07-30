<template>
    <div id="app" :class="[theme, 'grid-y', 'grid-frame']">
        <appHeader :theme="theme"></appHeader>
        <main class="cell auto">
            <router-view class="content"></router-view>
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
    @import './css/settings.scss';
    @import 'foundation.scss';
    @import 'font-awesome.scss';
    @import 'ffab.scss';

    @include foundation-global-styles;
    @include foundation-xy-grid-classes;
    @include foundation-typography;
    @include foundation-button;
    @include foundation-visibility-classes;
    @include foundation-flex-classes;
    @include ffab-everything;

    $white: get-color(white);
    $black: get-color(black);
    $header-height: rem-calc(55);

    ::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }

    #app {
        background-color: $white;

        &.dark {
            background-color: $black;

            h1, h2 {
                color: $white;
            }
        }
    }

    main {
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .content {
        margin-top: $header-height;
    }
</style>
