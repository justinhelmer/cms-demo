<template>
    <div id="app">
        <appHeader></appHeader>
        <main><router-view></router-view></main>
    </div>
</template>

<script>
  import appHeader from './components/global/Header.vue';

  export default {
    name: 'app',

    components: {appHeader},

    beforeMount: function () {
      require('./lib/foundation')({
        plugins: ['Orbit', 'Sticky', 'Toggler']
      });
    }
  }
</script>

<style lang="scss">
    @import './css/settings.scss';
    @import 'foundation.scss';
    @import 'motion-ui';
    @import 'font-awesome.scss';
    @import 'ffab.scss';

    @include foundation-global-styles;
    @include foundation-menu;
    @include foundation-pagination;
    @include foundation-sticky;
    @include foundation-top-bar;
    @include foundation-xy-grid-classes;
    @include foundation-typography;
    @include foundation-button;
    @include foundation-visibility-classes;
    @include foundation-flex-classes;
    @include foundation-orbit;
    @include motion-ui-transitions;
    @include motion-ui-animations;
    @include ffab-everything;

    $white: get-color(white);
    $black: get-color(black);

    ::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }

    body {
        -webkit-overflow-scrolling: touch;
        background-color: $white;

        &.dark {
            background-color: $black;

            h1, h2 {
                color: $white;
            }
        }
    }
</style>
