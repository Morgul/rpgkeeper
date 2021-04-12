<!----------------------------------------------------------------------------------------------------------------------
  -- Delete Modal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="delete-modal">
        <b-modal
            ref="modal"
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
                <fa icon="trash-alt"></fa>
                {{ title }}
            </template>

            <h3>
                <fa icon="exclamation-triangle"></fa>
                Are you sure you want to delete "{{ name }}"?
            </h3>
            <p class="text-muted">
                You will permanently lose this {{ type }}. This cannot be undone.
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

    import _ from 'lodash';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'DeleteThingModal',
        props: {
            type: {
                type: String,
                required: true
            },
            name: {
                type: String,
                default: undefined
            }
        },
        computed: {
            title() { return `Delete ${ _.capitalize(this.type) }`; }
        },
        methods: {
            onHidden()
            {
                this.$emit('hidden');
            },
            onDelete()
            {
                this.$emit('delete');
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
