<!----------------------------------------------------------------------------------------------------------------------
  -- identity.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="fate-identity-block" :class="{ readonly: readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="address-card"></fa>
                <span class="d-none d-md-inline">Identity</span>
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
            <markdown class="font-sm" :text="character.description" inline></markdown>
        </b-form-group>
        <b-form-group
            id="fp-input-group"
            class="mt-4 mb-0"
            label="Fate Points"
            label-class="font-weight-bold"
        >
            <fate-points v-model="character.details.fatePoints.current" :refresh="character.details.fatePoints.refresh" :readonly="readonly"></fate-points>
        </b-form-group>

        <!-- Edit Modal -->
        <edit-identity-modal v-model="showEdit"></edit-identity-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #fate-identity-block {
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

    // Manager
    import charMan from '../../../api/managers/character';

    // Components
    import EditIdentityModal from './editIdentityModal.vue';
    import FatePoints from './fatePoints.vue';
    import Markdown from '../../ui/markdown.vue';
    import RpgkCard from '../../ui/card.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'FateIdentityCard',
        components: {
            EditIdentityModal,
            FatePoints,
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
        data()
        {
            return {
                showEdit: false
            };
        },
        methods: {
            openEditModal()
            {
                this.showEdit = true;
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
