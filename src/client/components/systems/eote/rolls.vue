<!----------------------------------------------------------------------------------------------------------------------
  -- Eote Rolls
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="rolls" icon="dice" title="Rolls" fill>
        <div class="roll-dice">
            <b>Roll:</b>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-html="diceDisplay"></span>
        </div>

        <div class="dice-input d-flex flex-wrap align-content-stretch justify-content-center">
            <b-input-group v-for="die in diceList" :key="die" size="sm" class="text-nowrap flex-nowrap w-auto m-1">
                <b-input-group-prepend is-text>
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span v-html="makeDieHTML(die)"></span>
                </b-input-group-prepend>
                <b-input-group-append>
                    <b-btn variant="light" @click="addDie(die)">
                        <fa icon="plus"></fa>
                    </b-btn>
                    <b-btn variant="light" @click="removeDie(die)">
                        <fa icon="minus"></fa>
                    </b-btn>
                </b-input-group-append>
            </b-input-group>
        </div>

        <!-- Roll History -->
        <div class="flex-fill mb-3 overflow-auto h-0">
            <div v-if="rollResult.name" class="mr-1 float-left text-muted">
                <small>{{ rollResult.name }}</small>
            </div>
            <div class="text-right text-muted">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="fullResultDisplay"></span>
            </div>

            <h3 class="mt-3">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="uncancelledResultDisplay"></span>
            </h3>
        </div>

        <!-- Roll Buttons -->
        <div v-if="!readonly" class="text-right">
            <b-btn :disabled="readonly" @click="clearRoll()">
                <fa icon="times"></fa>
                Clear
            </b-btn>
            <b-btn variant="primary" class="ml-1" :disabled="readonly" @click="roll()">
                <fa icon="dice"></fa>
                Roll
            </b-btn>
        </div>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #rolls {
        .card-body {
            display: flex;
            flex-direction: column;

            .roll-dice {
                padding-bottom: 0.5rem;
                margin-bottom: 0.5rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }

            .dice-input {
                padding-bottom: 0.5rem;
                margin-bottom: 0.5rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);

                .input-group {
                    .btn.btn-light {
                        border: 1px solid #ced4da !important;
                    }
                }
            }
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import eoteMan from '../../../api/managers/eote';

    // Utils
    import diceUtil from '../../../api/utils/dice';

    // Components
    import RpgkCard from '../../ui/card.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotERollsBlock',
        components: {
            RpgkCard
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                pendingRollname: '',
                rollResult: {
                    full: [],
                    uncancelled: [],
                    name: ''
                },
                dice: {
                    proficiency: 0,
                    ability: 0,
                    boost: 0,
                    challenge: 0,
                    difficulty: 0,
                    setback: 0,
                    force: 0
                }
            };
        },
        computed: {
            diceList()
            {
                return Object.keys(this.dice)
                    .filter((die) =>
                    {
                        return this.mode !== 'genesys' || die !== 'force';
                    });
            },
            diceDisplay()
            {
                return _.chain(diceUtil.eoteDiceSortOrder)
                    .reduce((accum, die) =>
                    {
                        // Make an array with the string name of the die repeated `dice[die]` times.
                        const dice = _.map(_.range(this.dice[die]), () => die);
                        return accum.concat(dice);
                    }, [])
                    .sortBy((die) => diceUtil.eoteDiceSortOrder.indexOf(die))
                    .reduce((results, die) => `${ results }<${ die }></${ die }>`, '')
                    .value();
            },
            fullResultDisplay()
            {
                return _.reduce(this.rollResult.full, (results, result) => `${ results }<${ result }></${ result }>`, '');
            },
            uncancelledResultDisplay()
            {
                return _.reduce(this.rollResult.uncancelled, (results, result) => `${ results }<${ result }></${ result }>`, '');
            }
        },
        methods: {
            makeDieHTML(die)
            {
                return `<${ die }></${ die }>`;
            },
            addDie(die)
            {
                this.dice[die] += 1;
            },
            removeDie(die)
            {
                this.dice[die] = Math.max(this.dice[die] - 1, 0);
            },
            setDice(dice = {}, rollName = '')
            {
                // Set our dice counts to what was specified.
                Object.assign(this.dice, {
                    ability: 0,
                    proficiency: 0,
                    difficulty: 0,
                    challenge: 0,
                    boost: 0,
                    setback: 0,
                    force: 0,
                    ...dice
                });

                // Set the rollname
                this.pendingRollname = rollName;
            },
            roll(rollName)
            {
                rollName = rollName || this.pendingRollname;

                this.rollResult = {
                    ...diceUtil.rollEotE(this.dice),
                    name: rollName
                };

                // Clear pending roll name
                this.pendingRollname = '';
            },
            clearRoll()
            {
                this.rollResult = {
                    full: [],
                    uncancelled: [],
                    name: ''
                };

                // Reset our dice counts
                this.setDice();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
