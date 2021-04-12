<!----------------------------------------------------------------------------------------------------------------------
  -- FATE Consequences
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="fate-consequences" :class="{ readonly: readonly }" fill no-body>
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="skull-crossbones"></fa>
                <span class="d-none d-md-inline">Consequences</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEdit()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Content -->
        <table class="table table-bordered mb-0 font-sm">
            <tr>
                <td class="text-right text-nowrap" style="width: 1%">
                    <b>2</b>
                </td>
                <td style="min-width: 80px" :colspan="hasExtraMild ? 1 : 2">
                    <span v-if="mildConsequence1.detail">
                        {{ mildConsequence1.detail }}
                        <small v-if="mildConsequence1.healing"><i>(Healing)</i></small>
                    </span>
                    <span v-else class="text-muted">Mild</span>
                </td>
                <td v-if="hasExtraMild" style="min-width: 80px">
                    <span v-if="mildConsequence2.detail">
                        {{ mildConsequence2.detail }}
                        <small v-if="mildConsequence2.healing"><i>(Healing)</i></small>
                    </span>
                    <span v-else class="text-muted">Mild ({{ extraMildType }})</span>
                </td>
            </tr>
            <tr>
                <td class="text-right text-nowrap" style="width: 1%">
                    <b>4</b>
                </td>
                <td style="min-width: 80px" colspan="2">
                    <span v-if="moderateConsequence.detail">
                        {{ moderateConsequence.detail }}
                        <small v-if="moderateConsequence.healing"><i>(Healing)</i></small>
                    </span>
                    <span v-else class="text-muted">Moderate</span>
                </td>
            </tr>
            <tr>
                <td class="text-right text-nowrap" style="width: 1%">
                    <b>6</b>
                </td>
                <td style="min-width: 80px" colspan="2">
                    <span v-if="severeConsequence.detail">
                        {{ severeConsequence.detail }}
                        <small v-if="severeConsequence.healing"><i>(Healing)</i></small>
                    </span>
                    <span v-else class="text-muted">Severe</span>
                </td>
            </tr>
        </table>

        <!-- Modals -->
        <edit-consequences-modal ref="editModal"></edit-consequences-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #fate-consequences {
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
    import EditConsequencesModal from './editConsequencesModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'FateConsequencesCard',
        components: {
            RpgkCard,
            EditConsequencesModal
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            character: charMan.selected$
        },
        computed: {
            hasExtraMild() { return this.extraMildType !== 'none'; },
            consequences() { return _.filter(this.character.details.aspects, { type: 'consequence' }); },
            mildConsequence1() { return _.filter(this.consequences, { value: 2 })[0] || { detail: '', healing: false, value: 2 }; },
            mildConsequence2() { return _.filter(this.consequences, { value: 2 })[1] || { detail: '', healing: false, value: 2 }; },
            moderateConsequence() { return _.filter(this.consequences, { value: 4 })[0] || { detail: '', healing: false, value: 4 }; },
            severeConsequence() { return _.filter(this.consequences, { value: 6 })[0] || { detail: '', healing: false, value: 6 }; },
            extraMildType()
            {
                const will = _.find(this.character.details.skills, { name: 'Will' });
                const physique = _.find(this.character.details.skills, { name: 'Physique' });

                if((physique && physique.rank >= 5) && (will && will.rank >= 5))
                {
                    return 'Mental and Physical';
                }
                else if(physique && physique.rank >= 5)
                {
                    return 'Physical';
                }
                else if(will && will.rank >= 5)
                {
                    return 'Mental';
                }
                else
                {
                    return 'none';
                } // end if
            }
        },
        methods: {
            openEdit()
            {
                // Open the dialog
                this.$refs.editModal.show();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
