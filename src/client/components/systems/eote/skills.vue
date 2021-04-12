<!----------------------------------------------------------------------------------------------------------------------
  -- skills.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-skills-block" :class="{ readonly: readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="address-card"></fa>
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
        <div class="d-flex flex-wrap align-content-stretch">
            <div class="skill-column">
                <div class="skill-group">
                    <b>General</b>
                    <b-table
                        class="font-sm"
                        :items="general"
                        :fields="fields"
                        small
                        hover
                        @row-clicked="onRowClicked"
                    >
                        <template #cell(name)="data">
                            <b>{{ data.value }}</b>
                            <small class="text-muted">({{ startCase(data.item.characteristic) }})</small>
                        </template>
                        <template #cell(career)="data">
                            <div class="text-center">
                                <fa :icon="data.value ? 'check-square' : ['far', 'square']"></fa>
                            </div>
                        </template>
                        <template #cell(ranks)="data">
                            <div class="text-nowrap">
                                <fa
                                    v-for="index in range(5)"
                                    :key="index"
                                    class="skill-pip"
                                    :icon="index >= data.value ? ['far', 'circle'] : 'circle'"
                                ></fa>
                            </div>
                        </template>
                    </b-table>
                </div>
                <div v-if="mode === 'genesys' && magic.length" class="skill-group">
                    <b>Magic</b>
                    <b-table
                        class="font-sm"
                        :items="magic"
                        :fields="fields"
                        small
                        hover
                        @row-clicked="onRowClicked"
                    >
                        <template #cell(name)="data">
                            <b>{{ data.value }}</b>
                            <small class="text-muted">({{ startCase(data.item.characteristic) }})</small>
                        </template>
                        <template #cell(career)="data">
                            <div class="text-center">
                                <fa :icon="data.value ? 'check-square' : ['far', 'square']"></fa>
                            </div>
                        </template>
                        <template #cell(ranks)="data">
                            <div class="text-nowrap">
                                <fa
                                    v-for="index in range(5)"
                                    :key="index"
                                    class="skill-pip"
                                    :icon="index >= data.value ? ['far', 'circle'] : 'circle'"
                                ></fa>
                            </div>
                        </template>
                    </b-table>
                </div>
            </div>
            <div class="skill-column">
                <div v-if="combat.length" class="skill-group">
                    <b>Combat</b>
                    <b-table
                        class="font-sm"
                        :items="combat"
                        :fields="fields"
                        small
                        hover
                        @row-clicked="onRowClicked"
                    >
                        <template #cell(name)="data">
                            <b>{{ data.value }}</b>
                            <small class="text-muted">({{ startCase(data.item.characteristic) }})</small>
                        </template>
                        <template #cell(career)="data">
                            <div class="text-center">
                                <fa :icon="data.value ? 'check-square' : ['far', 'square']"></fa>
                            </div>
                        </template>
                        <template #cell(ranks)="data">
                            <div class="text-nowrap">
                                <fa
                                    v-for="index in range(5)"
                                    :key="index"
                                    class="skill-pip"
                                    :icon="index >= data.value ? ['far', 'circle'] : 'circle'"
                                ></fa>
                            </div>
                        </template>
                    </b-table>
                </div>
                <div v-if="social.length" class="skill-group">
                    <b>Social</b>
                    <b-table
                        class="font-sm"
                        :items="social"
                        :fields="fields"
                        small
                        hover
                        @row-clicked="onRowClicked"
                    >
                        <template #cell(name)="data">
                            <b>{{ data.value }}</b>
                            <small class="text-muted">({{ startCase(data.item.characteristic) }})</small>
                        </template>
                        <template #cell(career)="data">
                            <div class="text-center">
                                <fa :icon="data.value ? 'check-square' : ['far', 'square']"></fa>
                            </div>
                        </template>
                        <template #cell(ranks)="data">
                            <div class="text-nowrap">
                                <fa
                                    v-for="index in range(5)"
                                    :key="index"
                                    class="skill-pip"
                                    :icon="index >= data.value ? ['far', 'circle'] : 'circle'"
                                ></fa>
                            </div>
                        </template>
                    </b-table>
                </div>
                <div v-if="knowledge.length" class="skill-group">
                    <b>Knowledge</b>
                    <b-table
                        class="font-sm mb-0"
                        :items="knowledge"
                        :fields="fields"
                        small
                        hover
                        @row-clicked="onRowClicked"
                    >
                        <template #cell(name)="data">
                            <b>{{ data.value }}</b>
                            <small class="text-muted">({{ startCase(data.item.characteristic) }})</small>
                        </template>
                        <template #cell(career)="data">
                            <div class="text-center">
                                <fa :icon="data.value ? 'check-square' : ['far', 'square']"></fa>
                            </div>
                        </template>
                        <template #cell(ranks)="data">
                            <div class="text-nowrap">
                                <fa
                                    v-for="index in range(5)"
                                    :key="index"
                                    class="skill-pip"
                                    :icon="index >= data.value ? ['far', 'circle'] : 'circle'"
                                ></fa>
                            </div>
                        </template>
                    </b-table>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <edit-modal ref="editModal"></edit-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #eote-skills-block {
        .table tr {
            cursor: pointer;
        }

        .skill-column {
            flex: 1 1 auto;
        }

        .skill-group {
            margin-right: 0.5rem;
            margin-left: 0.5rem;
        }

        .skill-pip {
            margin-right: 1px;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../api/managers/character';
    import eoteMan from '../../../api/managers/eote';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import EditModal from './modals/editSkillsModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotESkillsBlock',
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
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                skillTypes: {
                    column1: [ 'general', 'magic' ],
                    column2: [ 'combat', 'social', 'knowledge' ]
                },
                fields: [ 'name', 'career', 'ranks' ]
            };
        },
        computed: {
            general()
            {
                return this.character.details.skills.filter((skill) => skill.type === 'general');
            },
            magic()
            {
                return this.character.details.skills.filter((skill) => skill.type === 'magic');
            },
            combat()
            {
                return this.character.details.skills.filter((skill) => skill.type === 'combat');
            },
            social()
            {
                return this.character.details.skills.filter((skill) => skill.type === 'social');
            },
            knowledge()
            {
                return this.character.details.skills.filter((skill) => skill.type === 'knowledge');
            }
        },
        methods: {
            onRowClicked(item)
            {
                const dice = { ability: 0, proficiency: 0 };
                const charCount = this.character.details.characteristics[item.characteristic];
                const rankCount = item.ranks;

                if(charCount > rankCount)
                {
                    dice.ability = charCount - rankCount;
                    dice.proficiency = rankCount;
                }
                else
                {
                    dice.ability = rankCount - charCount;
                    dice.proficiency = charCount;
                } // end if

                this.$emit('roll', dice, item.name);
            },
            openEditModal()
            {
                this.$refs.editModal.show();
            },
            range(num)
            {
                return _.range(num);
            },
            startCase(text)
            {
                return _.startCase(text);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
