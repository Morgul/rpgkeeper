<!----------------------------------------------------------------------------------------------------------------------
  -- editStatsModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="stats" class="edit-stats-modal">
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
                Edit Stats
            </template>

            <!-- Modal Content -->
            <div v-for="(stat, index) in stats" :key="index" class="d-flex mb-2">
                <b-form-input v-model.number="stat.value" type="number" min="1" max="99" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                <b-form-input v-model="stat.description" class="ml-2" placeholder="Description"></b-form-input>
                <b-btn variant="danger" class="ml-2" @click="removeStat(stat)">
                    <fa icon="trash-alt"></fa>
                </b-btn>
            </div>

            <hr />

            <b-card
                header="New Stat"
                header-bg-variant="dark"
                header-text-variant="white"
            >
                <div class="d-flex">
                    <b-form-input v-model.number="newValue" type="number" min="1" max="99" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                    <b-form-input id="new-desc" v-model="newDesc" class="ml-2" placeholder="Description"></b-form-input>
                    <b-btn variant="primary" class="ml-2 text-nowrap" :disabled="!isAddValid" @click="addStat">
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
    .edit-stats-modal {
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
        name: 'EditStatsModal',
        props: {
            value: {
                type: Array,
                required: true
            }
        },
        data()
        {
            return {
                stats: _.cloneDeep(this.value),
                newValue: 1,
                newDesc: ''
            };
        },
        computed: {
            isAddValid()
            {
                return _.isFinite(this.newValue) && !!this.newDesc;
            }
        },
        methods: {
            onShown()
            {
                // Copy the v-model value over our stats array.
                this.stats = _.cloneDeep(this.value);
            },
            onSave()
            {
                // Filter out invalid stats.
                this.stats = this.stats.filter((stat) => _.isFinite(stat.value) && !!stat.description);

                this.$emit('input', this.stats);

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
                this.stats = [];
            },

            addStat()
            {
                this.stats.push({
                    description: this.newDesc,
                    value: this.newValue
                });
                this.newDesc = '';
                this.newValue = 1;
            },
            removeStats(stat)
            {
                // We can't use lodash, since Vue doesn't track whatever magic `_.pull` does.
                // See: https://vuejs.org/v2/guide/list.html#Array-Change-Detection
                const idx = _.findIndex(this.stats, stat);
                if(idx > -1)
                {
                    this.stats.splice(idx, 1);
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
