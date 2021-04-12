<!----------------------------------------------------------------------------------------------------------------------
  -- forcePowers.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-force-powers-block" :class="{ readonly: readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="journal-whills"></fa>
                <span class="d-none d-md-inline">ForcePowers</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <div>
            <b-form-row>
                <b-col v-for="forcePower in forcePowers" :key="forcePower.name" cols="12">
                    <force-power-card class="mb-2" :power="forcePower"></force-power-card>
                </b-col>
            </b-form-row>

            <h5 v-if="forcePowers.length === 0" class="m-0 text-center">
                No Force Powers
            </h5>
        </div>

        <!-- Modals -->
        <edit-force-powers-modal ref="editForcePowersModal"></edit-force-powers-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #eote-force-powers-block {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import eoteMan from '../../../api/managers/eote';
    import charMan from '../../../api/managers/character';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import EditForcePowersModal from './modals/editForcePowersModal.vue';
    import ForcePowerCard from './components/forcePowerCard.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotEForcePowersBlock',
        components: {
            RpgkCard,
            ForcePowerCard,
            EditForcePowersModal
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            mode: eoteMan.mode$,
            character: charMan.selected$
        },
        computed: {
            forcePowers()
            {
                return _.sortBy(
                    this?.character?.details?.force?.powers ?? [],
                    (powerInst) =>
                    {
                        const powerBase = _.find(eoteMan.forcePowers, { id: powerInst.id });
                        return (powerBase || {}).name;
                    }
                );
            }
        },
        methods: {
            openEditModal()
            {
                this.$refs.editForcePowersModal.show();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
