<!----------------------------------------------------------------------------------------------------------------------
  -- AddEditAbilityModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="add-ability-modal">
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
                Ability
            </template>

            <!-- Modal Content -->
            <b-form-group
                label="Name"
                label-class="font-weight-bold"
                label-for="name-input"
            >
                <b-form-input id="name-input" v-model="name" autocomplete="off"></b-form-input>
            </b-form-group>
            <b-form-group
                id="extras-input-group"
                label="Description"
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
    .add-ability-modal {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../../api/managers/character';
    import eoteMan from '../../../../api/managers/eote';

    // Components
    import EditReference from '../../../character/editReference.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'AddAbilityModal',
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
                    const ability = await eoteMan.editSup('abilities', {
                        id: this.id,
                        name: this.name,
                        description: this.description,
                        reference: this.reference
                    });

                    this.$emit('edit', ability);
                }
                else
                {
                    const ability = await eoteMan.addSup('abilities', {
                        name: this.name,
                        description: this.description,
                        reference: this.reference
                    });

                    this.$emit('add', ability);
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

            show(ability)
            {
                if(ability)
                {
                    this.id = ability.id;
                    this.name = ability.name;
                    this.description = ability.description;
                    this.reference = ability.reference;
                }
                else
                {
                    this.id = undefined;
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
