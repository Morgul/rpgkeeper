<!----------------------------------------------------------------------------------------------------------------------
  -- Character Portrait
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-img
        id="portrait"
        class="shadow-sm"
        :class="portraitClass"
        :src="url"
        :style="{ 'background-color': color }"
        thumbnail
    >
    </b-img>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #portrait {
        flex: 0 1 auto;
        min-width: 100px;
        min-height: 100px;
        max-width: 100px;
        max-height: 150px;
        overflow: hidden;

        // Auto-sizing
        @media(min-width: 960px)
        {
            min-width: 200px;
            max-width: 200px;
            max-height: 300px;
        }

        @media(min-width: 1140px)
        {
            min-width: 300px;
            max-width: 300px;
            max-height: 450px;
        }

        // Fixed Sizing
        &.portrait-sm {
            min-width: 100px !important;
            max-width: 100px !important;
            max-height: 150px !important;
        }

        &.portrait-md {
            min-width: 200px !important;
            max-width: 200px !important;
            max-height: 300px !important;

            @media(max-width: 959px)
            {
                min-width: 100px !important;
                max-width: 100px !important;
                max-height: 150px !important;
            }
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'CharacterPortrait',
        props: {
            src: {
                type: String,
                default: '/static/images/portraitPlaceholder.png'
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            size: {
                type: String,
                default: 'auto'
            }
        },
        computed: {
            portraitClass() { return `portrait-${ this.size }`; },
            url() { return this.src || '/static/images/portraitPlaceholder.png'; }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
