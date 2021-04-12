<!----------------------------------------------------------------------------------------------------------------------
  -- Genesys Talents
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div id="genesys-sub-talents">
        <tier-row :tier="1"></tier-row>
        <tier-row class="mt-3" :tier="2"></tier-row>
        <tier-row class="mt-3" :tier="3"></tier-row>
        <tier-row class="mt-3" :tier="4"></tier-row>
        <tier-row class="mt-3" :tier="5"></tier-row>

        <h5 v-if="talents.length === 0" class="m-0 text-center">
            No Talents
        </h5>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #genesys-sub-talents {
        .talent-row {
            margin-top: -0.5rem;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../../api/managers/character';

    // Components
    import TierRow from './tierRow.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'GenesysSubTalents',
        components: {
            TierRow
        },
        subscriptions: {
            character: charMan.selected$
        },
        computed: {
            talents()
            {
                return this.character.details.talents;
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
