<!----------------------------------------------------------------------------------------------------------------------
  -- Wfrp Skills
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="wfrp-skills-block" :class="{ readonly: readonly }" fill no-body>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="flame"></fa>
                <span class="d-none d-md-inline">Skills</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <b-list-group v-if="skills && skills.length > 0" flush>
            <b-list-group-item v-for="skill in skills" :key="skill.description" class="d-flex">
                <div class="d-inline-block flex-fill">
                    <div>
                        <b>{{ skill.description }}</b> ({{ skill.value }})
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
        <div v-else class="card-body">
            <h4 class="text-center text-muted m-0">
                No Skills yet.
            </h4>
        </div>

        <!-- Edit Modal -->
        <edit-skills-modal ref="editModal" v-model="character.details.skills"></edit-skills-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #wfrp-skills-block {
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
    import EditSkillsModal from './editSkillsModal.vue';
    import RpgkCard from '../../ui/card.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'WfrpSkillsCard',
        components: {
            EditSkillsModal,
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
            skills() { return this.character.details.skills; }
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
