<!----------------------------------------------------------------------------------------------------------------------
  -- talents.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-talents-block" :class="{ readonly: readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="fist-raised"></fa>
                <span class="d-none d-md-inline">Talents</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <component :is="mode" ref="subTalent"></component>

        <!-- Modals -->
        <edit-talents-modal ref="editTalentsModal"></edit-talents-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #eote-talents-block {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import eoteMan from '../../../api/managers/eote';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import EotETalents from './sub/eoteTalents.vue';
    import GenesysTalents from './sub/genesysTalents.vue';
    import EditTalentsModal from './modals/editTalentsModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotETalentsBlock',
        components: {
            RpgkCard,
            eote: EotETalents,
            genesys: GenesysTalents,
            EditTalentsModal
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            mode: eoteMan.mode$
        },
        methods: {
            openEditModal()
            {
                this.$refs.editTalentsModal.show();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
