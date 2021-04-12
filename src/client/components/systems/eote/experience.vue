<!----------------------------------------------------------------------------------------------------------------------
  -- experience.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-experience-block" :class="{ readonly: readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="user-hard-hat"></fa>
                <span class="d-none d-md-inline">Experience</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <div class="d-flex">
            <b-card class="flex-fill mr-2" no-body>
                <div class="p-2 text-center">
                    <b>Total</b>
                    <hr class="m-1" />
                    <h5 class="m-0">
                        {{ experience.total }}
                    </h5>
                </div>
            </b-card>
            <b-card class="flex-fill" no-body>
                <div class="p-2 text-center">
                    <b>Available / Spent</b>
                    <hr class="m-1" />
                    <h5 class="m-0">
                        {{ experience.available }} / {{ experience.total - experience.available }}
                    </h5>
                </div>
            </b-card>
        </div>

        <!-- Edit Modal -->
        <edit-modal ref="editModal"></edit-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #eote-experience-block {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import EditModal from './modals/editExperienceModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotEExperienceBlock',
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
            experience() { return this.character.details.experience; }
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
