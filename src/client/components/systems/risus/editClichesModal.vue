<!----------------------------------------------------------------------------------------------------------------------
  -- editClichesModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="cliches" class="edit-cliches-modal">
        <b-modal
            ref="modal"
            header-bg-variant="dark"
            header-text-variant="white"
            size="lg"
            no-close-on-esc
            no-close-on-backdrop
            @ok="onSave"
            @cancel="onCancel"
            @shown="onShown"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <fa icon="file-edit"></fa>
                Edit Cliches
            </template>

            <!-- Modal Content -->
            <div v-for="(cliche, index) in cliches" :key="index" class="d-flex mb-2">
                <b-form-input v-model.number="cliche.value" type="number" min="1" max="99" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                <b-form-input v-model="cliche.description" class="ml-2" placeholder="Description"></b-form-input>
                <b-form-input v-model="cliche.tools" class="ml-2" placeholder="Tools of the Trade"></b-form-input>
                <b-btn variant="danger" class="ml-2" @click="removeCliche(cliche)">
                    <fa icon="trash-alt"></fa>
                </b-btn>
            </div>

            <hr />

            <b-card
                header="New Cliche"
                header-bg-variant="dark"
                header-text-variant="white"
            >
                <div class="d-flex">
                    <b-form-input v-model.number="newValue" type="number" min="1" max="99" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                    <b-form-input id="new-desc" v-model="newDesc" class="ml-2" placeholder="Description"></b-form-input>
                    <b-form-input id="new-tools" v-model="newTools" class="ml-2" placeholder="Tools of the Trade"></b-form-input>
                    <b-btn variant="primary" class="ml-2 text-nowrap" :disabled="!isAddValid" @click="addCliche">
                        <fa icon="plus"></fa>
                        Add
                    </b-btn>
                </div>
            </b-card>

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
    .edit-cliches-modal {
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
        name: 'EditClichesModal',
        props: {
            value: {
                type: Array,
                required: true
            }
        },
        data()
        {
            return {
                cliches: _.cloneDeep(this.value),
                newValue: 1,
                newDesc: '',
                newTools: ''
            };
        },
        computed: {
            isAddValid()
            {
                return _.isFinite(this.newValue) && !!this.newDesc;
            }
        },
        methods: {
            onShown()
            {
                // Copy the v-model value over our cliches array.
                this.cliches = _.cloneDeep(this.value);
            },
            onSave()
            {
                // Filter out invalid cliches.
                this.cliches = this.cliches.filter((cliche) => _.isFinite(cliche.value) && !!cliche.description);

                this.$emit('input', this.cliches);

                // We have to wait for things to settle from updating the model
                this.$nextTick(async() =>
                {
                    // Save the character
                    try { await charMan.save(); }
                    catch (error)
                    {
                        console.error('Error saving:', error);
                        // TODO: Let the user know about this!
                    } // end if
                });
            },
            onCancel()
            {
                // Clear our local variable
                this.cliches = [];
            },

            addCliche()
            {
                this.cliches.push({
                    description: this.newDesc,
                    tools: this.newTools,
                    value: this.newValue,
                    current: this.newValue
                });
                this.newDesc = '';
                this.newTools = '';
                this.newValue = 1;
            },
            removeCliche(cliche)
            {
                // We can't use lodash, since Vue doesn't track whatever magic `_.pull` does.
                // See: https://vuejs.org/v2/guide/list.html#Array-Change-Detection
                const idx = _.findIndex(this.cliches, cliche);
                if(idx > -1)
                {
                    this.cliches.splice(idx, 1);
                } // end if
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
