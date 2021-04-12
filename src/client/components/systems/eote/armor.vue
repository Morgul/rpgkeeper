<!----------------------------------------------------------------------------------------------------------------------
  -- armor.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-armor-block" :class="{ readonly: readonly }" fill no-body>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="helmet-battle"></fa>
                Armor &nbsp;
                <span v-if="armor.name"> - {{ armor.name }}</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <b-table-simple
            v-if="armor.name"
            class="font-sm mb-0"
            small
            hover
        >
            <b-thead>
                <b-tr>
                    <b-th class="text-center">
                        Defense
                    </b-th>
                    <b-th class="text-center">
                        Soak
                    </b-th>
                    <b-th class="text-center">
                        Hardpoints
                    </b-th>
                    <b-th class="text-center">
                        Encumb.
                    </b-th>
                    <b-th class="text-center">
                        Rarity
                    </b-th>
                    <b-th>
                        Upgrades
                    </b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr>
                    <b-td class="text-center">
                        {{ armor.defense }}
                    </b-td>
                    <b-td class="text-center">
                        {{ armor.soak }}
                    </b-td>
                    <b-td class="text-center">
                        {{ armor.hardpoints }}
                    </b-td>
                    <b-td class="text-center">
                        {{ armor.encumbrance }}
                    </b-td>
                    <b-td class="text-center">
                        {{ armor.rarity }}
                    </b-td>
                    <b-td class="text-nowrap w-25">
                        <quality v-for="quality in armor.qualities" :id="quality.id" :key="quality.id" :ranks="quality.ranks"></quality>
                        <h5 v-if="armor.qualities === 0" class="mt-2 text-center">
                            No Upgrades.
                        </h5>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
        <h5 v-else class="mt-2 text-center">
            No armor
        </h5>

        <!-- Edit Modal -->
        <edit-modal ref="editModal"></edit-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #eote-armor-block {
        .table tr {
            cursor: pointer;
        }

        .table tr td {
            vertical-align: middle !important;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';
    import eoteMan from '../../../api/managers/eote';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import EditModal from './modals/editArmorModal.vue';
    import Quality from './components/quality.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotEArmorBlock',
        components: {
            RpgkCard,
            EditModal,
            Quality
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        computed: {
            armor() { return this.character.details.armor; }
        },
        methods: {
            openEditModal(weapon)
            {
                this.$refs.editModal.show(weapon);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
