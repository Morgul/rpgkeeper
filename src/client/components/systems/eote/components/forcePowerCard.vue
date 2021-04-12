<!----------------------------------------------------------------------------------------------------------------------
  -- forcePowerCard
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-card v-if="power && powerBase" class="eote-force-power-card" no-body>
        <template #header>
            <div :class="{ closed: !visible, open: visible }" @click="visible = !visible">
                <b>{{ powerBase.name }}</b>
                <fa class="text-muted mt-1 fa-pull-right collapse-icon" icon="chevron-right"></fa>
            </div>
        </template>
        <b-collapse id="`force-power-${ forcePower.id }`" v-model="visible" :class="`${ mode }-system m-2`">
            <markdown-block class="font-xs" :text="powerBase.description" inline></markdown-block>
            <b-table-lite
                class="font-xs mt-3 mb-0"
                :items="upgrades"
                :fields="upgradeFields"
                thead-class="d-none"
                small
            >
                <template #cell(name)="data">
                    <b>
                        {{ sentenceCase(data.value) }}
                        <span v-if="data.item.purchased > 1">({{ data.item.purchased }})</span>
                    </b>
                </template>
                <template #cell(description)="data">
                    <markdown-block :text="data.value" inline></markdown-block>
                </template>
            </b-table-lite>
            <div class="clearfix">
                <reference class="float-right mt-2" :reference="powerBase.reference"></reference>
            </div>
        </b-collapse>
    </b-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
.eote-force-power-card {
        .card-header {
            border-bottom: none;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
        }

        .collapse-icon {
            transition: transform 0.25s ease-in-out;
        }

        .open > .collapse-icon {
            transform: rotate(90deg);
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import eoteMan from '../../../../api/managers/eote';

    // Components
    import MarkdownBlock from '../../../ui/markdown';
    import Reference from '../../../character/reference.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotEForcePowerCard',
        components: {
            MarkdownBlock,
            Reference
        },
        props: {
            power: {
                type: Object,
                required: true
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            forcePowers: eoteMan.forcePowers$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                visible: false,
                upgradeFields: [
                    { key: 'name', class: 'text-nowrap' },
                    { key: 'description' }
                ]
            };
        },
        computed: {
            powerBase()
            {
                if(this.power && this.power.id)
                {
                    return this.forcePowers.find((forcePower) => forcePower.id === this.power.id);
                } // end if

                return {};
            },
            upgrades()
            {
                const upgradeList = Object.keys(this.powerBase.upgrades).reduce((upgrades, name) =>
                {
                    const upgrade = this.powerBase.upgrades[name];
                    const upgradeInst = this.power.upgrades[name];

                    if(Array.isArray(upgrade))
                    {
                        // If it's an array (i.e. `control`) we just add them as individual upgrades, all with the same
                        // name. This is find, because we don't assume the name is unique. Also, we add the `index`
                        // property, because that tells us which control item we've purchased.
                        upgrades = upgrades.concat(upgrade.map((up, index) =>
                        {
                            const purchased = upgradeInst.includes(index) ? 1 : 0;
                            return {
                                ...up,
                                name,
                                index,
                                purchased
                            };
                        }));
                    }
                    else
                    {
                        // In the simple case, we just push the upgrade with the name.
                        upgrades.push({ ...upgrade, name, purchased: upgradeInst });
                    } // end if

                    return upgrades;
                }, []);

                return upgradeList.filter((upgrade) => upgrade.purchased > 0);
            }
        },
        methods: {
            sentenceCase(text)
            {
                return _.startCase(text);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
