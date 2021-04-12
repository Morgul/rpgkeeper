<!----------------------------------------------------------------------------------------------------------------------
  -- Force Pool
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-force-pool-block" :class="{ readonly: readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="jedi"></fa>
                <span class="d-none d-md-inline">Force</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <div v-if="forcePool.sensitive" class="d-flex">
            <div class="flex-fill mr-2">
                <label class="d-block text-center mt-2"><b>Committed</b></label>
                <b-form-spinbutton v-model="forcePool.committed" min="0" :max="forcePool.rating" step="1" class="mt-2"></b-form-spinbutton>
            </div>
            <b-card class="flex-fill" no-body>
                <div class="p-2 text-center">
                    <b>Rating</b>
                    <hr class="m-1" />
                    <h5 class="m-0">
                        {{ forcePool.rating - forcePool.committed }} / <small class="text-muted">{{ forcePool.rating }}</small>
                    </h5>
                </div>
            </b-card>
        </div>
        <div v-else class="d-flex text-center">
            <div class="flex-fill">
                <i>Not force sensitive.</i>
            </div>
        </div>

        <!-- Edit Modal -->
        <edit-modal ref="editModal"></edit-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #eote-force-pool-block {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import EditModal from './modals/editForcePoolModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotEForcePoolBlock',
        components: {
            RpgkCard,
            EditModal
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            character: charMan.selected$
        },
        computed: {
            forcePool() { return this.character.details.force; }
        },
        methods: {
            openEditModal()
            {
                this.$refs.editModal.show();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
