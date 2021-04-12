<!----------------------------------------------------------------------------------------------------------------------
  -- markdown
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="markdown" :class="block ? '' : 'd-inline-block'" v-html="renderedContent"></div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    .markdown {
        p:last-child {
            margin-bottom: 0;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import marked from 'marked';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'MarkdownBlock',
        props: {
            text: {
                type: String,
                required: true
            },
            block: {
                type: Boolean,
                default: false
            },
            inline: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            renderedContent()
            {
                let rawMarkup = marked(this.text);

                if(this.inline !== false)
                {
                    rawMarkup = rawMarkup.trim().replace(/^(?:<p>)?(.*?)(?:<\/p>)?$/, '$1');
                } // end if

                return rawMarkup;
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
