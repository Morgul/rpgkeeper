<!----------------------------------------------------------------------------------------------------------------------
  -- EditWoundsModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-health-modal">
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
                Edit Wounds
            </template>

            <!-- Modal Content -->
            <div class="d-flex">
                <b-form-group
                    class="flex-fill"
                    label="Wounds"
                    label-class="font-weight-bold"
                    label-for="wounds-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="wounds-input" v-model.number="health.wounds" type="number" min="0" max="99" step="1"></b-form-input>
                            <b-input-group-append>
                                <b-button @click="health.wounds = 0">
                                    <fa icon="times"></fa>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </b-form-group>

                <b-form-group
                    class="flex-fill ml-2"
                    label="Wound Threshold"
                    label-class="font-weight-bold"
                    label-for="wound-threshold-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="wound-threshold-input" v-model.number="health.woundThreshold" type="number" min="0" max="99" step="1"></b-form-input>
                            <b-input-group-append>
                                <b-button @click="health.woundThreshold = 0">
                                    <fa icon="times"></fa>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </b-form-group>

                <b-form-group
                    class="flex-fill ml-4"
                    label="Strain"
                    label-class="font-weight-bold"
                    label-for="strain-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="strain-input" v-model.number="health.strain" type="number" min="0" max="99" step="1"></b-form-input>
                            <b-input-group-append>
                                <b-button @click="health.strain = 0">
                                    <fa icon="times"></fa>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </b-form-group>

                <b-form-group
                    class="flex-fill ml-2"
                    label="Strain Threshold"
                    label-class="font-weight-bold"
                    label-for="strain-threshold-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="strain-threshold-input" v-model.number="health.strainThreshold" type="number" min="0" max="99" step="1"></b-form-input>
                            <b-input-group-append>
                                <b-button @click="health.strainThreshold = 0">
                                    <fa icon="times"></fa>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </b-form-group>
            </div>

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
    .edit-health-modal {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../../api/managers/character';
    import eoteMan from '../../../../api/managers/eote';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditWoundsModal',
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                health: {
                    wounds: 0,
                    woundThreshold: 0,
                    strain: 0,
                    strainThreshold: 0
                }
            };
        },
        methods: {
            async onSave()
            {
                this.character.details.health = _.cloneDeep(this.health);

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                // Reset the edit fields
                this.health = _.cloneDeep(this.character.details.health);
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
