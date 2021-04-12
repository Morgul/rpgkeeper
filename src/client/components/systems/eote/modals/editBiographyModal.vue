<!----------------------------------------------------------------------------------------------------------------------
  -- EditBiographyModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-biography-modal">
        <b-modal
            ref="modal"
            header-bg-variant="dark"
            header-text-variant="white"
            no-close-on-esc
            no-close-on-backdrop
            size="xl"
            @ok="onSave"
            @shown="onShown"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <fa icon="file-edit"></fa>
                Edit Biography
            </template>

            <!-- Modal Content -->
            <div :class="`${ mode }-system`">
                <b-form-row>
                    <b-col>
                        <b-form-group
                            label="Name"
                            label-class="font-weight-bold"
                            label-for="name-input"
                        >
                            <b-form-input id="name-input" v-model="name"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group
                            label="Description"
                            label-class="font-weight-bold"
                            label-for="description-input"
                        >
                            <b-form-input id="description-input" v-model="description"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col>
                        <b-form-group
                            label="Species"
                            label-class="font-weight-bold"
                            label-for="species-input"
                        >
                            <div class="d-flex">
                                <b-input-group>
                                    <b-form-input id="species-input" v-model="species"></b-form-input>
                                    <b-input-group-append>
                                        <b-button @click="species = ''">
                                            <fa icon="times"></fa>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col v-if="mode === 'eote'" cols="auto">
                        <b-form-group
                            label="Force Sensitive"
                            label-class="font-weight-bold"
                            label-for="species-input"
                            label-sr-only
                        >
                            <b-form-checkbox v-model="forceSensitive" style="margin-top: 2.4rem" name="force-sensitive" switch>
                                Force Sensitive
                            </b-form-checkbox>
                        </b-form-group>
                    </b-col>
                </b-form-row>

                <b-form-row>
                    <b-col xs="12">
                        <b-form-group
                            label="Career"
                            label-class="font-weight-bold"
                            label-for="career-input"
                        >
                            <div class="d-flex">
                                <b-input-group>
                                    <b-form-input id="career-input" v-model="career"></b-form-input>
                                    <b-input-group-append>
                                        <b-button @click="career = ''">
                                            <fa icon="times"></fa>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col v-if="mode === 'eote'" xs="12">
                        <b-form-group
                            label="Specializations"
                            label-class="font-weight-bold"
                            label-for="special-input"
                        >
                            <div class="d-flex">
                                <b-input-group>
                                    <b-form-input id="special-input" v-model="specialization"></b-form-input>
                                    <b-input-group-append>
                                        <b-button @click="specialization = ''">
                                            <fa icon="times"></fa>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </div>
                        </b-form-group>
                    </b-col>
                </b-form-row>

                <supplement-select
                    ref="suppSelect"
                    label="Abilities"
                    label-class="font-weight-bold"
                    :available="abilities"
                    :selected="selectedAbilities"
                    @add="onAbilityAdd"
                    @remove="onAbilityRemove"
                    @new="onAbilityNew"
                    @edit="onAbilityEdit"
                    @delete="onAbilityDelete"
                >
                </supplement-select>
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

        <!-- Modals -->
        <add-edit-ability-modal ref="addEditAbilityModal" @add="onAbilityAdd"></add-edit-ability-modal>
        <delete-modal
            ref="delAbilityModal"
            :name="delAbility.name"
            type="ability"
            @hidden="onDelAbilityHidden"
            @delete="onDelAbilityDelete"
        ></delete-modal>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    .edit-biography-modal {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../../api/managers/character';
    import eoteMan from '../../../../api/managers/eote';

    // Components
    import SupplementSelect from '../../../character/supplementSelect.vue';
    import AddEditAbilityModal from './addEditAbilityModal.vue';
    import DeleteModal from '../../../ui/deleteModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditBiographyModal',
        components: {
            AddEditAbilityModal,
            DeleteModal,
            SupplementSelect
        },
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$,
            abilities: eoteMan.abilities$
        },
        data()
        {
            return {
                name: '',
                description: '',
                career: '',
                species: '',
                specialization: '',
                forceSensitive: false,
                selectedAbilities: [],
                delAbility: {
                    id: undefined,
                    name: undefined
                }
            };
        },
        methods: {
            async onSave()
            {
                // Ensure character has the right structure
                if(!this.character.details.force)
                {
                    this.character.details.force = { rating: 0, committed: 0, powers: [] };
                } // end if

                this.character.details.career = this.career;
                this.character.details.species = this.species;
                this.character.details.specialization = this.specialization;
                this.character.details.force.sensitive = this.forceSensitive;
                this.character.details.abilities = this.selectedAbilities;

                this.character.name = this.name;
                this.character.description = this.description;

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                // Ensure character has the right structure
                if(!this.character.details.force)
                {
                    this.character.details.force = { rating: 0, committed: 0, powers: [] };
                } // end if

                // Reset the edit fields
                this.name = this.character.name;
                this.description = this.character.description;
                this.career = this.character.details.career;
                this.species = this.character.details.species;
                this.specialization = this.character.details.specialization;
                this.forceSensitive = !!this.character.details.force.sensitive;
                this.selectedAbilities = this.character.details.abilities.concat();
            },
            onAbilityAdd(ability)
            {
                this.selectedAbilities.push(ability.id);
                this.selectedAbilities = _.uniq(this.selectedAbilities);
            },
            onAbilityRemove(ability)
            {
                this.selectedAbilities = _.without(this.selectedAbilities, ability.id);
            },
            onAbilityNew()
            {
                this.$refs.addEditAbilityModal.show();
            },
            onAbilityEdit(ability)
            {
                this.$refs.addEditAbilityModal.show(ability);
            },
            onAbilityDelete(ability)
            {
                this.delAbility.id = ability.id;
                this.delAbility.name = ability.name;

                this.$refs.delAbilityModal.show();
            },
            onDelAbilityHidden()
            {
                this.delAbility.id = '';
                this.delAbility.name = '';
            },
            async onDelAbilityDelete()
            {
                this.$refs.suppSelect.clearSelection();
                this.selectedAbilities = _.without(this.selectedAbilities, this.delAbility.id);
                this.character.details.abilities = this.selectedAbilities;

                return Promise.all([
                    await charMan.save(this.character),
                    await eoteMan.delSup('abilities', this.delAbility)
                ]);
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
