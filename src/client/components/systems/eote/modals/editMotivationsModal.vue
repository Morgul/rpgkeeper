<!----------------------------------------------------------------------------------------------------------------------
  -- EditMotivationsModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-motivations-modal">
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
                Edit Motivations
            </template>

            <!-- Modal Content -->
            <div class="d-flex">
                <b-card
                    class="flex-fill w-50 mr-1"
                    :border-variant="isStrengthDirty ? 'success' : undefined"
                >
                    <template #header>
                        <div class="d-flex">
                            <h6 class="mt-2 mr-3">
                                Strength
                            </h6>
                            <supplement-search
                                class="w-100"
                                :available="availableStrength"
                                :selected="[ strength ]"
                                @add="onMotivAdd"
                            >
                                <template #append-extra>
                                    <b-button class="ml-2 text-nowrap" variant="success" title="Add New..." @click="addNew('strength')">
                                        <fa icon="plus"></fa>
                                        New
                                    </b-button>
                                </template>
                            </supplement-search>
                        </div>
                    </template>

                    <div v-if="strength">
                        <div v-if="isStrengthDirty" class="float-right">
                            <b-btn size="sm" @click="revert('strength')">
                                <fa icon="undo"></fa>
                                Undo
                            </b-btn>
                        </div>
                        <div v-if="isEditable(strength)" class="float-right">
                            <b-btn size="sm" @click="editMotivation(strength)">
                                <fa icon="edit"></fa>
                                Edit
                            </b-btn>
                            <b-btn variant="danger" size="sm" @click="delMotivation(strength)">
                                <fa icon="trash"></fa>
                                Delete
                            </b-btn>
                        </div>
                        <div class="pt-2">
                            <h5><b>{{ strength.name }}</b></h5>
                            <markdown-block :text="strength.description" block></markdown-block>
                        </div>
                    </div>
                    <h6 v-else class="font-italic">
                        No Strength selected.
                    </h6>
                </b-card>
                <b-card
                    class="flex-fill w-50 ml-1"
                    :border-variant="isFlawDirty ? 'success' : undefined"
                >
                    <template #header>
                        <div class="d-flex">
                            <h6 class="mt-2 mr-3">
                                Flaw
                            </h6>
                            <supplement-search
                                class="w-100"
                                :available="availableFlaw"
                                :selected="[ flaw ]"
                                @add="onMotivAdd"
                            >
                                <template #append-extra>
                                    <b-button class="ml-2 text-nowrap" variant="success" title="Add New..." @click="addNew('flaw')">
                                        <fa icon="plus"></fa>
                                        New
                                    </b-button>
                                </template>
                            </supplement-search>
                        </div>
                    </template>

                    <div v-if="flaw">
                        <div v-if="isFlawDirty" class="float-right">
                            <b-btn size="sm" @click="revert('flaw')">
                                <fa icon="undo"></fa>
                                Undo
                            </b-btn>
                        </div>
                        <div v-if="isEditable(flaw)" class="float-right">
                            <b-btn size="sm" @click="editMotivation(flaw)">
                                <fa icon="edit"></fa>
                                Edit
                            </b-btn>
                            <b-btn variant="danger" size="sm" @click="delMotivation(flaw)">
                                <fa icon="trash"></fa>
                                Delete
                            </b-btn>
                        </div>
                        <div class="pt-2">
                            <h5><b>{{ flaw.name }}</b></h5>
                            <markdown-block :text="flaw.description" block></markdown-block>
                        </div>
                    </div>
                    <h6 v-else class="font-italic">
                        No Flaw selected.
                    </h6>
                </b-card>
            </div>
            <div class="d-flex mt-2">
                <b-card
                    class="flex-fill w-50 mr-1"
                    :border-variant="isDesireDirty ? 'success' : undefined"
                >
                    <template #header>
                        <div class="d-flex">
                            <h6 class="mt-2 mr-3">
                                Desire
                            </h6>
                            <supplement-search
                                class="w-100"
                                :available="availableDesire"
                                :selected="[ desire ]"
                                @add="onMotivAdd"
                            >
                                <template #append-extra>
                                    <b-button class="ml-2 text-nowrap" variant="success" title="Add New..." @click="addNew('desire')">
                                        <fa icon="plus"></fa>
                                        New
                                    </b-button>
                                </template>
                            </supplement-search>
                        </div>
                    </template>

                    <div v-if="desire">
                        <div v-if="isDesireDirty" class="float-right">
                            <b-btn size="sm" @click="revert('desire')">
                                <fa icon="undo"></fa>
                                Undo
                            </b-btn>
                        </div>
                        <div v-if="isEditable(desire)" class="float-right">
                            <b-btn size="sm" @click="editMotivation(desire)">
                                <fa icon="edit"></fa>
                                Edit
                            </b-btn>
                            <b-btn variant="danger" size="sm" @click="delMotivation(desire)">
                                <fa icon="trash"></fa>
                                Delete
                            </b-btn>
                        </div>
                        <div class="pt-2">
                            <h5><b>{{ desire.name }}</b></h5>
                            <markdown-block :text="desire.description" block></markdown-block>
                        </div>
                    </div>
                    <h6 v-else class="font-italic">
                        No Desire selected.
                    </h6>
                </b-card>
                <b-card
                    class="flex-fill w-50 ml-1"
                    :border-variant="isFearDirty ? 'success' : undefined"
                >
                    <template #header>
                        <div class="d-flex">
                            <h6 class="mt-2 mr-3">
                                Fear
                            </h6>
                            <supplement-search
                                class="w-100"
                                :available="availableFear"
                                :selected="[ fear ]"
                                @add="onMotivAdd"
                            >
                                <template #append-extra>
                                    <b-button class="ml-2 text-nowrap" variant="success" title="Add New..." @click="addNew('fear')">
                                        <fa icon="plus"></fa>
                                        New
                                    </b-button>
                                </template>
                            </supplement-search>
                        </div>
                    </template>

                    <div v-if="fear">
                        <div v-if="isFearDirty" class="float-right">
                            <b-btn size="sm" @click="revert('fear')">
                                <fa icon="undo"></fa>
                                Undo
                            </b-btn>
                        </div>
                        <div v-if="isEditable(fear)" class="float-right">
                            <b-btn size="sm" @click="editMotivation(fear)">
                                <fa icon="edit"></fa>
                                Edit
                            </b-btn>
                            <b-btn variant="danger" size="sm" @click="delMotivation(fear)">
                                <fa icon="trash"></fa>
                                Delete
                            </b-btn>
                        </div>
                        <div class="pt-2">
                            <h5><b>{{ fear.name }}</b></h5>
                            <markdown-block :text="fear.description" block></markdown-block>
                        </div>
                    </div>
                    <h6 v-else class="font-italic">
                        No Fear selected.
                    </h6>
                </b-card>
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
        <add-edit-motivation-modal ref="addEditMotivModal" @add="onMotivAdd"></add-edit-motivation-modal>
        <delete-modal
            ref="delMotivModal"
            :name="delMotiv.name"
            type="quality"
            @hidden="onDelMotivHidden"
            @delete="onDelMotivDelete"
        ></delete-modal>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    .edit-motivations-modal {
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
    import SupplementSearch from '../../../character/supplementSearch';
    import MarkdownBlock from '../../../ui/markdown';
    import DeleteModal from '../../../ui/deleteModal.vue';
    import AddEditMotivationModal from './addEditMotivationModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditMotivationsModal',
        components: {
            MarkdownBlock,
            SupplementSearch,
            DeleteModal,
            AddEditMotivationModal
        },
        subscriptions: {
            character: charMan.selected$,
            motivationsList: eoteMan.motivations$
        },
        data()
        {
            return {
                motivations: {
                    strength: null,
                    flaw: null,
                    desire: null,
                    fear: null
                },
                delMotiv: {
                    id: undefined,
                    name: '',
                    type: ''
                }
            };
        },
        computed: {
            strength() { return this.motivationsList.filter((mot) => mot.id === this.motivations.strength)[0]; },
            flaw() { return this.motivationsList.filter((mot) => mot.id === this.motivations.flaw)[0]; },
            desire() { return this.motivationsList.filter((mot) => mot.id === this.motivations.desire)[0]; },
            fear() { return this.motivationsList.filter((mot) => mot.id === this.motivations.fear)[0]; },
            availableStrength() { return this.motivationsList.filter((mot) => mot.type === 'strength'); },
            availableFlaw() { return this.motivationsList.filter((mot) => mot.type === 'flaw'); },
            availableDesire() { return this.motivationsList.filter((mot) => mot.type === 'desire'); },
            availableFear() { return this.motivationsList.filter((mot) => mot.type === 'fear'); },
            isStrengthDirty() { return this.motivations.strength !== this.character.details.motivations.strength; },
            isFlawDirty() { return this.motivations.flaw !== this.character.details.motivations.flaw; },
            isDesireDirty() { return this.motivations.desire !== this.character.details.motivations.desire; },
            isFearDirty() { return this.motivations.fear !== this.character.details.motivations.fear; }
        },
        methods: {
            async onSave()
            {
                this.character.details.motivations = _.cloneDeep(this.motivations);

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                // Reset the edit fields
                this.motivations = _.cloneDeep(this.character.details.motivations);
            },

            onMotivAdd(motiv)
            {
                if(!motiv.type)
                {
                    motiv = this.motivationsList.find((mot) => mot.id === motiv.id) ?? motiv;
                }
                this.motivations[motiv.type] = motiv.id;
            },

            onDelMotivHidden()
            {
                this.delMotiv.id = undefined;
                this.delMotiv.name = '';
                this.delMotiv.type = '';
            },
            async onDelMotivDelete()
            {
                this.motivations[this.delMotiv.type] = null;
                this.character.details.motivations = _.cloneDeep(this.motivations);

                return Promise.all([
                    await charMan.save(this.character),
                    await eoteMan.delSup('motivations', this.delMotiv)
                ]);
            },

            isEditable(motiv)
            {
                return motiv.scope === 'user';
            },

            addNew(type)
            {
                this.$refs.addEditMotivModal.show(type);
            },
            editMotivation(motiv)
            {
                this.$refs.addEditMotivModal.show(motiv);
            },
            delMotivation(motiv)
            {
                this.delMotiv.id = motiv.id;
                this.delMotiv.name = motiv.name;
                this.delMotiv.type = motiv.type;

                this.$refs.delMotivModal.show();
            },
            revert(type)
            {
                this.motivations[type] = this.character.details.motivations[type];
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
