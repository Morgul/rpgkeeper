<!----------------------------------------------------------------------------------------------------------------------
  -- FATE Extras
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="fate-extras" :class="{ readonly: readonly }" fill>
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="magic"></fa>
                <span class="d-none d-md-inline">Extras</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEdit()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Content -->
        <markdown v-if="value" :text="value"></markdown>
        <div v-else>
            <h6 class="text-center">
                No Extras
            </h6>
        </div>

        <!-- Modals -->
        <edit-extras-modal ref="editModal"></edit-extras-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #fate-extras {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Components
    import RpgkCard from '../../ui/card.vue';
    import markdown from '../../ui/markdown.vue';
    import EditExtrasModal from './editExtrasModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'FateExtrasCard',
        components: {
            RpgkCard,
            markdown,
            EditExtrasModal
        },
        props: {
            value: {
                type: String,
                required: true
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            openEdit()
            {
                this.$refs.editModal.show();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
