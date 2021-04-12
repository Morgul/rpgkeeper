<!----------------------------------------------------------------------------------------------------------------------
  -- Delete Page Modal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="page" class="delete-page-modal">
        <b-modal
            v-model="showModal"
            header-bg-variant="dark"
            header-text-variant="white"
            no-close-on-esc
            no-close-on-backdrop
            size="md"
            ok-variant="danger"
            @ok="onDelete"
            @hidden="onHidden"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <fa icon="file-minus"></fa>
                Delete Page
            </template>

            <!-- Modal Content -->
            <h3>
                <fa icon="exclamation-triangle"></fa>
                Are you sure you want to delete "{{ page.title }}"?
            </h3>
            <p class="text-muted">
                This page will be removed permanently. This cannot be undone.
            </p>

            <!-- Modal Buttons -->
            <template slot="modal-ok">
                <fa icon="trash-alt"></fa>
                Delete
            </template>
            <template slot="modal-cancel">
                <fa icon="times"></fa>
                Cancel
            </template>
        </b-modal>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import notesMan from '../../api/managers/notebook';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'DeletePageModal',
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
            page() { return this.value; }
        },
        methods: {
            onHidden()
            {
                this.$emit('hidden');
            },
            async onDelete()
            {
                await notesMan.deletePage(notesMan.selected, this.page);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
