<template>
    <modal v-ref:modal :backdrop="'static'" :keyboard="false" :width="'900px'">
        <div class="modal-header" slot="header">
            <h4 class="modal-title">
                <span v-if="mode == 'add'">
                    <i class="fa fa-plus"></i> Add
                </span>
                <span v-else>
                    <i class="fa fa-edit"></i> Edit
                </span>
                "{{ statblock.name }}" Statblock
            </h4>
        </div>
        <div class="modal-body" slot="body">
            <form>
                <fieldset class="form-group">
                    <label for="name">Name</label>
                    <input id="name" type="text" class="form-control" v-model="statblock.name">
                </fieldset>
                <fieldset class="form-group">
                    <label for="type">Type</label>
                    <select id="type" class="form-control" v-model="statblock.type">
                        <option value="table">Table</option>
                        <option value="list">List</option>
                    </select>
                </fieldset>
                <hr>
                <div v-if="statblock.type == 'table'" class="form-group">
                    <h5>Columns</h5>
                    <table class="table" style="margin-bottom: 0">
                        <tr>
                            <th class="text-center">Name</th>
                            <th class="text-center">Type</th>
                            <th class="text-center">Primary Key</th>
                            <th></th>
                        </tr>
                        <tr v-for="column in statblock.columns">
                            <td>
                                <input type="text" class="form-control" v-model="column.name">
                            </td>
                            <td>
                                <select class="form-control" v-model="column.type">
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="boolean">Boolean</option>
                                    <option value="computed">Computed</option>
                                </select>
                            </td>
                            <td style="width: 1%">
                                <button class="btn btn-block" :class="{ 'btn-secondary': !column.pk, 'btn-primary': column.pk, 'no-click': column.pk }" title="Make Primary"
                                        @click.prevent.stop="makeColumnPrimary(column.name)">
                                    <span v-if="!column.pk">Make </span>Primary
                                </button>
                            </td>
                            <td style="width: 1%">
                                <button class="btn btn-danger btn-block" title="Remove row"
                                        @click.prevent.stop="statblock.columns.$remove(column)">
                                    <i class="fa fa-fw fa-trash-o"></i>
                                </button>
                            </td>
                        </tr>
                    </table>
                    <hr class="sm">
                    <div class="text-right">
                        <button class="btn btn-link" @click.prevent.stop="statblock.columns.push({ name: null, type: 'string', pk: undefined})">
                            <i class="fa fa-plus"></i>
                            Add Column
                        </button>
                    </div>
                    <h5>Data</h5>
                    <table class="table" style="margin-bottom: 0">
                        <tr>
                            <th class="text-center" v-for="column in statblock.columns">{{ column.name }}</th>
                            <th></th>
                        </tr>
                        <tr v-for="row in statblock.rows">
                            <td v-for="column in statblock.columns">
                                <input v-if="column.type == 'string'" type="text" class="form-control" v-model="row[$index]">
                                <input v-if="column.type == 'number'" type="number" class="form-control" v-model="row[$index]" number>
                                <div class="checkbox" v-if="column.type == 'boolean'">
                                    <label>
                                        <input type="checkbox" v-model="row[$index]">
                                    </label>
                                </div>
                                <textarea v-if="column.type == 'computed'" class="form-control monospace" style="font-size: .85rem;" rows="3" v-model="row[$index]"></textarea>
                            </td>
                            <td style="width: 1%">
                                <button class="btn btn-danger btn-block" title="Remove row"
                                        @click.prevent.stop="statblock.rows.$remove(row)">
                                    <i class="fa fa-fw fa-trash-o"></i>
                                </button>
                            </td>
                        </tr>
                    </table>
                    <hr class="sm">
                    <div class="text-right">
                        <button class="btn btn-link" @click.prevent.stop="statblock.rows.push([])">
                            <i class="fa fa-plus"></i>
                            Add Row
                        </button>
                    </div>
                </div>
                <div v-else class="form-group">
                    <h5>Data</h5>
                    <table class="table" style="margin-bottom: 0">
                        <tr>
                            <th class="text-center">Key</th>
                            <th class="text-center">Type</th>
                            <th class="text-center">Value</th>
                            <th></th>
                        </tr>
                        <tr v-for="item in statblock.items">
                            <td style="width: 20%">
                                <input type="text" class="form-control" v-model="item.key">
                            </td>
                            <td style="width: 20%">
                                <select class="form-control" v-model="item.type">
                                    <option value="string">String</option>
                                    <option value="number">Number</option>
                                    <option value="boolean">Boolean</option>
                                    <option value="computed">Computed</option>
                                </select>
                            </td>
                            <td style="width: 100%">
                                <input v-if="item.type == 'string'" type="text" class="form-control" v-model="item.value">
                                <input v-if="item.type == 'number'" type="number" class="form-control" v-model="item.value" number>
                                <div class="input-group" v-if="item.type == 'boolean'">
                                    <span class="input-group-addon">
                                        <input type="checkbox" v-model="item.value">
                                    </span>
                                    <input type="text" class="form-control" v-model="item.description">
                                </div>
                                <textarea v-if="item.type == 'computed'" class="form-control monospace" style="font-size: .85rem;" rows="3" v-model="item.value"></textarea>
                            </td>
                            <td style="width: 1%">
                                <button class="btn btn-danger btn-block" title="Remove row" type="button"
                                        @click.prevent.stop="statblock.items.$remove(item)">
                                    <i class="fa fa-fw fa-trash-o"></i>
                                </button>
                            </td>
                        </tr>
                    </table>
                    <hr class="sm">
                    <div class="text-right">
                        <button class="btn btn-link" @click.prevent.stop="statblock.items.push({ key: null, type: 'string', value: null})">
                            <i class="fa fa-plus"></i>
                            Add Row
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer" slot="footer">
            <button type="button"
                    class="btn btn-success"
                    @click="saveModal()">
                <i class="fa fa-save"></i>
                Save
            </button>
            <button type="button"
                    class="btn btn-secondary"
                    @click="$refs.modal.hideModal()">
                <i class="fa fa-times"></i>
                Cancel
            </button>
        </div>
    </modal>
