<!----------------------------------------------------------------------------------------------------------------------
  -- reference.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="eote-reference" :class="{ inline: isInline }">
        <span class="name">{{ name }}</span>
        <span v-if="page">, p{{ page }}</span>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .eote-reference {
        font-size: 0.8rem;
        font-style: italic;

        &.inline {
            display: inline-block;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import eoteManager from '../../api/managers/eote';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotEReference',
        props: {
            reference: {
                type: String,
                required: true
            },
            inline: {
                type: [ Boolean, String ],
                default: false
            }
        },
        subscriptions: {
            references: eoteManager.references$
        },
        computed: {
            isInline()
            {
                return this.inline !== false || this.inline !== 'false';
            },
            abbr()
            {
                return this.reference.split(':')[0];
            },
            page()
            {
                return this.reference.split(':')[1];
            },
            name()
            {
                return this.refObj && this.refObj.name;
            },
            refObj()
            {
                return this.references
                    .filter((ref) => ref.abbr === this.abbr)[0];
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
