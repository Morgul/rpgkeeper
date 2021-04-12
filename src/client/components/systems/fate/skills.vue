<!----------------------------------------------------------------------------------------------------------------------
  -- Skills Component
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="fate-skills" class="ml-2" :class="{ readonly: readonly }" no-body fill>
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="scroll"></fa>
                <span class="d-none d-md-inline">Skills</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Content -->
        <table class="table table-bordered mb-0 font-sm">
            <!-- eslint-disable-next-line vue/no-template-shadow -->
            <tr v-for="{ name, skills } in rows" :key="name">
                <td class="text-right text-nowrap" style="width: 1%">
                    <b>{{ name }}</b>
                </td>
                <td v-for="columnIdx in columns" :key="columnIdx" style="min-width: 80px">
                    {{ (skills[columnIdx] || {}).name }}
                </td>
            </tr>
        </table>

        <!-- Modals -->
        <edit-skills-modal ref="editModal" v-model="skills" :readonly="readonly"></edit-skills-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #fate-skills {
        table {
            border-left: none !important;
            border-right: none !important;

            td:first-child {
                border-left: none !important;
            }

            td:last-child {
                border-right: none !important;
            }
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import EditSkillsModal from './editSkillsModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'FateSkillsCard',
        components: {
            EditSkillsModal,
            RpgkCard
        },
        props: {
            value: {
                type: Array,
                required: true
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            skills: {
                get() { return _.orderBy(this.value, [ 'rank', 'name' ], [ 'desc', 'asc' ]); },
                set(val) { this.$emit('input', val); }
            },
            averageSkills() { return _.filter(this.skills, { rank: 1 }); },
            fairSkills() { return _.filter(this.skills, { rank: 2 }); },
            goodSkills() { return _.filter(this.skills, { rank: 3 }); },
            greatSkills() { return _.filter(this.skills, { rank: 4 }); },
            superbSkills() { return _.filter(this.skills, { rank: 5 }); },

            rows()
            {
                const skillList = [
                    {
                        name: 'Superb (+5)',
                        skills: this.superbSkills
                    },
                    {
                        name: 'Great (+4)',
                        skills: this.greatSkills
                    },
                    {
                        name: 'Good (+3)',
                        skills: this.goodSkills
                    },
                    {
                        name: 'Fair (+2)',
                        skills: this.fairSkills
                    },
                    {
                        name: 'Average (+1)',
                        skills: this.averageSkills
                    }
                ];

                return _.filter(skillList, ({ skills }) =>
                {
                    return skills.length > 0;
                });
            },
            columns()
            {
                const maxLength = this.rows.reduce((max, { skills }) => Math.max(max, skills.length), 5);
                return _.range(maxLength);
            }
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
