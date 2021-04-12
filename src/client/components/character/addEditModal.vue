<!----------------------------------------------------------------------------------------------------------------------
  -- AddEditModal
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div v-if="char" class="add-edit-modal">
        <b-modal
            v-model="showModal"
            header-bg-variant="dark"
            header-text-variant="white"
            no-close-on-esc
            no-close-on-backdrop
            size="xxl"
            :ok-disabled="$v.char.$anyError"
            @ok="onSave"
            @hidden="onHidden"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <span v-if="isNew">
                    <fa icon="user-plus"></fa>
                    Add
                </span>
                <span v-else>
                    <fa icon="user-edit"></fa>
                    Edit
                </span>
                Character
            </template>

            <!-- Modal Body -->
            <div class="content">
                <b-form-row>
                    <b-col class="flex-grow-0 flex-shrink-0 w-auto">
                        <portrait :src="char.portrait" :color="char.color" size="md"></portrait>
                        <div class="text-center">
                            <small class="text-muted">Portrait</small>
                        </div>
                        <div class="text-center mt-4">
                            <thumbnail :src="char.thumbnail" :color="char.color" :text="char.initial"></thumbnail>
                            <div>
                                <small class="text-muted">Thumbnail</small>
                            </div>
                        </div>
                    </b-col>
                    <b-col>
                        <b-form-row>
                            <b-col>
                                <b-form-group
                                    id="char-name-group"
                                    description="Your character's full name."
                                    label="Name"
                                    label-for="char-name"
                                >
                                    <b-form-input
                                        id="char-name"
                                        v-model="char.name"
                                        :state="validateState('name')"
                                        @input="$v.char.name.$touch()"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group
                                    id="char-sys-group"
                                    description="The rpg system this character is for."
                                    label="System"
                                    label-for="char-sys"
                                >
                                    <b-form-select
                                        id="char-sys"
                                        v-model="char.system"
                                        :options="systems"
                                        text-field="name"
                                        value-field="id"
                                        :disabled="!isNew"
                                        :state="validateState('system')"
                                        @input="$v.char.system.$touch()"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                        <b-form-row>
                            <b-col class="flex-grow-0 flex-shrink-0 w-auto" style="min-width: 5rem;">
                                <b-form-group
                                    id="char-color-group"
                                    label="Color"
                                    label-for="char-color"
                                >
                                    <color-picker v-model="char.color"></color-picker>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group
                                    id="char-portrait-group"
                                    label="Portrait"
                                    label-for="char-portrait"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            id="char-portrait"
                                            v-model="char.portrait"
                                            :state="validateState('portrait')"
                                            @input="$v.char.portrait.$touch()"
                                        ></b-form-input>
                                        <b-input-group-append>
                                            <b-btn title="Choose file from Dropbox" @click="pickImageDropBox('portrait')">
                                                <fa :icon="[ 'fab', 'dropbox' ]"></fa>
                                            </b-btn>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <template slot="description">
                                        Any urls are accepted. <br />
                                        Recommend dimensions are <code>600x900px</code>.
                                    </template>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group
                                    id="char-thumbnail-group"
                                    label="Thumbnail"
                                    label-for="char-thumbnail"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            id="char-thumbnail"
                                            v-model="char.thumbnail"
                                            :state="validateState('thumbnail')"
                                            @input="$v.char.thumbnail.$touch()"
                                        ></b-form-input>
                                        <b-input-group-append>
                                            <b-btn title="Choose file from Dropbox" @click="pickImageDropBox('thumbnail')">
                                                <fa :icon="[ 'fab', 'dropbox' ]"></fa>
                                            </b-btn>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <template slot="description">
                                        Any urls are accepted. <br />
                                        Recommend dimensions are <code>200x200px</code>.
                                    </template>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                        <b-form-group
                            id="char-campaign-group"
                            description="A brief description of the campaign or RP this character is associated with."
                            label="Campaign"
                            label-for="char-campaign"
                        >
                            <b-form-input
                                id="char-campaign"
                                v-model="char.campaign"
                                :state="validateState('campaign')"
                                @input="$v.char.campaign.$touch()"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="char-desc-group"
                            description="A brief description of your character. Could be physical or personality."
                            label="Description"
                            label-for="char-desc"
                        >
                            <b-form-input
                                id="char-desc"
                                v-model="char.description"
                                :state="validateState('description')"
                                @input="$v.char.description.$touch()"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
            </div>

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

<style lang="scss" scoped>
    .add-edit-modal {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import { required, minLength, maxLength } from 'vuelidate/lib/validators';

    // Managers
    import charMan from '../../api/managers/character';
    import systemsMan from '../../api/managers/systems';

    // Utils
    import dropboxUtil from '../../api/utils/dropbox';

    // Components
    import ColorPicker from '../ui/colorPicker.vue';
    import Thumbnail from './thumbnail.vue';
    import Portrait from './portrait.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'AddEditModal',
        components: {
            ColorPicker,
            Portrait,
            Thumbnail
        },
        props: {
            value: {
                type: Object,
                default: undefined
            }
        },
        data()
        {
            return {
                saving: false
            };
        },
        computed: {
            isNew() { return !this.value || !this.value.id; },
            showModal: {
                get() { return !!this.value; },
                set() { /* We ignore setting */ }
            },
            systems()
            {
                return this.allSystems
                    .map((sys) =>
                    {
                        return {
                            ...sys,
                            name: sys.status ? `${ sys.name } (${ systemsMan.getStatusDisplay(sys.status) })` : sys.name
                        };
                    });
            },
            char() { return this.value; }
        },
        watch: {
            'char.system'()
            {
                if(this.char)
                {
                    charMan.updateSysDefaults(this.char);
                } // end if
            }
        },
        methods: {
            onHidden()
            {
                // If we're not in the middle of a save, let's revert any changes.
                if(!this.saving)
                {
                    this.char.revert();
                } // end if

                this.$v.$reset();
                this.$emit('hidden');
            },
            async onSave(bvModalEvent)
            {
                this.$v.char.$touch();

                if(!this.$v.char.$anyError)
                {
                    this.saving = true;
                    await charMan.save(this.char);
                    this.saving = false;
                }
                else
                {
                    bvModalEvent.preventDefault();
                } // end if
            },
            async pickImageDropBox(prop)
            {
                this.char[prop] = await dropboxUtil.chooseDropboxImage();
            },
            validateState(name)
            {
                const { $dirty, $error } = this.$v.char[name];
                return $dirty ? !$error : null;
            }
        },
        subscriptions: {
            allSystems: systemsMan.systems$
        },
        validations: {
            char: {
                name: {
                    required,
                    minLength: minLength(1),
                    maxLength: maxLength(255)
                },
                system: {
                    required
                },
                portrait: {
                    minLength: minLength(1),
                    maxLength: maxLength(255)
                },
                thumbnail: {
                    minLength: minLength(1),
                    maxLength: maxLength(255)
                },
                campaign: {
                    minLength: minLength(1),
                    maxLength: maxLength(255)
                },
                description: {
                    minLength: minLength(1),
                    maxLength: maxLength(255)
                }
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
