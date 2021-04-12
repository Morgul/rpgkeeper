<!----------------------------------------------------------------------------------------------------------------------
  -- addEditModal.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="page" class="add-edit-page">
        <b-modal
            v-model="showModal"
            header-bg-variant="dark"
            header-text-variant="white"
            no-close-on-esc
            no-close-on-backdrop
            size="xl"
            @ok="onSave"
            @shown="onShown"
            @hidden="onHidden"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <span v-if="isNew">
                    <fa icon="file-plus"></fa>
                    Add
                </span>
                <span v-else>
                    <fa icon="file-edit"></fa>
                    Edit
                </span>
                Page
            </template>

            <!-- Modal Content -->
            <b-form-group
                id="page-title-group"
                label="Title"
                label-for="page-title"
            >
                <b-form-input id="page-title" v-model="page.title"></b-form-input>
            </b-form-group>
            <b-form-group
                id="page-content-group"
                label="Content"
                label-for="page-content"
            >
                <b-card class="overflow-hidden" no-body>
                    <codemirror ref="editor" v-model="page.content"></codemirror>
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
    .add-edit-page {
        .CodeMirror {
            height: 550px;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import notesMan from '../../api/managers/notebook';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'AddEditPageModal',
        props: {
            value: {
                type: Object,
                default: undefined
            }
        },
        computed: {
            showModal: {
                get() { return !!this.value; },
                set() { /* We ignore setting */ }
            },
            isNew() { return !this.value || !this.value.id; },
            page() { return this.value; }
        },
        methods: {
            onHidden()
            {
                this.$emit('hidden');
            },
            async onSave()
            {
                if(this.page.id)
                {
                    await notesMan.updatePage(notesMan.selected, this.page);
                }
                else
                {
                    await notesMan.addPage(notesMan.selected, this.page);
                } // end if
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
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
