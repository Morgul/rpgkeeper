<!----------------------------------------------------------------------------------------------------------------------
  -- Risus Cliches
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="risus-cliches-block" :class="{ readonly: readonly }" fill no-body>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="flame"></fa>
                <span class="d-none d-md-inline">Cliches</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <b-list-group v-if="cliches && cliches.length > 0" flush>
            <b-list-group-item v-for="cliche in cliches" :key="cliche.description" class="d-flex">
                <div class="d-inline-block mr-2 mt-1" style="max-width: 60px; min-width: 60px;">
                    <b-form-input
                        v-model.number="cliche.current"
                        type="number"
                        min="0"
                        :max="cliche.value"
                        step="1"
                        :disabled="readonly"
                        @change="onChange()"
                    ></b-form-input>
                </div>
                <div class="d-inline-block flex-fill">
                    <div>
                        <b>{{ cliche.description }}</b> ({{ cliche.value }})
                    </div>
                    <small class="text-muted">{{ cliche.tools }}</small>
                </div>
                <div v-if="!readonly" class="d-inline-block text-nowrap mt-1">
                    <b-btn title="Reset to max" @click="resetCliche(cliche)">
                        <fa icon="arrow-to-top"></fa>
                    </b-btn>
                    <b-btn title="Roll this cliche" variant="primary" @click="roll(cliche.current, cliche.description)">
                        <fa icon="dice"></fa>
                        Roll
                    </b-btn>
                </div>
            </b-list-group-item>
        </b-list-group>
        <div v-else class="card-body">
            <h4 class="text-center text-muted m-0">
                No Cliches.
            </h4>
        </div>

        <!-- Edit Modal -->
        <edit-cliches-modal ref="editModal" v-model="character.details.cliches"></edit-cliches-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #risus-cliches-block {
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

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import EditClichesModal from './editClichesModal.vue';
    import RpgkCard from '../../ui/card.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'RisusClichesCard',
        components: {
            EditClichesModal,
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
        computed: {
            cliches() { return this.character.details.cliches; }
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
                this.$refs.editModal.show();
            },
            resetCliche(cliche)
            {
                if(!this.readonly)
                {
                    cliche.current = cliche.value;

                    // Save the character
                    return charMan.save(charMan.selected);
                } // end if
            },
            roll(dice, name)
            {
                this.$emit('roll', dice, name);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
