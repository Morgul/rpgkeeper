<!----------------------------------------------------------------------------------------------------------------------
  -- AddEditForcePowersModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="add-edit-forcepower-modal">
        <b-modal
            ref="modal"
            header-bg-variant="dark"
            header-text-variant="white"
            no-close-on-esc
            no-close-on-backdrop
            size="xxl"
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
                ForcePowers
            </template>

            <!-- Modal Content -->
            <b-form-row>
                <b-col cols="6">
                    <b-form-row>
                        <b-col cols="10">
                            <b-form-group
                                label="Name"
                                label-class="font-weight-bold"
                                label-for="name-input"
                            >
                                <b-form-input id="name-input" v-model="name" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="2">
                            <b-form-group
                                label="Min Rating"
                                label-class="font-weight-bold"
                                label-for="min-rating-input"
                            >
                                <b-form-input id="min-rating-input" v-model.number="minRating" type="number" min="0" step="1" autocomplete="off"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-form-row>

                    <b-form-group
                        id="description-input-group"
                        label="Description"
                        label-class="font-weight-bold"
                        label-for="extras-input"
                    >
                        <b-card class="overflow-hidden" no-body>
                            <codemirror ref="editor" v-model="description" class="editor" :options="{ lineNumbers: true }"></codemirror>
                        </b-card>
                    </b-form-group>

                    <edit-reference v-model="reference"></edit-reference>

                    <hr style="margin-top: 0.65rem" />

                    <b-form-group
                        id="control-input-group"
                        label="Control"
                        label-class="font-weight-bold"
                        label-for="extras-input"
                    >
                        <template #label>
                            Control
                            <b-form-spinbutton v-model="controlAvailable" class="pull-right" min="0" step="1" size="sm" style="margin-top: -8px" inline></b-form-spinbutton>
                        </template>
                        <b-card v-for="(_, index) in upgrades.control" :key="index" class="overflow-hidden mt-2" no-body>
                            <codemirror ref="editorControl" v-model="upgrades.control[index].description" class="upgrade" :options="{ lineNumbers: true }"></codemirror>
                        </b-card>
                        <b-card v-if="upgrades.control.length < 1" class="overflow-hidden" no-body>
                            <i class="text-center d-inline message-margin">No Mastery upgrades</i>
                        </b-card>
                    </b-form-group>
                </b-col>

                <b-col cols="6">
                    <b-form-group
                        id="strength-input-group"
                        label="Strength"
                        label-class="font-weight-bold"
                        label-for="extras-input"
                    >
                        <template #label>
                            Strength
                            <b-form-spinbutton v-model="upgrades.strength.available" class="pull-right" min="0" step="1" size="sm" style="margin-top: -8px" inline></b-form-spinbutton>
                        </template>
                        <b-card class="overflow-hidden" no-body>
                            <codemirror v-if="upgrades.strength.available > 0" ref="editorStrength" v-model="upgrades.strength.description" class="upgrade" :options="{ lineNumbers: true }"></codemirror>
                            <i v-else class="text-center d-inline message-margin">No Strength upgrades</i>
                        </b-card>
                    </b-form-group>
                    <b-form-group
                        id="magnitude-input-group"
                        label="Magnitude"
                        label-class="font-weight-bold"
                        label-for="extras-input"
                    >
                        <template #label>
                            Magnitude
                            <b-form-spinbutton v-model="upgrades.magnitude.available" class="pull-right" min="0" step="1" size="sm" style="margin-top: -8px" inline></b-form-spinbutton>
                        </template>
                        <b-card class="overflow-hidden" no-body>
                            <codemirror v-if="upgrades.magnitude.available > 0" ref="editorMagnitude" v-model="upgrades.magnitude.description" class="upgrade" :options="{ lineNumbers: true }"></codemirror>
                            <i v-else class="text-center d-inline message-margin">No Magnitude upgrades</i>
                        </b-card>
                    </b-form-group>
                    <b-form-group
                        id="duration-input-group"
                        label="Duration"
                        label-class="font-weight-bold"
                        label-for="extras-input"
                    >
                        <template #label>
                            Duration
                            <b-form-spinbutton v-model="upgrades.duration.available" class="pull-right" min="0" step="1" size="sm" style="margin-top: -8px" inline></b-form-spinbutton>
                        </template>
                        <b-card class="overflow-hidden" no-body>
                            <codemirror v-if="upgrades.duration.available > 0" ref="editorDuration" v-model="upgrades.duration.description" class="upgrade" :options="{ lineNumbers: true }"></codemirror>
                            <i v-else class="text-center d-inline message-margin">No Duration upgrades</i>
                        </b-card>
                    </b-form-group>
                    <b-form-group
                        id="range-input-group"
                        label="Range"
                        label-class="font-weight-bold"
                        label-for="extras-input"
                    >
                        <template #label>
                            Range
                            <b-form-spinbutton v-model="upgrades.range.available" class="pull-right" min="0" step="1" size="sm" style="margin-top: -8px" inline></b-form-spinbutton>
                        </template>
                        <b-card class="overflow-hidden" no-body>
                            <codemirror v-if="upgrades.range.available > 0" ref="editorRange" v-model="upgrades.range.description" class="upgrade" :options="{ lineNumbers: true }"></codemirror>
                            <i v-else class="text-center d-inline message-margin">No Range upgrades</i>
                        </b-card>
                    </b-form-group>
                    <b-form-group
                        id="mastery-input-group"
                        label="Mastery"
                        label-class="font-weight-bold"
                        label-for="extras-input"
                    >
                        <template #label>
                            Mastery
                            <b-form-spinbutton v-model="upgrades.mastery.available" class="pull-right" min="0" step="1" size="sm" style="margin-top: -8px" inline></b-form-spinbutton>
                        </template>
                        <b-card class="overflow-hidden" no-body>
                            <codemirror v-if="upgrades.mastery.available > 0" ref="editorMastery" v-model="upgrades.mastery.description" class="upgrade" :options="{ lineNumbers: true }"></codemirror>
                            <i v-else class="text-center d-inline message-margin">No Mastery upgrades</i>
                        </b-card>
                    </b-form-group>
                </b-col>
            </b-form-row>

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
    .editor .CodeMirror {
        height: 207px; // This makes everything line up.
    }

    .message-margin {
        margin: 0.4rem !important;
    }

    .upgrade {

        .CodeMirror {
            height: 64.5px; // Also makes things line up better.
        }
    }

