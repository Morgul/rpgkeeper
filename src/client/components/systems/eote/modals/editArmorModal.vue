<!----------------------------------------------------------------------------------------------------------------------
  -- EditArmorModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-armor-modal">
        <b-modal
            id="armorModal"
            ref="modal"
            header-bg-variant="dark"
            header-text-variant="white"
            no-close-on-esc
            no-close-on-backdrop
            body-class="position-static"
            size="xl"
            @ok="onSave"
            @shown="onShown"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <fa icon="file-edit"></fa>
                Edit Armor
            </template>

            <!-- Modal Content -->
            <div :class="`${ mode }-system`">
                <b-form-row>
                    <b-form-group
                        class="flex-fill pr-1 w-50"
                        label="Name"
                        label-class="font-weight-bold"
                        label-for="name-input"
                    >
                        <b-form-input id="name-input" v-model="editArmor.name" type="text"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="flex-fill pl-1 w-25"
                        label="Hardpoints"
                        label-class="font-weight-bold"
                        label-for="armor-hardpoints"
                    >
                        <b-form-input id="armor-hardpoints" v-model.number="editArmor.hardpoints" type="number" min="0" step="0"></b-form-input>
                    </b-form-group>
                </b-form-row>

                <b-form-row>
                    <b-form-group
                        class="flex-fill pr-1 w-25"
                        label="Defense"
                        label-class="font-weight-bold"
                        label-for="armor-damage"
                    >
                        <b-form-input id="armor-damage" v-model.number="editArmor.defense" type="number" min="0" step="0"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="flex-fill pl-1 pr-1 w-25"
                        label="Soak"
                        label-class="font-weight-bold"
                        label-for="armor-critical"
                    >
                        <b-form-input id="armor-critical" v-model.number="editArmor.soak" type="number" min="0" step="0"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="flex-fill pl-1 pr-1 w-25"
                        label="Encumb."
                        label-class="font-weight-bold"
                        label-for="armor-encumbrance"
                    >
                        <b-form-input id="armor-encumbrance" v-model.number="editArmor.encumbrance" type="number" min="0" step="0"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="flex-fill pl-1 w-25"
                        label="Rarity"
                        label-class="font-weight-bold"
                        label-for="armor-rarity"
                    >
                        <b-form-input id="armor-rarity" v-model.number="editArmor.rarity" type="number" min="0" step="0"></b-form-input>
                    </b-form-group>
                </b-form-row>

                <quality-edit v-model="editArmor.qualities"></quality-edit>

                <b-form-row>
                    <b-col cols="8" offset="2">
                        <b-button variant="danger" block @click="clear()">
                            <fa icon="trash-alt"></fa>
                            Clear Armor
                        </b-button>
                    </b-col>
                </b-form-row>
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
    #armorModal {
        .modal-content {
            overflow: initial !important;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../../api/managers/character';
    import eoteMan from '../../../../api/managers/eote';

    // Components
    import QualityEdit from '../components/qualityEdit.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'AddEditArmorModal',
        components: {
            QualityEdit
        },
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$,
            qualities: eoteMan.qualities$
        },
        data()
        {
            return {
                editArmor: {
                    name: '',
                    defense: 0,
                    soak: 0,
                    hardpoints: 0,
                    encumbrance: 0,
                    rarity: 0,
                    qualities: []
                }
            };
        },
        methods: {
            async onSave()
            {
                this.character.details.armor = _.cloneDeep(this.editArmor);

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                if(this.character.details.armor.name)
                {
                    this.editArmor = _.cloneDeep(this.character.details.armor);
                }
                else
                {
                    // Reset the edit fields
                    this.clear();
                } // end if
            },

            show()
            {
                this.$refs.modal.show();
            },
            hide()
            {
                this.$refs.modal.hide();
            },
            clear()
            {
                this.$set(this, 'editArmor', {
                    name: '',
                    defense: 0,
                    soak: 0,
                    hardpoints: 0,
                    encumbrance: 0,
                    rarity: 0,
                    qualities: []
                });
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
