<!----------------------------------------------------------------------------------------------------------------------
  -- Supplement Search
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="supp-search d-flex">
        <vue-typeahead-bootstrap
            v-model="search"
            class="w-100"
            :data="availableFiltered"
            placeholder="Search..."
            autocomplete="off"
            :max-matches="1000"
            :serializer="(s) => s.name"
            show-on-focus
            @hit="suppToAdd = $event"
        >
            <template #prepend>
                <b-input-group-text>
                    <fa icon="search"></fa>
                </b-input-group-text>
            </template>
            <template #append>
                <b-button class="text-nowrap" variant="primary" title="Add..." @click="addSup()">
                    <fa icon="plus"></fa>
                    Add
                </b-button>
            </template>
            <template #suggestion="{ data, htmlText }">
                <div class="float-right">
                    <slot :supplement="data" name="suggestion-extra"></slot>
                    <b-badge :variant="data.scope === 'user' ? 'success' : ''">
                        <span v-if="data.scope === 'user'">User</span>
                        <span v-else-if="data.scope === 'public'">Public</span>
                    </b-badge>
                </div>

                <!-- Note: the v-html binding is used, as htmlText contains
                         the suggestion text highlighted with <strong> tags -->
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="htmlText"></span>
            </template>
        </vue-typeahead-bootstrap>
        <slot name="append-extra"></slot>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .supp-search {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Components
    import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'SupplementSearch',
        components: {
            VueTypeaheadBootstrap
        },
        props: {
            available: {
                type: Array,
                required: true
            },
            selected: {
                type: Array,
                required: true
            },
            sortFn: {
                type: Function,
                default: (suppA, suppB) => suppA.name.localeCompare(suppB.name)
            }
        },
        data()
        {
            return {
                search: '',
                suppToAdd: undefined
            };
        },
        computed: {
            availableFiltered()
            {
                // Filter out an already selected supplements, and ones that match the search filter
                return this.available
                    .filter((supp) =>
                    {
                        let alreadyAdded = this.selected.includes(supp.id);
                        if(_.get(this.selected[0], 'id') !== undefined)
                        {
                            alreadyAdded = !!(this.selected.filter((item) => item.id === supp.id)[0]);
                        } // end if
                        return supp.name.toLowerCase().includes(this.search.toLowerCase()) && !alreadyAdded;
                    })
                    .sort(this.sortFn);
            }
        },
        methods: {
            addSup()
            {
                this.$emit('add', { id: this.suppToAdd.id });
                this.suppToAdd = undefined;
                this.search = '';
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
