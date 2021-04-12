<!----------------------------------------------------------------------------------------------------------------------
  -- EditWeaponsModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-weapons-modal">
        <b-modal
            id="weapModal"
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
                <span v-if="isAdd">
                    <fa icon="plus"></fa>
                    Add
                </span>
                <span v-else>
                    <fa icon="file-edit"></fa>
                    Edit
                </span>
                Weapons
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
                        <b-form-input id="name-input" v-model="editWeapon.name" type="text"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="flex-fill pl-1 pr-1 w-25"
                        label="Skill"
                        label-class="font-weight-bold"
                        label-for="skill-input"
                    >
                        <b-form-select id="skill-input" v-model="editWeapon.skill" :options="skillNames"></b-form-select>
                    </b-form-group>
                    <b-form-group
                        class="flex-fill pl-1 w-25"
                        label="Range"
                        label-class="font-weight-bold"
                        label-for="range-input"
                    >
                        <b-form-select id="range-input" v-model="editWeapon.range" :options="rangeOptions"></b-form-select>
                    </b-form-group>
                </b-form-row>

                <b-form-row>
                    <b-form-group
                        class="flex-fill pr-1 w-25"
                        label="Damage"
                        label-class="font-weight-bold"
                        label-for="skill-damage"
                    >
                        <b-form-input id="skill-damage" v-model.number="editWeapon.damage" type="number" min="0" step="0"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="flex-fill pl-1 pr-1 w-25"
                        label="Critical"
                        label-class="font-weight-bold"
                        label-for="skill-critical"
                    >
                        <b-form-input id="skill-critical" v-model.number="editWeapon.criticalRating" type="number" min="0" step="0"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="flex-fill pl-1 pr-1 w-25"
                        label="Encumb."
                        label-class="font-weight-bold"
                        label-for="skill-encumbrance"
                    >
                        <b-form-input id="skill-encumbrance" v-model.number="editWeapon.encumbrance" type="number" min="0" step="0"></b-form-input>
                    </b-form-group>
                    <b-form-group
                        class="flex-fill pl-1 w-25"
                        label="Rarity"
                        label-class="font-weight-bold"
                        label-for="skill-rarity"
                    >
                        <b-form-input id="skill-rarity" v-model.number="editWeapon.rarity" type="number" min="0" step="0"></b-form-input>
                    </b-form-group>
                </b-form-row>

                <quality-edit v-model="editWeapon.qualities"></quality-edit>
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
    #weapModal {
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
        name: 'AddEditWeaponsModal',
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
                weapon: undefined,
                editWeapon: {
                    weaponID: undefined,
                    name: undefined,
                    skill: undefined,
                    damage: 0,
                    criticalRating: 0,
                    range: 'm',
                    encumbrance: 0,
                    rarity: 0,
                    qualities: []
                }
            };
        },
        computed: {

            isAdd() { return !this.weapon; },
            skillNames() { return this.character.details.skills.map((skill) => skill.name).sort(); },
            rangeOptions()
            {
                return Object.keys(eoteMan.rangeEnum).map((rng) =>
                {
                    return {
                        text: eoteMan.rangeEnum[rng],
                        value: rng
                    };
                });
            }
        },
        methods: {
            async onSave()
            {
                const index = this.character.details.weapons.indexOf(this.weapon);
                if(index !== -1)
                {
                    this.character.details.weapons.splice(index, 1, this.editWeapon);
                }
                else
                {
                    this.character.details.weapons.push(this.editWeapon);
                } // end if

                // Save the character
                await charMan.save(this.character);

                // Cleanup the modal
                this.weapon = undefined;
            },
            onShown()
            {
                // Reset the edit fields
                if(this.weapon)
                {
                    this.$set(this, 'editWeapon', _.cloneDeep(this.weapon));
                }
                else
                {
                    this.weapon = undefined;
                    this.$set(this, 'editWeapon', {
                        weaponID: undefined,
                        name: undefined,
                        skill: undefined,
                        damage: 0,
                        criticalRating: 0,
                        range: 'm',
                        encumbrance: 0,
                        rarity: 0,
                        qualities: []
                    });
                } // end if
            },

            show(weapon)
            {
                this.weapon = weapon;
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
