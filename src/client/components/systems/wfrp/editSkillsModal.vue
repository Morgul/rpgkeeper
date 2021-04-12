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
            <div v-for="(skill, index) in skills" :key="index" class="d-flex mb-2">
                <b-form-input v-model.number="skill.value" type="number" min="1" max="99" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                <b-form-input v-model="skill.description" class="ml-2" placeholder="Description"></b-form-input>
                <b-btn variant="danger" class="ml-2" @click="removeSkills(skill)">
                    <fa icon="trash-alt"></fa>
                </b-btn>
            </div>

            <hr />

            <b-card
                header="New Skill"
                header-bg-variant="dark"
                header-text-variant="white"
            >
                <div class="d-flex">
                    <b-form-input v-model.number="newValue" type="number" min="1" max="99" step="1" style="max-width: 60px; min-width: 60px;"></b-form-input>
                    <b-form-input id="new-desc" v-model="newDesc" class="ml-2" placeholder="Description"></b-form-input>
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
                skills: _.cloneDeep(this.value),
                newValue: 1,
                newDesc: ''
            };
        },
        computed: {
            isAddValid()
            {
                return _.isFinite(this.newValue) && !!this.newDesc;
            }
        },
        methods: {
            onShown()
            {
                // Copy the v-model value over our skills array.
                this.skills = _.cloneDeep(this.value);
            },
            onSave()
            {
                // Filter out invalid skills.
                this.skills = this.skills.filter((skill) => _.isFinite(skill.value) && !!skill.description);

                this.$emit('input', this.skills);

                // We have to wait for things to settle from updating the model
                this.$nextTick(async() =>
                {
                    // Save the character
                    try { await charMan.save(); }
                    catch (error)
                    {
                        console.error('Error saving:', error);
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
                this.skills.push({
                    description: this.newDesc,
                    value: this.newValue
                });
                this.newDesc = '';
                this.newValue = 1;
            },
            removeSkills(skill)
            {
                // We can't use lodash, since Vue doesn't track whatever magic `_.pull` does.
                // See: https://vuejs.org/v2/guide/list.html#Array-Change-Detection
                const idx = _.findIndex(this.skills, skill);
                if(idx > -1)
                {
                    this.skills.splice(idx, 1);
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
