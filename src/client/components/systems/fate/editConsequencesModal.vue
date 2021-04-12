<!----------------------------------------------------------------------------------------------------------------------
  -- EditConsequenceModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-consequences-modal">
        <b-modal
            ref="modal"
            header-bg-variant="dark"
            header-text-variant="white"
            no-close-on-esc
            no-close-on-backdrop
            size="lg"
            @ok="onSave"
            @shown="onShown"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <fa icon="file-edit"></fa>
                Edit Consequence
            </template>

            <!-- Modal Content -->
            <b-form-group
                id="mild-consequence-1"
                label="Mild Consequence (2)"
                label-class="font-weight-bold"
                label-for="mc-input-1"
            >
                <div class="d-flex">
                    <b-input-group>
                        <b-form-input id="mc-input-1" v-model="mildDetail1"></b-form-input>
                        <b-input-group-append>
                            <b-button @click="mildDetail1 = ''">
                                <fa icon="times"></fa>
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <b-button class="ml-2 text-nowrap" :pressed.sync="mildHealing1" :disabled="!mildDetail1">
                        <fa :icon="mildHealing1 ? 'check-square' : [ 'far', 'square' ]"></fa>
                        Healing
                    </b-button>
                </div>
            </b-form-group>
            <b-form-group
                v-if="hasExtraMild"
                id="mild-consequence-2"
                :label="`Mild Consequence (2, ${ extraMildType })`"
                label-class="font-weight-bold"
                label-for="mc-input-2"
            >
                <div class="d-flex">
                    <b-input-group>
                        <b-form-input id="mc-input-2" v-model="mildDetail2"></b-form-input>
                        <b-input-group-append>
                            <b-button @click="mildDetail2 = ''">
                                <fa icon="times"></fa>
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <b-button class="ml-2 text-nowrap" :pressed.sync="mildHealing2" :disabled="!mildDetail2">
                        <fa :icon="mildHealing2 ? 'check-square' : [ 'far', 'square' ]"></fa>
                        Healing
                    </b-button>
                </div>
            </b-form-group>
            <b-form-group
                id="moderate-consequence"
                label="Moderate Consequence (4)"
                label-class="font-weight-bold"
                label-for="mc-input"
            >
                <div class="d-flex">
                    <b-input-group>
                        <b-form-input id="mc-input" v-model="moderateDetail"></b-form-input>
                        <b-input-group-append>
                            <b-button @click="moderateDetail = ''">
                                <fa icon="times"></fa>
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <b-button class="ml-2 text-nowrap" :pressed.sync="moderateHealing" :disabled="!moderateDetail">
                        <fa :icon="moderateHealing ? 'check-square' : [ 'far', 'square' ]"></fa>
                        Healing
                    </b-button>
                </div>
            </b-form-group>
            <b-form-group
                id="severe-consequence"
                label="Severe Consequence (6)"
                label-class="font-weight-bold"
                label-for="sc-input"
            >
                <div class="d-flex">
                    <b-input-group>
                        <b-form-input id="sc-input" v-model="severeDetail"></b-form-input>
                        <b-input-group-append>
                            <b-button @click="severeDetail = ''">
                                <fa icon="times"></fa>
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <b-button class="ml-2 text-nowrap" :pressed.sync="severeHealing" :disabled="!severeDetail">
                        <fa :icon="severeHealing ? 'check-square' : [ 'far', 'square' ]"></fa>
                        Healing
                    </b-button>
                </div>
            </b-form-group>

            <!-- Modal Buttons -->
            <template slot="modal-ok">
                <fa icon="save"></fa>
                Save
            </template>
            <template slot="modal-cancel">
                <fa icon="times"></fa>
                Cancel
            </template>
        </b-modal>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    .edit-consequences-modal {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../api/managers/character';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditConsequenceModal',
        subscriptions: {
            character: charMan.selected$
        },
        data()
        {
            return {
                mildDetail1: '',
                mildDetail2: '',
                moderateDetail: '',
                severeDetail: '',
                mildHealing1: false,
                mildHealing2: false,
                moderateHealing: false,
                severeHealing: false
            };
        },
        computed: {
            hasExtraMild() { return this.extraMildType !== 'none'; },
            consequences() { return _.filter(this.character.details.aspects, { type: 'consequence' }); },
            mildConsequence1() { return _.filter(this.consequences, { value: 2 })[0] || { type: 'consequence', detail: '', healing: false, value: 2 }; },
            mildConsequence2() { return _.filter(this.consequences, { value: 2 })[1] || { type: 'consequence', detail: '', healing: false, value: 2 }; },
            moderateConsequence() { return _.filter(this.consequences, { value: 4 })[0] || { type: 'consequence', detail: '', healing: false, value: 4 }; },
            severeConsequence() { return _.filter(this.consequences, { value: 6 })[0] || { type: 'consequence', detail: '', healing: false, value: 6 }; },
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
            async onSave()
            {
                // Filter out any consequences that are now empty.
                const consequences = [
                    { ...this.mildConsequence1, detail: this.mildDetail1, healing: this.mildHealing1 },
                    { ...this.mildConsequence2, detail: this.mildDetail2, healing: this.mildHealing2 },
                    { ...this.moderateConsequence, detail: this.moderateDetail, healing: this.moderateHealing },
                    { ...this.severeConsequence, detail: this.severeDetail, healing: this.severeHealing }
                ].filter((consequence) => !!consequence.detail);

                // Pull out aspects, remove all consequences, and then re-add them.
                let aspects = this.character.details.aspects.filter((aspect) => aspect.type !== 'consequence');
                aspects = aspects.concat(consequences);

                // Add them back to the character
                this.character.details.aspects = aspects;

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                // Reset the edit fields
                this.mildDetail1 = this.mildConsequence1.detail;
                this.mildDetail2 = this.mildConsequence2.detail;
                this.moderateDetail = this.moderateConsequence.detail;
                this.severeDetail = this.severeConsequence.detail;
                this.mildHealing1 = this.mildConsequence1.healing;
                this.mildHealing2 = this.mildConsequence2.healing;
                this.moderateHealing = this.moderateConsequence.healing;
                this.severeHealing = this.severeConsequence.healing;
            },

            show()
            {
                this.$refs.modal.show();
            },
            hide()
            {
                this.$refs.modal.hide();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
