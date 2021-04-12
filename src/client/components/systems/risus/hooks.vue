<!----------------------------------------------------------------------------------------------------------------------
  -- Risus Hooks
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="risus-hooks-block" :class="{ readonly: readonly }" fill no-body>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="fist-raised"></fa>
                <span class="d-none d-md-inline">Hooks</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <b-list-group v-if="hooks && hooks.length > 0" flush>
            <b-list-group-item v-for="hook in hooks" :key="hook.description" class="d-flex">
                <fa class="mr-2" icon="bolt" style="margin-top: 5px;"></fa>
                <markdown :text="hook.description" inline></markdown>
            </b-list-group-item>
        </b-list-group>
        <div v-else class="card-body">
            <h4 class="text-center text-muted m-0">
                No Hooks.
            </h4>
        </div>

        <!-- Edit Modal -->
        <edit-hooks-modal ref="editModal" v-model="character.details.hooks"></edit-hooks-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #risus-hooks-block {
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
    import EditHooksModal from './editHooksModal.vue';
    import Markdown from '../../ui/markdown.vue';
    import RpgkCard from '../../ui/card.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'RisusHooksCard',
        components: {
            EditHooksModal,
            Markdown,
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
            hooks() { return this.character.details.hooks; }
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
