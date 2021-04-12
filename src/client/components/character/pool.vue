<!----------------------------------------------------------------------------------------------------------------------
  -- A Resource Pool
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div id="pool">
        <div v-if="max > 0" class="d-inline-block">
            <span
                v-for="index in poolRange"
                :key="index"
                class="ml-1"
                @click.prevent.stop="setIndex(index)"
            >
                <fa
                    :class="[checkHover(index), { 'read-only': disabled }]"
                    :icon="isChecked(index) ? checkedIcon : uncheckedIcon"
                    :size="size"
                    @mouseover="onMouseOver(index)"
                    @mouseout="onMouseOut(index)"
                ></fa>
            </span>
        </div>
        <div v-else class="d-inline-block">
            <h5 class="mt-1 text-muted">
                No pool
            </h5>
        </div>
        <b-btn
            v-if="showEdit"
            class="ml-2 d-inline-block align-top"
            variant="outline-secondary"
            size="sm"
            @click="openEditMax"
        >
            <fa icon="edit"></fa>
            Edit
        </b-btn>

        <!-- Edit Modal -->
        <b-modal
            ref="editPool"
            header-bg-variant="dark"
            header-text-variant="white"
            no-close-on-esc
            no-close-on-backdrop
            @ok="onSave"
            @shown="onShown"
        >
            <!-- Modal Header -->
            <template slot="modal-title">
                <fa icon="file-edit"></fa>
                Edit "{{ name }}" Pool
            </template>

            <!-- Modal Content -->
            <b-form-group
                id="name-input-group"
                label="Pool Maximum"
                label-for="max-input"
            >
                <b-form-input
                    id="max-input"
                    v-model.number="editMax"
                    type="number"
                    min="0"
                    max="9999999"
                    step="1"
                ></b-form-input>
            </b-form-group>

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
    #pool {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../api/managers/character';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        model: {
            prop: 'current',
            event: 'update'
        },
        props: {
            current: {
                type: Number,
                required: true
            },
            max: {
                type: Number,
                default: 0
            },
            name: {
                type: String,
                default: undefined
            },
            checkedIcon: {
                type: [ String, Array ],
                default() { return 'check-square'; }
            },
            uncheckedIcon: {
                type: [ String, Array ],
                default() { return [ 'far', 'square' ]; }
            },
            noEdit: {
                type: Boolean,
                default: false
            },
            noAutoSave: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: '2x'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data()
        {
            return {
                poolMax: 0,
                poolCurrent: 0,
                hoveredIndex: undefined,
                editMax: null
            };
        },
        computed:
            {
                poolRange() { return _.range(this.max); },
                currentIndex()
                {
                    const index = this.poolCurrent - 1;
                    return index < 0 ? undefined : index;
                },
                showEdit() { return !this.disabled && !this.noEdit; }
            },
        mounted()
        {
            this.poolMax = this.max;
            this.poolCurrent = this.current;
        },
        updated()
        {
            this.poolMax = this.max;
            this.poolCurrent = this.current;
        },
        methods: {
            onShown()
            {
                this.editMax = this.poolMax || 0;
            },
            onSave()
            {
                this.poolMax = this.editMax;
                this.poolCurrent = Math.min(this.poolMax, this.poolCurrent);
                this.editMax = null;

                this.$emit('update', this.poolCurrent);
                this.$emit('update:max', this.poolMax);
                charMan.save();
            },
            openEditMax()
            {
                if(!this.disabled)
                {
                    this.editMax = this.poolMax || 0;
                    this.$refs.editPool.show();
                } // end if
            },
            onMouseOver(index)
            {
                if(!this.disabled)
                {
                    this.hoveredIndex = index;
                } // end if
            },
            onMouseOut()
            {
                if(!this.disabled)
                {
                    this.hoveredIndex = undefined;
                } // end if
            },
            setIndex(index)
            {
                if(!this.disabled)
                {
                    if(index === this.currentIndex)
                    {
                        this.poolCurrent -= 1;
                    }
                    else
                    {
                        this.poolCurrent = (index + 1);
                    } // end if

                    this.$emit('update', this.poolCurrent);

                    if(!this.noAutoSave)
                    {
                        charMan.save();
                    } // end if
                } // end if
            },
            checkHover(index)
            {
                if(index <= this.hoveredIndex)
                {
                    return 'text-primary';
                } // end if
            },
            isChecked(index)
            {
                return index <= this.currentIndex;
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
