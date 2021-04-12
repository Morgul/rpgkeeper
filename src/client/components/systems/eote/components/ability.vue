<!----------------------------------------------------------------------------------------------------------------------
  -- ability.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <span class="eote-ability">
        <b-badge :id="`ability-${ id }`">
            {{ abilityName }}
        </b-badge>
        <b-popover :title="abilityName" :target="`ability-${ id }`" triggers="hover" placement="top">
            <div :class="`${ mode }-system`">
                <markdown-block :text="abilityText" inline></markdown-block>
                <reference v-if="abilityReference" class="float-right mt-2 mb-2" :reference="abilityReference"></reference>
            </div>
        </b-popover>
    </span>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .eote-ability {
        cursor: pointer;

        & + .eote-ability {
            margin-left: 0.25rem;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import eoteMan from '../../../../api/managers/eote';

    // Components
    import Reference from '../../../character/reference.vue';
    import MarkdownBlock from '../../../ui/markdown';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EoteAbility',
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
                mode: eoteMan.mode$,
                abilities: eoteMan.abilities$
            };
        },
        computed: {
            passive()
            {
                return this.ability && this.ability.passive;
            },
            ability()
            {
                return this.abilities.filter((ability) => ability.id === this.id)[0];
            },
            abilityName()
            {
                if(this.ability)
                {
                    return `${ this.ability.name }`;
                }
                else
                {
                    return 'Unknown';
                } // end if
            },
            abilityText()
            {
                if(this.ability && this.ability.description)
                {
                    return this.ability.description;
                }
                else
                {
                    return 'Unknown ability.';
                } // end if
            },
            abilityReference()
            {
                if(this.ability && this.ability.reference)
                {
                    return this.ability.reference;
                } // end if

                return '';
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
