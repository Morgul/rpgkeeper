<!----------------------------------------------------------------------------------------------------------------------
  -- EditForcePowersModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="character" class="edit-force-powers-modal">
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
                Edit Force Powers
            </template>

            <!-- Modal Content -->
            <div :class="`${ mode }-system`">
                <supplement-select
                    ref="suppSelect"
                    label="Force Powers"
                    label-class="font-weight-bold"
                    :available="forcePowers"
                    :selected="selectedForcePowers"
                    @add="onForcePowerAdd"
                    @remove="onForcePowerRemove"
                    @new="onForcePowerNew"
                    @edit="onForcePowerEdit"
                    @delete="onForcePowerDelete"
                >
                    <template #preview="{ instance, supplement }">
                        <div class="clearfix mb-3">
                            <markdown-block :text="supplement.description" inline></markdown-block>
                        </div>
                        <h5>Upgrades</h5>
                        <b-table
                            class="font-sm"
                            :items="getUpgrades(instance, supplement)"
                            :fields="upgradeFields"
                            thead-class="d-none"
                            small
                            show-empty
                        >
                            <template #empty>
                                <div class="text-center">
                                    <i>No Upgrades</i>
                                </div>
                            </template>

                            <template #cell(name)="data">
                                <b>{{ sentenceCase(data.value) }}</b>
                                <pool
                                    v-model="data.item.purchased"
                                    :max="supplement.upgrades[data.value].available || 1"
                                    size="1x"
                                    no-edit
                                    no-auto-save
                                    @update="onUpgradeModify(data, instance)"
                                ></pool>
                            </template>
                            <template #cell(description)="data">
                                <markdown-block :text="data.value" inline></markdown-block>
                            </template>
                        </b-table>
                        <reference
                            class="float-right mt-2"
                            :reference="supplement.reference"
                        ></reference>
                    </template>
                </supplement-select>
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

        <!-- Modals -->
        <add-edit-force-powers-modal ref="addEditForcePowersModal" @add="onForcePowerAdd"></add-edit-force-powers-modal>
        <delete-modal
            ref="delForcePowersModal"
            :name="delForcePower.name"
            type="forcePower"
            @hidden="onDelForcePowerHidden"
            @delete="onDelForcePowerDelete"
        ></delete-modal>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    td.upgrade-name {
        min-width: 80px;
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
    import SupplementSelect from '../../../character/supplementSelect.vue';
    import DeleteModal from '../../../ui/deleteModal.vue';
    import MarkdownBlock from '../../../ui/markdown.vue';
    import Reference from '../../../character/reference.vue';
    import AddEditForcePowersModal from './addEditForcePowersModal.vue';
    import Pool from '../../../character/pool';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditForcePowersModal',
        components: {
            Pool,
            DeleteModal,
            SupplementSelect,
            MarkdownBlock,
            Reference,
            AddEditForcePowersModal
        },
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$,
            forcePowers: eoteMan.forcePowers$
        },
        data()
        {
            return {
                upgradeFields: [
                    { key: 'name', tdClass: 'upgrade-name' },
                    { key: 'description' }
                ],
                selectedForcePowers: [],
                delForcePower: {
                    id: undefined,
                    name: undefined
                }
            };
        },
        methods: {
            async onSave()
            {
                this.character.details.force.powers = this.selectedForcePowers;

                // Save the character
                await charMan.save(this.character);
            },
            onShown()
            {
                this.selectedForcePowers = this.character.details.force.powers.concat();
            },
            onForcePowerAdd(forcePower)
            {
                const newForcePower = {
                    id: forcePower.id,
                    upgrades: { strength: 0, magnitude: 0, duration: 0, range: 0, control: [], mastery: 0 }
                };

                this.selectedForcePowers.push(newForcePower);
                this.selectedForcePowers = _.uniqBy(this.selectedForcePowers, 'id');
            },
            onForcePowerRemove(forcePower)
            {
                this.selectedForcePowers = _.remove(this.selectedForcePowers, (item) => item.id !== forcePower.id);
            },
            onForcePowerNew()
            {
                this.$refs.addEditForcePowersModal.show();
            },
            onForcePowerEdit(forcePower)
            {
                this.$refs.addEditForcePowersModal.show(forcePower);
            },
            onForcePowerDelete(forcePower)
            {
                this.delForcePower.id = forcePower.id;
                this.delForcePower.name = forcePower.name;

                this.$refs.delForcePowersModal.show();
            },
            onDelForcePowerHidden()
            {
                this.delForcePower.id = '';
                this.delForcePower.name = '';
            },
            async onDelForcePowerDelete()
            {
                this.$refs.suppSelect.clearSelection();
                this.selectedForcePowers = this.selectedForcePowers.filter((item) => item.id !== this.delForcePower.id);
                this.character.details.forcePowers = this.selectedForcePowers;

                return Promise.all([
                    await charMan.save(this.character),
                    await eoteMan.delSup('forcePowers', this.delForcePower)
                ]);
            },
            onUpgradeModify({ item, value }, instance)
            {
                // Are we an array'd upgrade, or not?
                if(item.index === undefined)
                {
                    // Simple upgrade case, just update the instance
                    instance.upgrades[value] = item.purchased;
                }
                else
                {
                    // More complicated, we have to mess with the purchased array
                    let purchased = instance.upgrades[value];
                    if(item.purchased)
                    {
                        // We add `item.index` to the list of purchased upgrades
                        purchased.push(item.index);
                    }
                    else
                    {
                        // We have to remove `item.index` from the list of purchased upgrades
                        purchased = purchased.filter((instIdx) => instIdx !== item.index);
                    } // end if

                    instance.upgrades[value] = purchased;
                } // end if
            },
            getUpgrades(instance, supplement)
            {
                return Object.keys(supplement.upgrades).reduce((upgrades, name) =>
                {
                    const upgrade = supplement.upgrades[name];
                    const upgradeInst = instance.upgrades[name];

                    if(Array.isArray(upgrade))
                    {
                        // If it's an array (i.e. `control`) we just add them as individual upgrades, all with the same
                        // name. This is find, because we don't assume the name is unique. Also, we add the `index`
                        // property, because that tells us which control item we've purchased.
                        upgrades = upgrades.concat(upgrade.map((up, index) =>
                        {
                            const purchased = upgradeInst.includes(index) ? 1 : 0;
                            return {
                                ...up,
                                name,
                                index,
                                purchased
                            };
                        }));
                    }
                    else
                    {
                        // In the simple case, we just push the upgrade with the name.
                        upgrades.push({ ...upgrade, name, purchased: upgradeInst });
                    } // end if

                    return upgrades;
                }, []);
            },

            sentenceCase(text)
            {
                return _.startCase(text);
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
