<template>
    <img :src="fullpath" />
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
          this.$attrs.type,
          this.$attrs.list.name,
          this.$attrs.list.thumbnails[this.$attrs.at]
        );
      }
    }
  }
</script>