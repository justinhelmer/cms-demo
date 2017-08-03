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
          this.$attrs.endpoint,
          this.$attrs.list.name,
          this.$attrs.list.thumbs[this.$attrs.at]
        );
      }
    }
  }
</script>