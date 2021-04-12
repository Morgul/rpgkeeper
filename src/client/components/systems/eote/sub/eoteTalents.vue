<!----------------------------------------------------------------------------------------------------------------------
  -- EotE Talents
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div id="eote-sub-talents">
        <div class="d-flex flex-wrap" style="margin-top: -0.5rem">
            <talent-card v-for="talentInst in talents" :key="talentInst.id" class="mr-2 mt-2 flex-fill" :talent="talentInst"></talent-card>
        </div>

        <h5 v-if="talents.length === 0" class="m-0 text-center">
            No Talents
        </h5>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #eote-sub-talents {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../../api/managers/character';
    import eoteMan from '../../../../api/managers/eote';

    // Components
    import TalentCard from '../components/talentCard.vue';

    // Utils
    import { sortBy } from '../../../../../server/utils/misc';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EoteSubTalents',
        components: {
            TalentCard
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        computed: {
            talents()
            {
                return this.character.details.talents
                    .map((talentInst) =>
                    {
                        const talentBase = eoteMan.talents.find(({ id }) => id === talentInst.id);
                        return {
                            ...talentInst,
                            name: talentBase?.name
                        };
                    })
                    .sort(sortBy('name'));
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
