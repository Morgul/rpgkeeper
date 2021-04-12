<!----------------------------------------------------------------------------------------------------------------------
  -- Note Page
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <markdown id="note-page" :text="pageContent" :class="`${ system }-system`"></markdown>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #note-page {
        & > p:first-child {
            margin-top: 0;
        }

        & > p:last-child {
            margin-bottom: 0;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import marked from 'marked';

    // Managers
    import charMan from '../../api/managers/character';

    // Components
    import markdown from '../ui/markdown.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        components: {
            markdown
        },
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        subscriptions()
        {
            return {
                char: charMan.selected$
            };
        },
        computed: {
            system()
            {
                return this.char.system;
            },
            pageContent()
            {
                return marked(this.content);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
