<!----------------------------------------------------------------------------------------------------------------------
  -- EditCharacteristicsModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-characteristics-modal">
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
                Edit Characteristics
            </template>

            <!-- Modal Content -->
            <b-form-row>
                <b-col v-for="char in characteristicNames.slice(0, 3)" :key="char">
                    <b-form-group
                        :label="startCase(char)"
                        label-class="font-weight-bold"
                        :label-for="`${ char }-input`"
                    >
                        <div class="d-flex">
                            <b-input-group>
                                <b-form-input
                                    :id="`${ char }-input`"
                                    v-model.number="characteristics[char]"
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="99"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-button @click="characteristics[char] = 0">
                                        <fa icon="undo"></fa>
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </div>
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-form-row>
                <b-col v-for="char in characteristicNames.slice(3)" :key="char">
                    <b-form-group
                        :label="startCase(char)"
                        label-class="font-weight-bold"
                        :label-for="`${ char }-input`"
                    >
                        <div class="d-flex">
                            <b-input-group>
                                <b-form-input
                                    :id="`${ char }-input`"
                                    v-model.number="characteristics[char]"
                                    type="number"
                                    step="1"
                                    min="0"
                                    max="99"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-button @click="characteristics[char] = 0">
                                        <fa icon="undo"></fa>
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </div>
                    </b-form-group>
                </b-col>
            </b-form-row>

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
    .edit-characteristics-modal {
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
        name: 'EditCharacteristicsModal',
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                characteristics: {
                    brawn: 0,
                    agility: 0,
                    intellect: 0,
                    cunning: 0,
                    willpower: 0,
                    presence: 0
                }
            };
        },
        computed: {
            characteristicNames()
            {
                return [
                    'brawn',
                    'agility',
                    'intellect',
                    'cunning',
                    'willpower',
                    'presence'
                ];
            }
        },
        methods: {
            startCase(text)
            {
                return _.startCase(text);
            },
            async onSave()
            {
                Object.assign(this.character.details.characteristics, this.characteristics);

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                // Reset the edit fields
                Object.assign(this.characteristics, this.character.details.characteristics);
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
