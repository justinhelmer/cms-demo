<template>
    <div id="photos">
        <h1>photos</h1>
        <ul :class="$style.list">
            <li v-for="photo in photos" :class="$style.list">
              {{photo.name}}
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'photos',

    asyncData ({ store }) {
      return store.dispatch('fetch', {
        store: 'photos',
        endpoint: 'photo'
      });
    },

    computed: {
      photos () {
        return this.$store.state.photos;
      }
    }
  }
</script>

<style module>
    .list {
        display: flex;
    }
</style>