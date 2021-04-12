<!----------------------------------------------------------------------------------------------------------------------
  -- Supplement Select
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-form-group
        class="supplement-select"
        :label="label"
        :label-class="labelClass"
    >
        <b-form-row>
            <b-col>
                <b-card class="h-100 overflow-hidden" no-body :style="{ maxHeight, minHeight: maxHeight }">
                    <template #header>
                        <div class="d-flex">
                            <supplement-search
                                class="w-100"
                                :available="available"
                                :selected="selected"
                                :sort-fn="sortFn"
                                @add="onAdd"
                            >
                                <template #suggestion-extra="{ supplement }">
                                    <slot :supplement="supplement" name="suggestion-extra"></slot>
                                </template>
                                <template #append-extra>
                                    <b-button class="ml-2 text-nowrap" variant="success" title="Add New..." @click="addNew()">
                                        <fa icon="plus"></fa>
                                        New
                                    </b-button>
                                </template>
                            </supplement-search>
                        </div>
                    </template>

                    <!-- Supplement Selection -->
                    <b-list-group v-if="selectedSupplements.length > 0" flush class="overflow-auto">
                        <b-list-group-item v-for="supp in selectedSupplements" :key="supp.id" :variant=" supp.id === currentSelection ? 'primary' : ''" @click="selectSupp(supp)">
                            <div class="float-right">
                                <slot :instance="supp" :supplement="getSupp(supp.id)" name="selection-extra"></slot>
                                <b-badge :variant="getSupp(supp.id).scope === 'user' ? 'success' : ''">
                                    <span v-if="getSupp(supp.id).scope === 'user'">User</span>
                                    <span v-else-if="getSupp(supp.id).scope === 'public'">Public</span>
                                </b-badge>
                                <b-button class="ml-2 text-nowrap" variant="danger" title="Remove" @click.prevent.stop="removeSupp(supp)">
                                    <fa icon="times"></fa>
                                </b-button>
                            </div>
                            <div class="pt-2">
                                {{ getSupp(supp.id).name }}
                                <span v-if="getSupp(supp.id).ranked">{{ supp.ranks }}</span>
                            </div>
                        </b-list-group-item>
                    </b-list-group>
                    <div v-else class="card-body">
                        <h5 class="m-0 text-center">
                            Nothing added to character.
                        </h5>
                    </div>
                </b-card>
            </b-col>
            <b-col>
                <b-card>
                    <template v-if="currentSelection" #header>
                        <slot :instance="supplementInstance" :supplement="currentSupplement" name="header">
                            <div v-if="currentSupplement.scope === 'user'" class="float-right">
                                <b-btn size="sm" @click="editSupp(currentSupplement)">
                                    <fa icon="edit"></fa>
                                    Edit
                                </b-btn>
                                <b-btn variant="danger" size="sm" @click="deleteSupp(currentSupplement)">
                                    <fa icon="trash-alt"></fa>
                                    Delete
                                </b-btn>
                            </div>
                            <b>
                                <slot :instance="supplementInstance" :supplement="currentSupplement" name="preview-title">
                                    {{ currentSupplement.name }}
                                    <span v-if="currentSupplement.ranked">{{ supplementInstance.ranks }}</span>
                                </slot>
                            </b>
                        </slot>
                    </template>
                    <slot v-if="!currentSelection" name="noSelection">
                        <div class="text-center">
                            <i>Please select an option to view/edit it.</i>
                        </div>
                    </slot>
                    <slot v-else :instance="supplementInstance" :supplement="currentSupplement" name="preview">
                        <div v-if="currentSupplement.ranked" class="mb-2">
                            <label for="sb-inline">Ranks</label>
                            <b-form-spinbutton id="sb-inline" v-model="supplementInstance.ranks" inline></b-form-spinbutton>
                        </div>
                        <markdown-block :text="currentSupplement.description" inline></markdown-block>
                        <reference
                            class="float-right mt-2"
                            :reference="currentSupplement.reference"
                        ></reference>
                    </slot>
                </b-card>
            </b-col>
        </b-form-row>
    </b-form-group>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    .supplement-select {
        .vbt-autcomplete-list {
            max-height: calc(100% - 60px);
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Components
    import SupplementSearch from './supplementSearch.vue';
    import MarkdownBlock from '../ui/markdown.vue';
    import Reference from './reference.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'SupplementSelect',
        components: {
            MarkdownBlock,
            Reference,
            SupplementSearch
        },
        props: {
            label: {
                type: String,
                default: undefined
            },
            labelClass: {
                type: String,
                default: undefined
            },
            available: {
                type: Array,
                default: () => []
            },
            selected: {
                type: Array,
                default: () => []
            },
            maxHeight: {
                type: String,
                default: '300px'
            },
            sortFn: {
                type: Function,
                default: (suppA, suppB) => suppA.name.localeCompare(suppB.name)
            }
        },
        data()
        {
            return {
                currentSelection: undefined
            };
        },
        computed: {
            selectedSupplements()
            {
                // Normalize the selected supplements to an array of objects with `id`.
                return this.selected.map((supp) =>
                {
                    // If we have `id`, assume we're in the right format
                    if(supp.id)
                    {
                        return supp;
                    }
                    else
                    {
                        // Otherwise assume we're just the id, and wrap ourselves in an object. This is Good Enough™.
                        return { id: supp };
                    } // end if
                });
            },
            currentSupplement()
            {
                return this.getSupp(this.currentSelection);
            },
            supplementInstance()
            {
                return this.getSelected(this.currentSelection);
            }
        },
        methods: {
            onAdd(supp)
            {
                this.$emit('add', supp);
            },
            getSupp(id)
            {
                if(id)
                {
                    return this.available.filter((supp) => supp.id === id)[0];
                } // end if

                return undefined;
            },
            getSelected(id)
            {
                if(id)
                {
                    return this.selectedSupplements.filter((supp) => supp.id === id)[0];
                } // end if

                return undefined;
            },
            selectSupp(supp)
            {
                if(supp && this.currentSelection !== supp.id)
                {
                    this.currentSelection = supp.id;
                }
                else
                {
                    this.currentSelection = undefined;
                } // end if
            },
            editSupp(supp)
            {
                this.$emit('edit', supp);
            },
            deleteSupp(supp)
            {
                this.$emit('delete', supp);
            },
            addNew()
            {
                this.$emit('new');
            },
            removeSupp(supp)
            {
                this.clearSelection();
                this.$emit('remove', { id: supp.id });
            },
            clearSelection()
            {
                this.currentSelection = undefined;
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
