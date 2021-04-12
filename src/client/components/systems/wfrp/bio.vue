<!----------------------------------------------------------------------------------------------------------------------
  -- bio.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="wfrp-bio-block" :class="{ readonly: readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="address-card"></fa>
                <span class="d-none d-md-inline">Bio</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <b-form-group
            id="name-input-group"
            label="Name"
            label-class="font-weight-bold"
        >
            <h5>{{ character.name }}</h5>
        </b-form-group>
        <b-form-group
            id="desc-input-group"
            label="Description"
            label-class="font-weight-bold"
        >
            <markdown class="font-sm" :text="description" inline></markdown>
        </b-form-group>

        <!-- Edit Modal -->
        <edit-bio-modal v-model="showEdit" :character="character"></edit-bio-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #wfrp-bio-block {
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

    import _ from 'lodash';

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import EditBioModal from './editBioModal.vue';
    import Markdown from '../../ui/markdown.vue';
    import RpgkCard from '../../ui/card.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'WfrpBioCard',
        components: {
            EditBioModal,
            Markdown,
            RpgkCard
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            }
        },
        data()
        {
            return {
                showEdit: false
            };
        },
        subscriptions: {
            character: charMan.selected$
        },
        computed: {
            description()
            {
                return _.truncate(this.character.description, { length: 160 });
            }
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
                this.showEdit = true;
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
