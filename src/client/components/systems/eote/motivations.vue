<!----------------------------------------------------------------------------------------------------------------------
  -- Motivations
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-motivations-block" :class="{ readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="angel"></fa>
                <span class="d-none d-md-inline">Motivations</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <div class="d-flex flex-wrap">
            <div class="w-50 flex-grow-1">
                <b>Strength:</b>
                <motivation v-if="motivations.strength" :id="motivations.strength"></motivation>
                <i v-else>None</i>
            </div>
            <div class="w-50 flex-grow-1">
                <b>Flaw:</b>
                <motivation v-if="motivations.flaw" :id="motivations.flaw"></motivation>
                <i v-else>None</i>
            </div>
            <div class="w-50 flex-grow-1">
                <b>Desire:</b>
                <motivation v-if="motivations.desire" :id="motivations.desire"></motivation>
                <i v-else>None</i>
            </div>
            <div class="w-50 flex-grow-1">
                <b>Fear:</b>
                <motivation v-if="motivations.fear" :id="motivations.fear"></motivation>
                <i v-else>None</i>
            </div>
        </div>

        <!-- Edit Modal -->
        <edit-modal ref="editModal"></edit-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #eote-motivations-block {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import Motivation from './components/motivation.vue';
    import RpgkCard from '../../ui/card.vue';
    import EditModal from './modals/editMotivationsModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'GenesysMotivationsBlock',
        components: {
            Motivation,
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
            motivations() { return this.character.details.motivations; }
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
