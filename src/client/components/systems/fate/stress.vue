<!----------------------------------------------------------------------------------------------------------------------
  -- FateStress
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="fate-stress" :class="{ readonly: readonly }" no-body fill>
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="heart-circle"></fa>
                <span class="d-none d-md-inline">Physical Stress</span>
            </h5>
        </div>

        <!-- Content -->
        <table class="table stress-table table-bordered mb-0">
            <tr>
                <td v-for="(stressBox, index) in [ 1, 2, 3, 4 ]" :key="stressBox">
                    <b-form-checkbox v-model="physicalStress[index]" class="mr-1" :value="true" :disabled="stressBox > totalPhysicalBoxes" @input="onInput">
                        <b>{{ stressBox }}</b>
                    </b-form-checkbox>
                </td>
            </tr>
        </table>

        <div class="card-header bg-dark text-white">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="head-side-brain"></fa>
                <span class="d-none d-md-inline">Mental Stress</span>
            </h5>
        </div>
        <table class="table stress-table table-bordered mb-0">
            <tr>
                <td v-for="(stressBox, index) in [ 1, 2, 3, 4 ]" :key="stressBox">
                    <b-form-checkbox v-model="mentalStress[index]" class="mr-1" :value="true" :disabled="stressBox > totalMentalBoxes" @input="onInput">
                        <b>{{ stressBox }}</b>
                    </b-form-checkbox>
                </td>
            </tr>
        </table>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #fate-stress {
        min-width: 245px;

        .stress-table {
            border: none;

            tr {
                border-top: none;
                border-bottom: none;

                td:first-child {
                    border-left: none;
                }

                td:last-child {
                    border-right: none;
                }

                td {
                    border-bottom: none;
                }
            }
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import RpgkCard from '../../ui/card.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'FateSkillsCard',
        components: {
            RpgkCard
        },
        props: {
            value: {
                type: Object,
                required: true
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            character() { return _.get(this.value, 'details'); },
            mentalStress() { return this.character.mentalStress; },
            physicalStress() { return this.character.physicalStress; },
            totalPhysicalBoxes()
            {
                const physique = _.find(this.character.skills, { name: 'Physique' });
                if(physique && physique.rank >= 1 && physique.rank < 3)
                {
                    return 3;
                }
                else if(physique && physique.rank >= 3)
                {
                    return 4;
                }
                else
                {
                    return 2;
                } // end if
            },
            totalMentalBoxes()
            {
                const will = _.find(this.character.skills, { name: 'Will' });
                if(will && will.rank >= 1 && will.rank < 3)
                {
                    return 3;
                }
                else if(will && will.rank >= 3)
                {
                    return 4;
                }
                else
                {
                    return 2;
                } // end if
            }
        },
        methods: {
            async onInput()
            {
                // Save the character
                await charMan.save(charMan.selected);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
