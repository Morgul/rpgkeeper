<!----------------------------------------------------------------------------------------------------------------------
  -- EditForcePoolModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-forcePool-modal">
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
                Edit Force
            </template>

            <!-- Modal Content -->
            <div class="text-muted mb-2">
                Characters who are not force sensitive, cannot have a Force rating. If the character is force
                sensitive, then they will often start at a rating of 1, but may purchase talents to increase their
                force rating. If a character has committed force die to a power, their rating does not change for
                the purposes of buying new powers, but their effective rating (the number of dice rolled) is reduced.
            </div>
            <hr />
            <div class="d-flex">
                <b-form-group
                    class="flex-fill ml-2"
                    label="Force Sensitive"
                    label-class="font-weight-bold"
                    label-for="species-input"
                >
                    <b-form-checkbox v-model="forcePool.sensitive" class="mt-3" name="force-sensitive" switch>
                        Force Sensitive
                    </b-form-checkbox>
                </b-form-group>
                <b-form-group
                    class="flex-fill ml-2"
                    label="Force Rating"
                    label-class="font-weight-bold"
                    label-for="rating-input"
                >
                    <div class="d-flex">
                        <b-input-group>
                            <b-form-input id="rating-input" v-model.number="forcePool.rating" type="number" min="0" max="10" step="1" :disabled="!forcePool.sensitive"></b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!forcePool.sensitive" @click="forcePool.rating = 0">
                                    <fa icon="times"></fa>
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </div>
                </b-form-group>
            </div>

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
    .edit-forcePool-modal {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../../api/managers/character';
    import eoteMan from '../../../../api/managers/eote';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditForcePoolModal',
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                forcePool: {
                    sensitive: false,
                    committed: 0,
                    rating: 0
                }
            };
        },
        watch: {
            'forcePool.sensitive'()
            {
                if(!this.forcePool.sensitive)
                {
                    this.forcePool.rating = 0;
                    this.forcePool.committed = 0;
                }
            }
        },
        methods: {
            async onSave()
            {
                this.character.details.force.sensitive = this.forcePool.sensitive;
                this.character.details.force.committed = this.forcePool.committed;
                this.character.details.force.rating = this.forcePool.rating;

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                // Reset the edit fields
                this.forcePool = {
                    sensitive: this.character.details.force.sensitive || false,
                    committed: this.character.details.force.committed || 0,
                    rating: this.character.details.force.rating || 0
                };
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
