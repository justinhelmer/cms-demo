<template>
    <div id="home" class="grid-container grid-container-padded">
        <div class="grid-y">
            <h1>Welcome</h1>

            <div class="tiles grid-x">
                <div class="tile medium-4 cell">
                    <router-link :to="{ name: 'videos' }" class="link">
                        <div class="icon fa fa-video-camera fa-5x"></div>
                        <div class="icon-text">Videos</div>
                    </router-link>
                </div>
                <div class="tile medium-4 cell">
                    <router-link :to="{ name: 'photos' }" class="link">
                        <div class="icon fa fa-camera fa-5x"></div>
                        <div class="icon-text">Photos</div>
                    </router-link>
                </div>
                <div class="tile medium-4 cell">
                    <router-link :to="{ name: 'magazines' }" class="link">
                        <div class="icon fa fa-file-pdf-o fa-5x"></div>
                        <div class="icon-text">Magazines</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style lang="scss" scoped>
    @import '../css/settings.scss';

    $gray: get-color(gray);

    .tile {
        margin-bottom: rem-calc(20);
        text-align: center;
    }

    .link {
        display: inline-block;
        text-align: center;
    }

    .icon {
        background: $gray;
        padding: rem-calc(60);
        width: rem-calc(200);
    }

    .icon-text {
        font-size: rem-calc(22);
        padding: rem-calc(5);
        text-align: center;
    }

    @include breakpoint(small only) {
        .icon-text {
            display: none;
        }
    }
</style>