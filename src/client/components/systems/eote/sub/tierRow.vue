<!----------------------------------------------------------------------------------------------------------------------
  -- tierRow.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="tier-row">
        <h6>
            Tier {{ tier }} ({{ talents.length }} / {{ maxTalents }})
        </h6>
        <div v-if="(talents.length > 0) || (talentPlaceholders.length > 0)" class="d-flex flex-wrap" style="margin-top: -0.5rem">
            <talent-card v-for="talentInst in talents" :key="talentInst.id" class="mr-2 mt-2 flex-fill" :talent="talentInst"></talent-card>
            <talent-placeholder v-for="(_, index) in talentPlaceholders" :key="index" class="mr-2 mt-2 flex-fill"></talent-placeholder>
        </div>
        <div v-else class="text-muted">
            No tier {{ tier }} talents.
        </div>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .tier-row {
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
    import TalentPlaceholder from '../components/talentPlaceholder.vue';

    // Utils
    import { sortBy } from '../../../../../server/utils/misc';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'TalentTierRow',
        components: {
            TalentCard,
            TalentPlaceholder
        },
        props: {
            tier: {
                type: Number,
                required: true
            }
        },
        subscriptions()
        {
            return {
                character: charMan.selected$,
                mode: eoteMan.mode$
            };
        },
        computed: {
            allTalents()
            {
                return this.character.details.talents
                    .map((talentInst) =>
                    {
                        const talentBase = eoteMan.talents.find(({ id }) => id === talentInst.id);
                        return {
                            ...talentInst,
                            name: talentBase?.name,
                            base: talentBase
                        };
                    })
                    .sort(sortBy('name'));
            },
            talents()
            {
                return this.allTalents
                    .filter((talentInst) => talentInst?.base?.tier === this.tier);
            },
            talentPlaceholders()
            {
                const placeholders = [];
                placeholders.length = Math.max(this.maxTalents - this.talents.length, 0);
                return placeholders;
            },
            maxTalents()
            {
                if(this.tier === 1)
                {
                    return this.talents.length + 1;
                }
                else
                {
                    const priorTalents = this.allTalents
                        .filter((talentInst) => talentInst?.base?.tier === (this.tier - 1));

                    return Math.max(priorTalents.length - 1, 0);
                }
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
