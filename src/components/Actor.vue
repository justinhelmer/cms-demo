<template>
    <div id="actor" class="grid-container grid-container-padded">
        <div class="grid-y">
            <h1>{{actor.name}}</h1>

            <thumbnail v-for="(thumb, index) in actor.thumbs" :list="actor" endpoint="actor" :at="index"></thumbnail>
        </div>
    </div>
</template>

<script>
  import thumbnail from './shared/Thumbnail.vue';

  export default {
    name: 'actor',

    components: {thumbnail},

    asyncData({store, route}) {
      return store.dispatch('fetch', {
        id: route.params.id,
        store: 'actors',
        endpoint: 'actor'
      });
    },

    computed: {
      actor() {
        return this.$store.getters.getItemById(this.$route.params.id, 'actors');
      }
    },
  }
</script>
