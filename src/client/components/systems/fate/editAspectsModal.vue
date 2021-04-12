<!----------------------------------------------------------------------------------------------------------------------
  -- editAspectsModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="aspects" class="edit-aspects-modal">
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
                Edit Aspects
            </template>

            <!-- Modal Content -->
            <b-form-row>
                <b-col cols="12" lg="6">
                    <b-form-group
                        id="hc-input-group"
                        label="High Concept"
                        label-class="font-weight-bold"
                        label-for="hc-input"
                    >
                        <b-form-input id="hc-input" v-model="highConcept.detail"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" lg="6">
                    <b-form-group
                        id="tb-input-group"
                        label="Trouble"
                        label-class="font-weight-bold"
                        label-for="tb-input"
                    >
                        <b-form-input id="tb-input" v-model="trouble.detail"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-form-row>

            <hr class="mt-2" />

            <h4>Extra Aspects</h4>

            <div v-for="(aspect, index) in extraAspects" :key="index" class="d-flex mb-2">
                <b-form-input v-model="aspect.detail"></b-form-input>
                <b-btn variant="danger" class="ml-2" @click="removeAspect(aspect)">
                    <fa icon="trash-alt"></fa>
                </b-btn>
            </div>

            <hr />

            <b-card
                header="New Aspect"
                header-bg-variant="dark"
                header-text-variant="white"
            >
                <div class="d-flex">
                    <b-form-input id="new-input" v-model="newAspect"></b-form-input>
                    <b-btn variant="primary" class="ml-2 text-nowrap" @click="addAspect">
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
    .edit-aspects-modal {
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
        name: 'EditAspectsModal',
        props: {
            value: {
                type: Array,
                required: true
            }
        },
        data()
        {
            return {
                aspects: _.cloneDeep(this.value),
                newAspect: ''
            };
        },
        computed: {
            highConcept() { return _.find(this.aspects, { type: 'high concept' }) || { details: '' }; },
            trouble() { return _.find(this.aspects, { type: 'trouble' }) || { details: '' }; },
            extraAspects() { return _.filter(this.aspects, { type: 'aspect' }); }
        },
        methods: {
            onShown()
            {
                // Copy the v-model value over our aspects array.
                this.aspects = _.cloneDeep(this.value);
            },
            onSave()
            {
                this.$emit('input', this.aspects);

                // We have to wait for things to settle from updating the model
                this.$nextTick(async() =>
                {
                    // Save the character
                    try { await charMan.save(); }
                    catch (error)
                    {
                        // TODO: Let the user know about this!
                    } // end if
                });
            },
            onCancel()
            {
                // Clear our local variable
                this.aspects = [];
            },

            addAspect()
            {
                this.aspects.push({ type: 'aspect', detail: this.newAspect });
                this.newAspect = '';
            },
            removeAspect(aspect)
            {
                // We can't use lodash, since Vue doesn't track whatever magic `_.pull` does.
                // See: https://vuejs.org/v2/guide/list.html#Array-Change-Detection
                const idx = _.findIndex(this.aspects, aspect);
                if(idx > -1)
                {
                    this.aspects.splice(idx, 1);
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
