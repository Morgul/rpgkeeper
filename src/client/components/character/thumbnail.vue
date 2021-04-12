<!----------------------------------------------------------------------------------------------------------------------
  -- Thumbnail
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="char-thumbnail">
        <b-img
            :src="src"
            width="64px"
            height="64px"
            rounded="circle"
            :blank="!src"
            :blank-color="color"
            thumbnail
            class="shadow-sm"
            :style="{ 'background-color': color }"
        >
        </b-img>
        <div v-if="!src" class="char-text">
            {{ text }}
        </div>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .char-thumbnail {
        position: relative;
        display: inline-block;

        .char-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;
            text-align: center;

            font-size: 2rem;
            color: black;
        }

        img {
            border: none !important;
            width: 64px;
            height: 64px;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    export default {
        name: 'CharacterThumbnail',
        props: {
            color: {
                type: String,
                default: '#ffffff'
            },
            src: {
                type: String,
                default: undefined
            },
            text: {
                type: String,
                required: true
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