</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import eoteMan from '../../../../api/managers/eote';
    import charMan from '../../../../api/managers/character';

    // Components
    import EditReference from '../../../character/editReference.vue';

    // Utils
    import { deepClone } from '../../../../api/utils';

    //------------------------------------------------------------------------------------------------------------------

    const defaultUpgrades = {
        strength: { available: 0, description: '' },
        magnitude: { available: 0, description: '' },
        duration: { available: 0, description: '' },
        range: { available: 0, description: '' },
        control: [],
        mastery: { available: 0, description: '' }
    };

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'AddForcePowersModal',
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
                minRating: 0,
                name: '',
                description: '',
                reference: '',
                upgrades: deepClone(defaultUpgrades)
            };
        },
        computed: {
            isEdit() { return this.id !== undefined; },
            controlAvailable: {
                get() { return this.upgrades.control.length; },
                set(val)
                {
                    const currLength = this.upgrades.control.length;

                    if(val > currLength)
                    {
                        for(let toAdd = 0; toAdd < (val - currLength); toAdd++)
                        {
                            this.addControl();
                        } // end for
                    }
                    else
                    {
                        this.upgrades.control.splice((currLength - val) * -1);
                    } // end if
                }
            }
        },
        methods: {
            async onSave()
            {
                const forcePowerDef = {
                    name: this.name,
                    minRating: this.minRating,
                    description: this.description,
                    reference: this.reference,
                    upgrades: deepClone(this.upgrades)
                };

                // Filter out upgrades
                if(forcePowerDef.upgrades.strength.available === 0)
                {
                    forcePowerDef.upgrades.strength = undefined;
                } // end if

                if(forcePowerDef.upgrades.magnitude.available === 0)
                {
                    forcePowerDef.upgrades.magnitude = undefined;
                } // end if

                if(forcePowerDef.upgrades.duration.available === 0)
                {
                    forcePowerDef.upgrades.duration = undefined;
                } // end if

                if(forcePowerDef.upgrades.range.available === 0)
                {
                    forcePowerDef.upgrades.range = undefined;
                } // end if

                if(forcePowerDef.upgrades.mastery.available === 0)
                {
                    forcePowerDef.upgrades.mastery = undefined;
                } // end if

                // Filter out blank control entries
                forcePowerDef.upgrades.control = forcePowerDef.upgrades.control
                    .filter((control) => control.description && control.description.length > 0);

                if(this.isEdit)
                {
                    forcePowerDef.id = this.id;
                    const forcePower = await eoteMan.editSup('forcePowers', forcePowerDef);

                    this.$emit('edit', forcePower);
                }
                else
                {
                    const forcePower = await eoteMan.addSup('forcePowers', forcePowerDef);

                    this.$emit('add', forcePower);
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

                    if(this.$refs.editorStrength)
                    {
                        this.$refs.editorStrength.codemirror.refresh();
                    } // end if

                    if(this.$refs.editorMagnitude)
                    {
                        this.$refs.editorMagnitude.codemirror.refresh();
                    } // end if

                    if(this.$refs.editorDuration)
                    {
                        this.$refs.editorDuration.codemirror.refresh();
                    } // end if

                    if(this.$refs.editorRange)
                    {
                        this.$refs.editorRange.codemirror.refresh();
                    } // end if

                    if(this.$refs.editorMastery)
                    {
                        this.$refs.editorMastery.codemirror.refresh();
                    } // end if

                    if(this.$refs.editorControl)
                    {
                        this.$refs.editorControl.forEach((ref) =>
                        {
                            ref.codemirror.refresh();
                        });
                    } // end if
                });
            },
            addControl()
            {
                this.upgrades.control.push({ description: '' });
            },

            show(forcePower)
            {
                if(forcePower)
                {
                    this.id = forcePower.id;
                    this.name = forcePower.name;
                    this.minRating = forcePower.minRating;
                    this.description = forcePower.description;
                    this.reference = forcePower.reference;
                    this.upgrades = {
                        ...deepClone(defaultUpgrades),
                        ...forcePower.upgrades
                    };
                }
                else
                {
                    this.id = undefined;
                    this.name = '';
                    this.minRating = 0;
                    this.description = '';
                    this.reference = '';
                    this.upgrades = deepClone(defaultUpgrades);
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
