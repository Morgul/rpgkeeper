<!----------------------------------------------------------------------------------------------------------------------
  -- criticals.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-criticals-block" :class="{ readonly: readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="heart-rate"></fa>
                <span class="d-none d-md-inline">Criticals</span>
            </h5>
        </div>

        <!-- Card Body -->
        <b-input-group>
            <b-form-select
                v-model="selectedCritical"
                :options="formattedCriticals"
                :disabled="readonly"
            ></b-form-select>
            <b-input-group-append>
                <b-btn
                    variant="primary"
                    style="max-width: 48px; min-width: 48px;"
                    title="Add selected Critical"
                    :disabled="readonly"
                    @click="addCritical()"
                >
                    <fa icon="plus"></fa>
                </b-btn>
            </b-input-group-append>
        </b-input-group>

        <b-input-group class="mt-2">
            <b-form-input v-model.number="rollBonus" type="number" min="0" step="1" placeholder="Crit. bonus"></b-form-input>
            <b-input-group-append>
                <b-btn
                    variant="primary"
                    style="min-width: 48px;"
                    title="Roll for a random Critical"
                    :disabled="readonly"
                    @click="rollCritical()"
                >
                    <fa icon="dice"></fa>
                    Roll Crit.
                </b-btn>
            </b-input-group-append>
        </b-input-group>

        <hr class="mt-2 mb-2" />

        <critical-card
            v-for="(critical, index) in currentCriticals"
            :key="index"
            class="mt-2"
            :critical="findCritical(critical.name)"
            :readonly="readonly"
            @remove="removeCritical(index)"
        ></critical-card>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #eote-criticals-block {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../api/managers/character';
    import diceMan from '../../../api/utils/dice';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import CriticalCard from './components/criticalCard.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotECriticalsBlock',
        components: {
            RpgkCard,
            CriticalCard
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
        data()
        {
            return {
                selectedCritical: diceMan.eoteCriticals[0].title,
                currentCriticals: [],
                rollBonus: undefined
            };
        },
        computed: {
            criticals()
            {
                return diceMan.eoteCriticals;
            },
            formattedCriticals()
            {
                return _.map(this.criticals, (critical) =>
                {
                    const lowerBound = _.padStart(critical.range[0], 3, '0');
                    const upperBound = _.padStart(critical.range[1], 3, '0');
                    let bounds = `${ lowerBound }-${ upperBound }`;
                    let severity = `(${ critical.severity })`;

                    if(upperBound === 'Infinity')
                    {
                        bounds = `${ lowerBound }+`;
                    } // end if

                    if(!critical.severity)
                    {
                        severity = '';
                    } // end if

                    return {
                        value: critical.title,
                        html: `${ bounds }: ${ critical.title } ${ severity }`
                    };
                });
            }
        },
        mounted()
        {
            this.sortCriticals();
        },
        methods: {
            sortCriticals()
            {
                this.currentCriticals = _.sortBy(this.character.details.health.criticalInjuries, (critical) => critical.value || 9000);
            },
            findCritical(criticalName)
            {
                return _.find(this.criticals, { title: criticalName });
            },
            addCritical(critical)
            {
                critical = critical || _.find(this.criticals, { title: this.selectedCritical });
                if(critical)
                {
                    this.character.details.health.criticalInjuries.push({ name: critical.title, value: critical.severity });
                    this.sortCriticals();

                    return this.saveChar();
                } // end if
            },
            removeCritical(index)
            {
                this.currentCriticals.splice(index, 1);
                this.character.details.health.criticalInjuries = this.currentCriticals;
                return this.saveChar();
            },
            rollCritical(bonus = 0)
            {
                bonus = bonus || this.rollBonus || 0;
                const totalBonus = bonus + (this.currentCriticals.length * 10);
                this.addCritical(diceMan.rollEotECritical(totalBonus));

                this.rollBonus = undefined;
            },
            saveChar()
            {
                // Save the character
                return charMan.save(this.character);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