</template>

<script type="text/babel">
    import _ from 'lodash';
    import { modal } from 'vueboot';

    export default {
        components: {
            modal
        },
        props: {
            stats: {
                type: Object,
                twoWay: true,
                default: {
                    name: null,
                    type: "list",
                    rows: [],
                    columns: [],
                    items: []
                }
            },
            mode: {
                type: String,
                default: "edit"
            },
            save: {
                type: Function,
                required: true
            }
        },
        data: function()
        {
            return {
                defaultStats: {
                    name: null,
                    type: "list",
                    rows: [],
                    columns: [],
                    items: []
                },
                statblock: {
                    name: null,
                    type: "list",
                    rows: [],
                    columns: [],
                    items: []
                }
            };
        },
        methods: {
            show: function()
            {
                // Default to any properties not listed
                this.stats = _.defaults({}, this.stats, this.defaultStats);

                // Now we copy stats to our statblock
                _.assign(this.statblock, _.cloneDeep(this.stats));
                this.$refs.modal.showModal();
            },
            showModal: function()
            {
                // This is compatibility for the modal api.
                this.show();
            },
            hide: function()
            {
                this.statblock = _.cloneDeep(this.defaultStats);
                this.$refs.modal.hideModal();
            },
            hideModal: function()
            {
                // This is compatibility for the modal api.
                this.hide();
            },
            makeColumnPrimary: function(columnName)
            {
                var columns = _.cloneDeep(this.statblock.columns);

                // Clear any existing PK setting
                _.map(columns, (cm) => { cm.pk = undefined; });

                // Set the current PK
                var column = _.find(columns, { name: columnName });
                column.pk = true;

                // Update Vue
                this.statblock.columns = columns;
            },
            saveModal: function()
            {
                _.assign(this.stats, this.statblock);
                this.$refs.modal.hideModal();
                this.save();
            }
        }
    }
</script>