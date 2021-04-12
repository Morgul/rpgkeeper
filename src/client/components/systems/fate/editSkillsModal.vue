<!----------------------------------------------------------------------------------------------------------------------
  -- editSkillsModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="skills" class="edit-skills-modal">
        <b-modal
            ref="modal"
            header-bg-variant="dark"
            header-text-variant="white"
            size="lg"
            no-close-on-esc
            no-close-on-backdrop
            @ok="onSave"
            @cancel="onCancel"
            @shown="onShown"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <fa icon="file-edit"></fa>
                Edit Skills
            </template>

            <!-- Modal Content -->

            <!-- FIXME: This needs to be refactored so as to not use a v-for and v-if -->
            <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
            <section v-for="rank in ranks" v-if="filterRankSkills(rank.value).length > 0" :key="rank.text" class="skill-group mb-3">
                <h5 class="mb-0">
                    {{ rank.text }}
                </h5>
                <hr class="mt-1" />
                <div v-if="filterRankSkills(rank.value).length < 1">
                    <h6 class="mb-0 text-center">
                        No skills.
                    </h6>
                </div>
                <div v-for="skill in filterRankSkills(rank.value)" :key="skill.name" class="d-flex mb-2">
                    <b-form-input v-model="skill.name"></b-form-input>
                    <b-form-select v-model="skill.rank" class="ml-2 flex-grow-0 flex-shrink-0 w-auto" :options="ranks"></b-form-select>
                    <b-btn variant="danger" class="ml-2" @click="removeSkill(skill)">
                        <fa icon="trash-alt"></fa>
                    </b-btn>
                </div>
            </section>

            <hr />

            <b-card
                header="New Skill"
                header-bg-variant="dark"
                header-text-variant="white"
            >
                <div class="d-flex">
                    <b-form-input id="name-input" v-model="newSkillName" placeholder="Skill name"></b-form-input>
                    <b-form-select v-model="newSkillRank" class="ml-2 flex-grow-0 flex-shrink-0 w-auto" :options="ranks"></b-form-select>
                    <b-btn variant="primary" class="ml-2 text-nowrap" @click="addSkill">
                        <fa icon="plus"></fa>
                        Add
                    </b-btn>
                </div>
            </b-card>

            <!-- Modal Buttons -->
            <template slot="modal-ok">
                <fa icon="save"></fa>
                Save
            </template>
            <template slot="modal-cancel">
                <fa icon="times"></fa>
                Cancel
            </template>
        </b-modal>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    .edit-skills-modal {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../api/managers/character';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditSkillsModal',
        props: {
            value: {
                type: Array,
                required: true
            }
        },
        data()
        {
            return {
                ranks: [
                    {
                        text: 'Superb (+5)',
                        value: 5
                    },
                    {
                        text: 'Great (+4)',
                        value: 4
                    },
                    {
                        text: 'Good (+3)',
                        value: 3
                    },
                    {
                        text: 'Fair (+2)',
                        value: 2
                    },
                    {
                        text: 'Average (+1)',
                        value: 1
                    }
                ],
                skills: _.cloneDeep(this.value),
                newSkillName: '',
                newSkillRank: 1
            };
        },
        computed: {
            skillsSorted() { return _.orderBy(this.skills, [ 'rank', 'name' ], [ 'desc', 'asc' ]); }
        },
        methods: {
            onShown()
            {
                // Copy the v-model value over our skills array.
                this.skills = _.cloneDeep(this.value);

                // Sort on shown
                this.skills = _.orderBy(this.skills, [ 'rank', 'name' ], [ 'desc', 'asc' ]);
            },
            onSave()
            {
                this.$emit('input', this.skills);

                // We have to wait for things to settle from updating the model
                this.$nextTick(async() =>
                {
                    // Save the character
                    try { await charMan.save(); }
                    catch (error)
                    {
                        // TODO: Let the user know about this!
                    } // end if
                });
            },
            onCancel()
            {
                // Clear our local variable
                this.skills = [];
            },

            addSkill()
            {
                this.skills.push({ name: this.newSkillName, rank: this.newSkillRank });
                this.newSkillName = '';
                this.newSkillRank = 1;
            },
            removeSkill(skill)
            {
                // We can't use lodash, since Vue doesn't track whatever magic `_.pull` does.
                // See: https://vuejs.org/v2/guide/list.html#Array-Change-Detection
                const idx = _.findIndex(this.skills, skill);
                if(idx > -1)
                {
                    this.skills.splice(idx, 1);
                } // end if
            },

            filterRankSkills(rank)
            {
                return _.filter(this.skillsSorted, { rank });
            },

            show()
            {
                this.$refs.modal.show();
            },
            hide()
            {
                this.$refs.modal.hide();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
