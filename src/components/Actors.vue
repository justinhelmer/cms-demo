<template>
    <div id="actors">
        <grid :items="actors"
              store="actors"
              endpoint="actor"
              show-name="true"></grid>
    </div>
</template>

<script>
  import grid from './shared/Grid.vue';

  export default {
    name: 'actors',

    components: {grid},

    asyncData({store, route}) {
      return store.dispatch('fetch', {
        store: 'actors',
        endpoint: 'actor',
        params: {
          page: route.params.page || 1
        }
      });
    },

    computed: {
      actors() {
        return this.$store.state.actors;
      }
    }
  }
</script>
