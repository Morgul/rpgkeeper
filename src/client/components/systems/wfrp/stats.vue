<!----------------------------------------------------------------------------------------------------------------------
  -- Wfrp Stats
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="wfrp-stats-block" :class="{ readonly: readonly }" fill no-body>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="flame"></fa>
                <span class="d-none d-md-inline">Stats</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <b-list-group v-if="stats && stats.length > 0" flush>
            <b-list-group-item v-for="stat in stats" :key="stat.description" class="d-flex">
                <div class="d-inline-block flex-fill">
                    <div>
                        <b>{{ stat.description }}</b> ({{ stat.value }})
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
        <div v-else class="card-body">
            <h4 class="text-center text-muted m-0">
                No Stats.
            </h4>
        </div>

        <!-- Edit Modal -->
        <edit-stats-modal ref="editModal" v-model="character.details.stats"></edit-stats-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #wfrp-stats-block {
        &.card:not(.readonly) {
            .card-header {
                padding-top: 0.5rem !important;
                padding-bottom: 0.5rem !important;
            }
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import EditStatsModal from './editStatsModal.vue';
    import RpgkCard from '../../ui/card.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'WfrpStatsCard',
        components: {
            EditStatsModal,
            RpgkCard
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
            stats() { return this.character.details.stats; }
        },
        methods: {
            onChange()
            {
                if(!this.readonly)
                {
                    // Save the character
                    return charMan.save(charMan.selected);
                } // end if
            },
            openEditModal()
            {
                this.$refs.editModal.show();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
