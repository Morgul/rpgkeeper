<!----------------------------------------------------------------------------------------------------------------------
  -- editSkillsModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="skills" class="edit-skills-modal">
        <b-modal
            ref="modal"
            header-bg-variant="dark"
            header-text-variant="white"
            size="xl"
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
            <div class="skill-group">
                <h4>General</h4>
                <div v-for="(skill, index) in skills" :key="index" class="mb-2">
                    <div v-if="skill.type === 'general'" class="d-flex">
                        <b-btn-group>
                            <b-btn :disabled="index === 0" @click="moveSkillUp(index)">
                                <fa icon="chevron-up"></fa>
                            </b-btn>
                            <b-btn :disabled="index === (skills.length - 1)" @click="moveSkillDown(index)">
                                <fa icon="chevron-down"></fa>
                            </b-btn>
                        </b-btn-group>
                        <b-form-input v-model="skill.name" class="ml-2" placeholder="Name"></b-form-input>
                        <b-form-checkbox v-model="skill.career" class="ml-2 mt-2" name="check-button" switch>
                            Career
                        </b-form-checkbox>
                        <b-form-input v-model.number="skill.ranks" class="ml-2" type="number" min="0" max="5" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                        <b-form-select v-model="skill.characteristic" class="ml-2" :options="characteristics"></b-form-select>
                        <b-form-select v-model="skill.type" class="ml-2" :options="skillTypes"></b-form-select>
                        <b-btn variant="danger" class="ml-2" @click="removeSkill(index)">
                            <fa icon="trash-alt"></fa>
                        </b-btn>
                    </div>
                </div>
                <h5 v-if="skills.filter((skill) => skill.type === 'general').length === 0" class="text-center">
                    No skills.
                </h5>
            </div>
            <div v-if="mode === 'genesys'" class="skill-group">
                <h4>Magic</h4>
                <div v-for="(skill, index) in skills" :key="index" class="mb-2">
                    <div v-if="skill.type === 'magic'" class="d-flex">
                        <b-btn-group>
                            <b-btn :disabled="index === 0" @click="moveSkillUp(index)">
                                <fa icon="chevron-up"></fa>
                            </b-btn>
                            <b-btn :disabled="index === (skills.length - 1)" @click="moveSkillDown(index)">
                                <fa icon="chevron-down"></fa>
                            </b-btn>
                        </b-btn-group>
                        <b-form-input v-model="skill.name" class="ml-2" placeholder="Name"></b-form-input>
                        <b-form-checkbox v-model="skill.career" class="ml-2 mt-2" name="check-button" switch>
                            Career
                        </b-form-checkbox>
                        <b-form-input v-model.number="skill.ranks" class="ml-2" type="number" min="0" max="5" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                        <b-form-select v-model="skill.characteristic" class="ml-2" :options="characteristics"></b-form-select>
                        <b-form-select v-model="skill.type" class="ml-2" :options="skillTypes"></b-form-select>
                        <b-btn variant="danger" class="ml-2" @click="removeSkill(index)">
                            <fa icon="trash-alt"></fa>
                        </b-btn>
                    </div>
                </div>
                <h5 v-if="skills.filter((skill) => skill.type === 'magic').length === 0" class="text-center">
                    No skills.
                </h5>
            </div>
            <div class="skill-group">
                <h4>Combat</h4>
                <div v-for="(skill, index) in skills" :key="index" class="mb-2">
                    <div v-if="skill.type === 'combat'" class="d-flex">
                        <b-btn-group>
                            <b-btn :disabled="index === 0" @click="moveSkillUp(index)">
                                <fa icon="chevron-up"></fa>
                            </b-btn>
                            <b-btn :disabled="index === (skills.length - 1)" @click="moveSkillDown(index)">
                                <fa icon="chevron-down"></fa>
                            </b-btn>
                        </b-btn-group>
                        <b-form-input v-model="skill.name" class="ml-2" placeholder="Name"></b-form-input>
                        <b-form-checkbox v-model="skill.career" class="ml-2 mt-2" name="check-button" switch>
                            Career
                        </b-form-checkbox>
                        <b-form-input v-model.number="skill.ranks" class="ml-2" type="number" min="0" max="5" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                        <b-form-select v-model="skill.characteristic" class="ml-2" :options="characteristics"></b-form-select>
                        <b-form-select v-model="skill.type" class="ml-2" :options="skillTypes"></b-form-select>
                        <b-btn variant="danger" class="ml-2" @click="removeSkill(index)">
                            <fa icon="trash-alt"></fa>
                        </b-btn>
                    </div>
                </div>
                <h5 v-if="skills.filter((skill) => skill.type === 'combat').length === 0" class="text-center">
                    No skills.
                </h5>
            </div>
            <div class="skill-group">
                <h4>Social</h4>
                <div v-for="(skill, index) in skills" :key="index" class="mb-2">
                    <div v-if="skill.type === 'social'" class="d-flex">
                        <b-btn-group>
                            <b-btn :disabled="index === 0" @click="moveSkillUp(index)">
                                <fa icon="chevron-up"></fa>
                            </b-btn>
                            <b-btn :disabled="index === (skills.length - 1)" @click="moveSkillDown(index)">
                                <fa icon="chevron-down"></fa>
                            </b-btn>
                        </b-btn-group>
                        <b-form-input v-model="skill.name" class="ml-2" placeholder="Name"></b-form-input>
                        <b-form-checkbox v-model="skill.career" class="ml-2 mt-2" name="check-button" switch>
                            Career
                        </b-form-checkbox>
                        <b-form-input v-model.number="skill.ranks" class="ml-2" type="number" min="0" max="5" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                        <b-form-select v-model="skill.characteristic" class="ml-2" :options="characteristics"></b-form-select>
                        <b-form-select v-model="skill.type" class="ml-2" :options="skillTypes"></b-form-select>
                        <b-btn variant="danger" class="ml-2" @click="removeSkill(index)">
                            <fa icon="trash-alt"></fa>
                        </b-btn>
                    </div>
                </div>
                <h5 v-if="skills.filter((skill) => skill.type === 'social').length === 0" class="text-center">
                    No skills.
                </h5>
            </div>
            <div class="skill-group">
                <h4>Knowledge</h4>
                <div v-for="(skill, index) in skills" :key="index" class="mb-2">
                    <div v-if="skill.type === 'knowledge'" class="d-flex">
                        <b-btn-group>
                            <b-btn :disabled="index === 0" @click="moveSkillUp(index)">
                                <fa icon="chevron-up"></fa>
                            </b-btn>
                            <b-btn :disabled="index === (skills.length - 1)" @click="moveSkillDown(index)">
                                <fa icon="chevron-down"></fa>
                            </b-btn>
                        </b-btn-group>
                        <b-form-input v-model="skill.name" class="ml-2" placeholder="Name"></b-form-input>
                        <b-form-checkbox v-model="skill.career" class="ml-2 mt-2" name="check-button" switch>
                            Career
                        </b-form-checkbox>
                        <b-form-input v-model.number="skill.ranks" class="ml-2" type="number" min="0" max="5" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                        <b-form-select v-model="skill.characteristic" class="ml-2" :options="characteristics"></b-form-select>
                        <b-form-select v-model="skill.type" class="ml-2" :options="skillTypes"></b-form-select>
                        <b-btn variant="danger" class="ml-2" @click="removeSkill(index)">
                            <fa icon="trash-alt"></fa>
                        </b-btn>
                    </div>
                </div>
                <h5 v-if="skills.filter((skill) => skill.type === 'knowledge').length === 0" class="text-center">
                    No skills.
                </h5>
            </div>

            <hr />

            <b-card
                header="New Skill"
                header-bg-variant="dark"
                header-text-variant="white"
            >
                <div class="d-flex">
                    <b-form-input v-model="newSkill.name" class="ml-2" placeholder="Name"></b-form-input>
                    <b-form-checkbox v-model="newSkill.career" class="ml-2 mt-2" name="check-button" switch>
                        Career
                    </b-form-checkbox>
                    <b-form-input v-model.number="newSkill.ranks" class="ml-2" type="number" min="0" max="5" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                    <b-form-select v-model="newSkill.characteristic" class="ml-2" :options="characteristics"></b-form-select>
                    <b-form-select v-model="newSkill.type" class="ml-2" :options="skillTypes"></b-form-select>
                    <b-btn variant="primary" class="ml-2 text-nowrap" :disabled="!isAddValid" @click="addSkill">
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
    import charMan from '../../../../api/managers/character';
    import eoteMan from '../../../../api/managers/eote';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditSkillsModal',
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                skills: [],
                newSkill: {
                    name: '',
                    career: false,
                    ranks: 0

                }
            };
        },
        computed: {
            isAddValid()
            {
                return _.isFinite(this.newSkill.ranks)
                    && !!this.newSkill.name
                    && !!this.newSkill.characteristic
                    && this.newSkill.type;
            },
            characteristics()
            {
                return Object.keys(this.character.details.characteristics)
                    .map((char) => ({ text: _.startCase(char), value: char }))
                    .sort();
            },
            skillTypes()
            {
                return [ 'general', 'magic', 'combat', 'social', 'knowledge' ]
                    .filter((type) =>
                    {
                        return type !== 'magic' || this.mode === 'genesys';
                    })
                    .map((type) => ({ text: _.startCase(type), value: type }));
            }
        },
        methods: {
            onShown()
            {
                // Copy the v-model value over our skills array.
                this.skills = _.cloneDeep(this.character.details.skills);
                this.newSkill = { name: '', career: false, ranks: 0 };
            },
            onSave()
            {
                this.character.details.skills = this.skills;
                return charMan.save(this.character);
            },
            onCancel()
            {
                // Clear our local variable
                this.skills = [];
                this.newSkill = { name: '', career: false, ranks: 0 };
            },

            addSkill()
            {
                // Split skills list into each section
                const skills = {
                    general: this.skills.filter((skill) => skill.type === 'general'),
                    magic: this.skills.filter((skill) => skill.type === 'magic'),
                    combat: this.skills.filter((skill) => skill.type === 'combat'),
                    social: this.skills.filter((skill) => skill.type === 'social'),
                    knowledge: this.skills.filter((skill) => skill.type === 'knowledge')
                };

                // Add new skill to the right type list
                skills[this.newSkill.type].push(this.newSkill);

                // Rebuild skills list in proper order
                this.skills = [].concat(skills.general, skills.magic, skills.combat, skills.social, skills.knowledge);

                // Reset new skill
                this.newSkill = { name: '', career: false, ranks: 0 };
            },
            removeSkill(index)
            {
                this.skills.splice(index, 1);
            },
            moveSkillUp(index)
            {
                if(index > 0)
                {
                    const start = index;
                    const end = index - 1;
                    this.skills.splice(end, 0, this.skills.splice(start, 1)[0]);
                } // end if
            },
            moveSkillDown(index)
            {
                if(index < this.skills.length)
                {
                    const start = index;
                    const end = index + 1;
                    this.skills.splice(end, 0, this.skills.splice(start, 1)[0]);
                } // end if
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
