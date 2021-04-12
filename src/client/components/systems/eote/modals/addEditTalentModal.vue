<!----------------------------------------------------------------------------------------------------------------------
  -- AddEditTalentModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="add-talent-modal">
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
                Talent
            </template>

            <!-- Modal Content -->
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
                <b-col cols="2" class="pt-4">
                    <b-form-checkbox v-model="ranked" class="mt-3" name="ranked-check" switch>
                        <b>Ranked</b>
                    </b-form-checkbox>
                </b-col>
            </b-form-row>
            <b-form-row>
                <b-col>
                    <b-form-group
                        label="Activation"
                        label-class="font-weight-bold"
                        label-for="activation-input"
                    >
                        <b-form-select id="activation-input" v-model="activation" :options="activations"></b-form-select>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group
                        v-if="mode === 'eote'"
                        label="Trees"
                        label-class="font-weight-bold"
                        label-for="trees-input"
                    >
                        <b-form-input id="trees-input" v-model="trees" autocomplete="off"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        v-else
                        label="Tiers"
                        label-class="font-weight-bold"
                        label-for="tiers-input"
                    >
                        <b-form-input
                            id="tiers-input"
                            v-model.number="tier"
                            type="number"
                            step="1"
                            min="1"
                            max="5"
                            autocomplete="off"
                        ></b-form-input>
                    </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-group
                id="extras-input-group"
                label="Description"
                label-class="font-weight-bold"
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
    .add-talent-modal {
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

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'AddTalentModal',
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
                activation: '',
                trees: '',
                tier: 1,
                reference: '',
                ranked: false
            };
        },
        computed: {
            isEdit() { return this.id !== undefined; },
            activations()
            {
                return Object.keys(eoteMan.activationEnum)
                    .map((value) =>
                    {
                        const text = eoteMan.activationEnum[value];
                        return {
                            text,
                            value
                        };
                    });
            }
        },
        methods: {
            async onSave()
            {
                if(this.isEdit)
                {
                    const talent = await eoteMan.editSup('talents', {
                        id: this.id,
                        name: this.name,
                        description: this.description,
                        activation: this.activation,
                        trees: this.trees,
                        tier: this.tier,
                        ranked: this.ranked,
                        reference: this.reference
                    });

                    this.$emit('edit', talent);
                }
                else
                {
                    const talent = await eoteMan.addSup('talents', {
                        name: this.name,
                        description: this.description,
                        activation: this.activation,
                        trees: this.trees,
                        tier: this.tier,
                        ranked: this.ranked,
                        reference: this.reference
                    });

                    this.$emit('add', talent);
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

            show(talent)
            {
                if(talent)
                {
                    this.id = talent.id;
                    this.name = talent.name;
                    this.description = talent.description;
                    this.ranked = !!talent.ranked;
                    this.trees = talent.trees;
                    this.tier = talent.tier;
                    this.activation = talent.activation;
                    this.reference = talent.reference;
                }
                else
                {
                    this.id = undefined;
                    this.name = '';
                    this.description = '';
                    this.activation = '';
                    this.trees = '';
                    this.tier = 1;
                    this.reference = '';
                    this.ranked = false;
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
