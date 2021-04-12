<!----------------------------------------------------------------------------------------------------------------------
  -- EditExtrasModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-extras-modal">
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
                Edit Extras
            </template>

            <!-- Modal Content -->
            <b-form-group
                id="extras-input-group"
                label="Extras"
                label-for="extras-input"
            >
                <b-card class="overflow-hidden" no-body>
                    <codemirror ref="editor" v-model="extras" :options="{ lineNumbers: true }"></codemirror>
                </b-card>
            </b-form-group>

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
    .edit-extras-modal {
        .CodeMirror {
            height: 300px;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditExtrasModal',
        subscriptions: {
            character: charMan.selected$
        },
        data()
        {
            return {
                extras: ''
            };
        },
        methods: {
            async onSave()
            {
                this.character.details.extras = this.extras;

                // Save the character
                await charMan.save(this.character);

                // Clear the extras
                this.extras = '';
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
