<!--suppress ALL -->
<template>
    <div class="input-group roll-component">
        <span class="input-group-addon" data-trigger="hover" data-container="body" data-toggle="popover" data-placement="top" data-content="{{ renderedText }}">
            <button v-if="currentValue || currentValue === 0" type="button" class="close" @click.prevent.stop="clear()">
                <span aria-hidden="true">
                    &times;
                </span>
                <span class="sr-only">Clear</span>
            </button>
            {{ currentValue }}
        </span>
        <span class="input-group-btn">
            <button class="btn btn-secondary named-button" type="button" title="Execute Roll" @click="execute()">
                {{ roll.name }}
            </button>
            <button class="btn btn-secondary" type="button" title="Edit Roll" @click="edit()">
                <i class="fa fa-fw fa-edit"></i>
            </button>
            <button class="btn btn-danger" type="button" title="Remove Roll" @click="$refs.deleteModal.show()">
                <i class="fa fa-fw fa-trash-o"></i>
            </button>
        </span>
    </div>

    <!-- Edit Modal -->
    <modal v-ref:edit-modal :backdrop="'static'" :keyboard="false">
        <div class="modal-header" slot="header">
            <h4 class="modal-title">
                <i class="fa fa-edit"></i>
                Edit "{{ roll.name }}" Roll
            </h4>
        </div>
        <div class="modal-body" slot="body">
            <form>
                <fieldset class="form-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" class="form-control" v-model="rollClone.name">
                </fieldset>
                <fieldset class="form-group">
                    <label for="expr">Expression</label>
                    <textarea id="expr" rows="5" class="form-control monospace" v-model="rollClone.expression"></textarea>
                </fieldset>
            </form>
        </div>
        <div class="modal-footer" slot="footer">
            <button type="button"
                    class="btn btn-success"
                    @click="saveEdits()">
                <i class="fa fa-save"></i>
                Save Roll
            </button>
            <button type="button"
                    class="btn btn-secondary"
                    @click="$refs.editModal.hideModal()">
                <i class="fa fa-times"></i>
                Cancel
            </button>
        </div>
    </modal>

    <!-- Delete Roll Modal -->
    <delete-modal v-ref:delete-modal :title="'Roll'" :text="'this roll'" :on-delete="remove"></delete-modal>
</template>

<style lang="sass">
    .roll-component {
        margin-bottom: 10px;

        .input-group-addon {
            position: relative;
            min-width: 65px;
            text-align: right;
            padding-left: 0;
            padding-right: 25px;
            cursor: pointer;

            button.close {
                float: none;
                position: absolute;
                top: 4px;
                right: 8px;
            }
        }

        .input-group-btn {
            width: 100%;

            .named-button {
                width: calc(100% - 106px);
            }
        }
    }
</style>

<script type="text/babel">
    import _ from 'lodash';
    import diceUtil from '../../../../client/components/dice/diceService';
    import DeleteModal from '../../../../client/components/ui/deleteModal.vue';

    import { modal } from 'vueboot';

    export default {
        components: {
            modal,
            deleteModal: DeleteModal
        },
        props: {
            roll: {
                type: Object,
                required: true
            },
            save: {
                type: Function,
                required: true
            },
            context: {
                type: Object,
                required: true
            },
            rolls: {
                type: Array,
                required: true
            }
        },
        data: function()
        {
            return {
                rollClone: {},
                currentResults: null
            };
        },
        computed: {
            renderedText: function()
            {
                if(this.currentResults)
                {
                    return this.currentResults.render();
                } // end if

                return "";
            },
            currentValue: function()
            {
                return (this.currentResults || {}).value;
            }
        },
        methods: {
            edit: function()
            {
                this.rollClone = _.clone(this.roll);
                this.$refs.editModal.showModal();
            },
            execute: function()
            {
                this.currentResults = diceSvc.roll(this.roll.expression, this.context);
            },
            clear: function()
            {
                this.currentResults = null;
            },
            saveEdits: function()
            {
                _.assign(this.roll, this.rollClone);
                this.$refs.editModal.hideModal();

                this.save();
            },
            remove: function()
            {
                this.rolls.$remove(this.roll);
                this.save();
            }
        },
        ready: function()
        {
            $(function () {
                $('[data-toggle="popover"]').popover()
            });
        }
    }
</script>
