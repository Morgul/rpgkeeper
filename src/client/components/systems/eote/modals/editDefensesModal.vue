<!----------------------------------------------------------------------------------------------------------------------
  -- EditDefensesModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-defenses-modal">
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
                Edit Defenses
            </template>

            <!-- Modal Content -->
            <div class="d-flex">
                <b-form-group
                    class="flex-fill"
                    label="Soak"
                    label-class="font-weight-bold"
                    label-for="soak-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="soak-input" v-model.number="defenses.soak" type="number" min="0" max="10" step="1"></b-form-input>
                            <b-input-group-append>
                                <b-button @click="defenses.soak = 0">
                                    <fa icon="times"></fa>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </b-form-group>

                <b-form-group
                    class="flex-fill ml-2"
                    label="Melee"
                    label-class="font-weight-bold"
                    label-for="melee-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="melee-input" v-model.number="defenses.melee" type="number" min="0" max="10" step="1"></b-form-input>
                            <b-input-group-append>
                                <b-button @click="defenses.melee = 0">
                                    <fa icon="times"></fa>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </b-form-group>

                <b-form-group
                    class="flex-fill ml-2"
                    label="Ranged"
                    label-class="font-weight-bold"
                    label-for="ranged-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="ranged-input" v-model.number="defenses.ranged" type="number" min="0" max="10" step="1"></b-form-input>
                            <b-input-group-append>
                                <b-button @click="defenses.ranged = 0">
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
    .edit-defenses-modal {
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
        name: 'EditDefensesModal',
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                defenses: {
                    soak: 0,
                    melee: 0,
                    ranged: 0
                }
            };
        },
        methods: {
            async onSave()
            {
                this.character.details.defenses = _.cloneDeep(this.defenses);

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                // Reset the edit fields
                this.defenses = _.cloneDeep(this.character.details.defenses);
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
