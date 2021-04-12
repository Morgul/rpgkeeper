<!----------------------------------------------------------------------------------------------------------------------
  -- EditExperienceModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-experience-modal">
        <b-modal
            ref="modal"
            header-bg-variant="dark"
            header-text-variant="white"
            no-close-on-esc
            no-close-on-backdrop
            size="md"
            @ok="onSave"
            @shown="onShown"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <fa icon="file-edit"></fa>
                Edit Experience
            </template>

            <!-- Modal Content -->
            <b-form-group
                class="flex-fill"
                label="Add XP"
                label-class="font-weight-bold"
                label-for="add-xp-input"
            >
                <div class="d-flex flex-column">
                    <b-input-group>
                        <b-form-input id="add-xp-input" v-model.number="addxp" type="number" min="0" step="1"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="primary" @click="addXP()">
                                <fa icon="plus"></fa>
                                Add
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <p class="text-muted m-0">
                        <small>
                            To gain experience, use this form. It updates both the total, and the available. Just type
                            in the amount gained, and hit 'add'.
                        </small>
                    </p>
                </div>
            </b-form-group>

            <hr class="mt-2 mb-2" />

            <div class="d-flex">
                <b-form-group
                    class="flex-fill"
                    label="Total"
                    label-class="font-weight-bold"
                    label-for="total-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="total-input" v-model.number="experience.total" type="number" min="0" step="1"></b-form-input>
                            <b-input-group-append>
                                <b-button @click="experience.total = 0">
                                    <fa icon="times"></fa>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </b-form-group>

                <b-form-group
                    class="flex-fill ml-2"
                    label="Available"
                    label-class="font-weight-bold"
                    label-for="available-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="available-input" v-model.number="experience.available" type="number" min="0" step="1"></b-form-input>
                            <b-input-group-append>
                                <b-button @click="experience.available = 0">
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
    .edit-experience-modal {
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
        name: 'EditExperienceModal',
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                experience: {
                    total: 0,
                    available: 0
                },
                addxp: 0
            };
        },
        methods: {
            async onSave()
            {
                this.character.details.experience = _.cloneDeep(this.experience);

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                // Reset the edit fields
                this.experience = _.cloneDeep(this.character.details.experience);
            },

            addXP()
            {
                this.experience.total += this.addxp;
                this.experience.available += this.addxp;
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
