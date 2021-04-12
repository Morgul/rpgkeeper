<!----------------------------------------------------------------------------------------------------------------------
  -- motivation
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="genesys-motivation d-inline-block">
        <b-badge :id="uniqueID">
            {{ motivationName }}
        </b-badge>
        <b-popover :title="motivationName" :target="uniqueID" triggers="hover" placement="top">
            <div :class="`genesys-system`">
                <markdown-block :text="motivationText" inline></markdown-block>
                <reference
                    v-if="motivationReference"
                    class="float-right mt-2 mb-2"
                    :reference="motivationReference"
                ></reference>
            </div>
        </b-popover>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .genesys-motivation {
        cursor: pointer;
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
//------------------------------------------------------------------------------------------------------------------

    import { v4 } from 'uuid';

    // Managers
    import eoteMan from '../../../../api/managers/eote';

    // Components
    import Reference from '../../../character/reference.vue';
    import MarkdownBlock from '../../../ui/markdown';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'GenesysMotivation',
        components: { MarkdownBlock, Reference },
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        subscriptions()
        {
            return {
                motivations: eoteMan.motivations$
            };
        },
        data()
        {
            return {
                uniqueID: v4()
            };
        },
        computed: {
            motivation()
            {
                return this.motivations.filter((motivation) => motivation.id === this.id)[0];
            },
            motivationName()
            {
                let text = 'Unknown';

                if(this.motivation)
                {
                    text = `${ this.motivation.name }`;
                    if(this.motivation.ranked)
                    {
                        text += ` ${ this.ranks }`;
                    } // end if
                } // end if

                return text;
            },
            motivationText()
            {
                if(this.motivation && this.motivation.description)
                {
                    return this.motivation.description;
                }
                else
                {
                    return 'Unknown motivation.';
                } // end if
            },
            motivationReference()
            {
                if(this.motivation && this.motivation.reference)
                {
                    return this.motivation.reference;
                } // end if

                return '';
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
