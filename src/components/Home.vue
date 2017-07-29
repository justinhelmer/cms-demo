<template>
    <div id="home" class="content">
        <h1>Welcome</h1>

        <div class="tiles">
            <div>
                <router-link :to="{ name: 'videos' }" class="link">
                    <div class="icon fa fa-video-camera fa-5x"></div>
                    <h2 class="icon-text">Videos</h2>
                </router-link>
            </div>
            <div>
                <router-link :to="{ name: 'photos' }" class="link">
                    <div class="icon fa fa-camera fa-5x"></div>
                    <h2 class="icon-text">Photos</h2>
                </router-link>
            </div>
            <div>
                <router-link :to="{ name: 'magazines' }" class="link">
                    <div class="icon fa fa-file-pdf-o fa-5x"></div>
                    <h2 class="icon-text">Magazines</h2>
                </router-link>
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

    $blue: get-color(blue);
    $gray: get-color(gray);

    .tiles {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        & > div {
            margin: 0 $global-margin $global-margin;
            flex-grow: 1;

            a {
                display: block;
                text-align: center;
            }
        }
    }

    .link {
        color: $blue;
        display: inline-block;
    }

    .icon {
        background: $gray;
        padding: rem-calc(60);
        width: rem-calc(200);
    }

    .icon-text {
        margin: 0;
        padding: rem-calc(5);
        text-align: center;
    }

    @include breakpoint(small only) {
        .icon-text{
            display: none;
        }
    }
</style>