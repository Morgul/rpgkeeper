<!----------------------------------------------------------------------------------------------------------------------
  -- AddEditMotivationModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="add-motivation-modal">
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
                <span v-if="isEdit">
                    Edit
                </span>
                <span v-else>
                    Add
                </span>
                Motivation
            </template>

            <!-- Modal Content -->
            <b-form-row>
                <b-col cols="9">
                    <b-form-group
                        label="Name"
                        label-class="font-weight-bold"
                        label-for="name-input"
                    >
                        <b-form-input id="name-input" v-model="name" autocomplete="off"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group
                        v-slot="{ ariaDescribedby }"
                        label="Type"
                        label-class="font-weight-bold"
                    >
                        <b-form-radio v-model="type" :aria-describedby="ariaDescribedby" name="type-radios" value="strength" inline>
                            Strength
                        </b-form-radio>
                        <b-form-radio v-model="type" :aria-describedby="ariaDescribedby" name="type-radios" value="flaw" inline>
                            Flaw
                        </b-form-radio>
                        <b-form-radio v-model="type" :aria-describedby="ariaDescribedby" name="type-radios" value="desire" inline>
                            Desire
                        </b-form-radio>
                        <b-form-radio v-model="type" :aria-describedby="ariaDescribedby" name="type-radios" value="fear" inline>
                            Fear
                        </b-form-radio>
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-form-group
                id="description-input-group"
                label="Description"
                label-class="font-weight-bold"
                label-for="description-input"
            >
                <b-card class="overflow-hidden" no-body>
                    <codemirror ref="editor" v-model="description" :options="{ lineNumbers: true }"></codemirror>
                </b-card>
            </b-form-group>

            <edit-reference v-model="reference"></edit-reference>

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
    .add-motivation-modal {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import eoteMan from '../../../../api/managers/eote';
    import charMan from '../../../../api/managers/character';

    // Components
    import EditReference from '../../../character/editReference.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'AddQualityModal',
        components: {
            EditReference
        },
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                id: undefined,
                name: '',
                type: '',
                description: '',
                reference: ''
            };
        },
        computed: {
            isEdit() { return this.id !== undefined; }
        },
        methods: {
            async onSave()
            {
                if(this.isEdit)
                {
                    const motivation = await eoteMan.editSup('motivations', {
                        id: this.id,
                        name: this.name,
                        type: this.type,
                        description: this.description,
                        reference: this.reference
                    });

                    this.$emit('edit', motivation);
                }
                else
                {
                    const motivation = await eoteMan.addSup('motivations', {
                        name: this.name,
                        type: this.type,
                        description: this.description,
                        reference: this.reference
                    });

                    this.$emit('add', motivation);
                } // end if

                // Clear
                this.id = undefined;
                this.name = '';
                this.type = '';
                this.description = '';
                this.reference = '';
            },
            onShown()
            {
                this.cmRefresh();
            },
            cmRefresh()
            {
                this.$nextTick(() =>
                {
                    this.$refs.editor.codemirror.refresh();
                });
            },

            show(motivation)
            {
                if(typeof motivation === 'string')
                {
                    this.id = undefined;
                    this.name = '';
                    this.type = motivation;
                    this.description = '';
                    this.reference = '';
                }
                else if(motivation)
                {
                    this.id = motivation.id;
                    this.name = motivation.name;
                    this.type = motivation.type;
                    this.description = motivation.description;
                    this.reference = motivation.reference;
                }
                else
                {
                    this.id = undefined;
                    this.name = '';
                    this.type = '';
                    this.description = '';
                    this.reference = '';
                } // end if

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
