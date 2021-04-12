<!----------------------------------------------------------------------------------------------------------------------
  -- FATE Stunts
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="fate-stunts" :class="{ readonly: readonly }" fill>
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="hand-holding-magic"></fa>
                <span class="d-none d-md-inline">Stunts</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEdit()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Content -->
        <div class="stunts-content">
            <div v-for="(stunt, index) in stunts" :key="index">
                <div><b>{{ stunt.title }}</b></div>
                <markdown :text="stunt.description"></markdown>
            </div>
            <div v-if="stunts.length === 0">
                <h6 class="text-center">
                    No stunts.
                </h6>
            </div>
        </div>

        <!-- Modals -->
        <edit-stunts-modal ref="editModal"></edit-stunts-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #fate-stunts {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import markdown from '../../ui/markdown.vue';
    import EditStuntsModal from './editStuntsModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'FateStuntsCard',
        components: {
            RpgkCard,
            markdown,
            EditStuntsModal
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
            stunts: {
                get() { return _.orderBy(this.value, [ 'title' ], [ 'asc' ]); },
                set(val) { this.$emit('input', val); }
            }
        },
        methods: {
            openEdit()
            {
                // Open the dialog
                this.$refs.editModal.show();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
