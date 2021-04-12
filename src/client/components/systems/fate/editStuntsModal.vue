<!----------------------------------------------------------------------------------------------------------------------
  -- EditStuntsModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-stunts-modal">
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
                Edit Stunts
            </template>

            <!-- Modal Content -->
            <div v-for="(stunt, index) in stunts" :key="index" class="d-flex mb-2">
                <b-form-input v-model="stunt.title" class="title-input" placeholder="Stunt title"></b-form-input>
                <b-form-input v-model="stunt.description" class="ml-2" placeholder="Stunt description"></b-form-input>
                <b-btn variant="danger" class="ml-2 text-nowrap" @click="removeStunt(stunt)">
                    <fa icon="trash-alt"></fa>
                </b-btn>
            </div>
            <div v-if="stunts.length === 0" class="text-center">
                <h6>No Stunts.</h6>
            </div>

            <hr />

            <b-card
                header="New Stunt"
                header-bg-variant="dark"
                header-text-variant="white"
            >
                <div class="d-flex">
                    <b-form-input v-model="newStuntTitle" class="title-input" placeholder="Stunt title"></b-form-input>
                    <b-form-input v-model="newStuntDesc" class="ml-2" placeholder="Stunt description"></b-form-input>
                    <b-btn variant="primary" class="ml-2 text-nowrap" @click="addStunt">
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
    .edit-stunts-modal {
        .title-input {
            max-width: 225px;
        }
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
        name: 'EditStuntsModal',
        subscriptions: {
            character: charMan.selected$
        },
        data()
        {
            return {
                stunts: [],
                newStuntTitle: '',
                newStuntDesc: ''
            };
        },
        methods: {
            async onSave()
            {
                this.character.details.stunts = this.stunts;

                // Save the character
                await charMan.save(this.character);

                // Clear the stunts
                this.stunts = [];
            },
            onShown()
            {
                this.stunts = _.cloneDeep(this.character.details.stunts);
            },

            addStunt()
            {
                this.stunts.push({ title: this.newStuntTitle, description: this.newStuntDesc });
                this.newStuntTitle = '';
                this.newStuntDesc = '';
            },
            removeStunt(stunt)
            {
                // We can't use lodash, since Vue doesn't track whatever magic `_.pull` does.
                // See: https://vuejs.org/v2/guide/list.html#Array-Change-Detection
                const idx = _.findIndex(this.stunts, stunt);
                if(idx > -1)
                {
                    this.stunts.splice(idx, 1);
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
