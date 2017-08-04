<template>
    <div class="thumb">
      <img :src="fullpath" />
      <div v-if="$attrs['show-name']">{{$attrs.list.name}}</div>
    </div>
</template>

<script>
  const path = require('path');
  const thumbsPath = require('../../../config').thumbsPath;

  export default {
    name: 'thumbnail',

    computed: {
      fullpath () {
        return path.join(
          thumbsPath,
          this.$attrs.endpoint,
          this.$attrs.list.name,
          this.$attrs.list.thumbs[this.$attrs.at]
        );
      }
    }
  }
</script>

<style lang="scss">
    @import '../../css/settings.scss';

    $gray: get-color(gray);
    $black: get-color(black);
    $white: get-color(white);

    .thumb {
        border: 1px solid $gray;
        position: relative;

        img {
          display: block;
          width: 100%;
        }

        div {
          background-color: $black;
          bottom: 0;
          color: $white;
          padding: rem-calc(5);
          position: absolute;
          text-align: center;
          width: 100%;
        }
    }
</style>