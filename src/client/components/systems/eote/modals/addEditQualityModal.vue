<!----------------------------------------------------------------------------------------------------------------------
  -- AddEditQualityModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="add-quality-modal">
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
                Quality
            </template>

            <!-- Modal Content -->
            <b-form-row>
                <b-col cols="10">
                    <b-form-group
                        label="Name"
                        label-class="font-weight-bold"
                        label-for="name-input"
                    >
                        <b-form-input id="name-input" v-model="name" autocomplete="off"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="2" class="pt-4">
                    <b-form-checkbox v-model="passive" name="passive-check" switch>
                        <b>Passive</b>
                    </b-form-checkbox>
                    <b-form-checkbox v-model="ranked" name="ranked-check" switch>
                        <b>Ranked</b>
                    </b-form-checkbox>
                </b-col>
            </b-form-row>
            <b-form-group
                id="extras-input-group"
                label="Description"
                label-class="font-weight-bold"
                label-for="extras-input"
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
    .add-quality-modal {
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
                description: '',
                reference: '',
                passive: false,
                ranked: false
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
                    const quality = await eoteMan.editSup('qualities', {
                        id: this.id,
                        name: this.name,
                        description: this.description,
                        passive: this.passive,
                        ranked: this.ranked,
                        reference: this.reference
                    });

                    this.$emit('edit', quality);
                }
                else
                {
                    const quality = await eoteMan.addSup('qualities', {
                        name: this.name,
                        description: this.description,
                        passive: this.passive,
                        ranked: this.ranked,
                        reference: this.reference
                    });

                    this.$emit('add', quality);
                } // end if
            },
            onShown()
            {
                this.extras = this.character.details.extras;
                this.cmRefresh();
            },
            cmRefresh()
            {
                this.$nextTick(() =>
                {
                    this.$refs.editor.codemirror.refresh();
                });
            },

            show(quality)
            {
                if(quality)
                {
                    this.id = quality.id;
                    this.name = quality.name;
                    this.description = quality.description;
                    this.passive = !!quality.passive;
                    this.ranked = !!quality.ranked;
                    this.reference = quality.reference;
                }
                else
                {
                    this.id = undefined;
                    this.name = '';
                    this.description = '';
                    this.reference = '';
                    this.passive = false;
                    this.ranked = false;
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
