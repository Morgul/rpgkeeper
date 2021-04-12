<!----------------------------------------------------------------------------------------------------------------------
  -- editHooksModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="hooks" class="edit-hooks-modal">
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
                Edit Hooks
            </template>

            <!-- Modal Content -->
            <div v-for="(hook, index) in hooks" :key="index" class="d-flex mb-2">
                <b-form-input v-model="hook.description"></b-form-input>
                <b-btn variant="danger" class="ml-2" @click="removeHook(hook)">
                    <fa icon="trash-alt"></fa>
                </b-btn>
            </div>

            <hr />

            <b-card
                header="New Hook"
                header-bg-variant="dark"
                header-text-variant="white"
            >
                <div class="d-flex">
                    <b-form-input id="new-input" v-model="newHook"></b-form-input>
                    <b-btn variant="primary" class="ml-2 text-nowrap" @click="addHook">
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
    .edit-hooks-modal {
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
        name: 'EditHooksModal',
        props: {
            value: {
                type: Array,
                required: true
            }
        },
        data()
        {
            return {
                hooks: _.cloneDeep(this.value),
                newHook: ''
            };
        },
        methods: {
            onShown()
            {
                // Copy the v-model value over our hooks array.
                this.hooks = _.cloneDeep(this.value);
            },
            onSave()
            {
                this.$emit('input', this.hooks);

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
                this.hooks = [];
            },

            addHook()
            {
                this.hooks.push({ description: this.newHook });
                this.newHook = '';
            },
            removeHook(hook)
            {
                // We can't use lodash, since Vue doesn't track whatever magic `_.pull` does.
                // See: https://vuejs.org/v2/guide/list.html#Array-Change-Detection
                const idx = _.findIndex(this.hooks, hook);
                if(idx > -1)
                {
                    this.hooks.splice(idx, 1);
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
