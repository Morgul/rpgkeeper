<!----------------------------------------------------------------------------------------------------------------------
  -- characteristics.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-chars-block" :class="{ readonly: readonly }" fill no-body>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="fist-raised"></fa>
                <span class="d-none d-md-inline">Characteristics</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <div class="d-flex flex-wrap align-content-stretch justify-content-start mt-auto mb-auto ml-2 mr-2 pt-1 pb-1">
            <b-card
                v-for="char in characteristics"
                :key="char"
                class="flex-fill ml-1 mr-1 mt-1 mb-1 text-nowrap"
                style="min-width: 50px; width: 90px"
                no-body
            >
                <h3 class="mt-2 mb-2 text-center">
                    {{ getCharacteristic(char) }}
                </h3>
                <template slot="footer">
                    <div class="text-center overflow-hidden">
                        {{ startCase(char) }}
                    </div>
                </template>
            </b-card>
        </div>

        <!-- Edit Modal -->
        <edit-modal ref="editModal"></edit-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #eote-chars-block {
        h3 {
            font-size: 1.50rem;
        }
        .card-footer {
            padding: 0.3rem 1rem;
            font-size: 0.90rem;
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
    import RpgkCard from '../../ui/card.vue';
    import EditModal from './modals/editCharacteristicsModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotECharacteristicsBlock',
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
            character: charMan.selected$
        },
        computed: {
            characteristics()
            {
                return [
                    'brawn',
                    'agility',
                    'intellect',
                    'cunning',
                    'willpower',
                    'presence'
                ];
            }
        },
        methods: {
            openEditModal()
            {
                this.$refs.editModal.show();
            },
            startCase(text)
            {
                return _.startCase(text);
            },
            getCharacteristic(char)
            {
                return this.character.details.characteristics[char];
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
