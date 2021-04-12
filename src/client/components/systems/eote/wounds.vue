<!----------------------------------------------------------------------------------------------------------------------
  -- Wounds
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <rpgk-card id="eote-wounds-block" :class="{ readonly: readonly }" fill>
        <!-- Header -->
        <div slot="header" class="d-flex">
            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                <fa class="mr-1" icon="heart"></fa>
                <span class="d-none d-md-inline">Wounds</span>
            </h5>
            <div v-if="!readonly" class="ml-auto">
                <b-btn size="sm" style="margin-bottom: 1px;" @click="openEditModal()">
                    <fa icon="edit" fixed-width></fa>
                    <span class="d-none d-md-inline">Edit</span>
                </b-btn>
            </div>
        </div>

        <!-- Card Body -->
        <div class="d-flex">
            <b-card class="flex-fill mr-2" no-body>
                <div class="p-2 text-center">
                    <b>Wounds</b>
                    <hr class="m-1" />
                    <h5 class="m-0">
                        <span :class="woundTextClass">{{ health.wounds }}</span> / <small class="text-muted">{{ health.woundThreshold }}</small>
                    </h5>
                </div>
            </b-card>
            <b-card class="flex-fill" no-body>
                <div class="p-2 text-center">
                    <b>Strain</b>
                    <hr class="m-1" />
                    <h5 class="m-0">
                        <span :class="strainTextClass">{{ health.strain }}</span> / <small class="text-muted">{{ health.strainThreshold }}</small>
                    </h5>
                </div>
            </b-card>
        </div>
        <b-btn-group class="mt-1 w-100">
            <b-btn v-b-tooltip.hover variant="outline-secondary" title="Use a stimpack" @click="useStim">
                <span v-if="mode === 'eote'">Stimpacks</span>
                <span v-else>Painkillers</span>
                ({{ stims }})
            </b-btn>
            <b-btn v-b-tooltip.hover variant="outline-secondary" style="max-width: 48px" title="Reset Usages" @click="resetStims">
                <fa icon="sync"></fa>
            </b-btn>
        </b-btn-group>
        <b-input-group class="mt-1 text-nowrap flex-nowrap">
            <b-input v-model.number="woundsInput" type="number" min="0" step="1" placeholder="Wounds" autocomplete="off"></b-input>
            <b-input-group-append>
                <b-btn v-b-tooltip.hover variant="outline-secondary" title="Deal damage, applying soak" @click="soakWounds()">
                    <fa icon="shield-alt"></fa>
                </b-btn>
                <b-btn v-b-tooltip.hover variant="outline-secondary" title="Deal damage directly" @click="dealWounds()">
                    <fa :icon="mode === 'eote' ? 'swords-laser' : 'swords'"></fa>
                </b-btn>
                <b-btn v-b-tooltip.hover variant="outline-secondary" title="Heal wounds" @click="healWounds()">
                    <fa icon="first-aid"></fa>
                </b-btn>
            </b-input-group-append>
        </b-input-group>
        <b-input-group class="mt-1">
            <b-input v-model.number="strainInput" type="number" min="0" step="1" placeholder="Strain" autocomplete="off"></b-input>
            <b-input-group-append>
                <b-btn v-b-tooltip.hover variant="outline-secondary" title="Deal damage, applying soak" @click="soakStrain()">
                    <fa icon="shield-alt"></fa>
                </b-btn>
                <b-btn v-b-tooltip.hover variant="outline-secondary" title="Deal damage directly" @click="dealStrain()">
                    <fa :icon="mode === 'eote' ? 'swords-laser' : 'swords'"></fa>
                </b-btn>
                <b-btn v-b-tooltip.hover variant="outline-secondary" title="Heal strain" @click="healStrain()">
                    <fa icon="first-aid"></fa>
                </b-btn>
            </b-input-group-append>
        </b-input-group>

        <hr class="mt-2 mb-2" />

        <b-btn-group class="w-100">
            <b-btn
                v-b-tooltip.hover.html
                :variant="health.staggered ? 'warning' : 'outline-secondary'"
                size="sm"
                :title="staggeredText"
                :pressed.sync="health.staggered"
                @click="saveChar"
            >
                Stagg.
            </b-btn>
            <b-btn
                v-b-tooltip.hover.html
                :variant="health.immobilized ? 'warning' : 'outline-secondary'"
                size="sm"
                :title="immobilizedText"
                :pressed.sync="health.immobilized"
                @click="saveChar"
            >
                Immob.
            </b-btn>
            <b-btn
                v-b-tooltip.hover.html
                :variant="health.disoriented ? 'warning' : 'outline-secondary'"
                size="sm"
                :title="disorientedText"
                :pressed.sync="health.disoriented"
                @click="saveChar"
            >
                Disor.
            </b-btn>
        </b-btn-group>

        <!-- Edit Modal -->
        <edit-modal ref="editModal"></edit-modal>
    </rpgk-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #eote-wounds-block {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';
    import eoteMan from '../../../api/managers/eote';

    // Components
    import RpgkCard from '../../ui/card.vue';
    import EditModal from './modals/editWoundsModal.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EotEWounsdBlock',
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
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        data()
        {
            return {
                woundsInput: undefined,
                strainInput: undefined
            };
        },
        computed: {
            defenses() { return this.character.details.defenses; },
            health() { return this.character.details.health; },
            isIncapacitatedWounds()
            {
                return this.health.wounds >= this.health.woundThreshold;
            },
            isIncapacitatedStrain()
            {
                return this.health.strain >= this.health.strainThreshold;
            },
            isDangerWounds()
            {
                const threshold = Math.ceil(this.health.woundThreshold / 3);
                const woundCount = this.health.woundThreshold - threshold;
                return this.health.wounds >= woundCount;
            },
            isDangerStrain()
            {
                const threshold = Math.ceil(this.health.strainThreshold / 3);
                const strainCount = this.health.strainThreshold - threshold;
                return this.health.strain >= strainCount;
            },
            woundTextClass()
            {
                if(this.isIncapacitatedWounds)
                {
                    return 'text-danger';
                }
                else if(this.isDangerWounds)
                {
                    return 'text-warning';
                } // end if

                return undefined;
            },
            strainTextClass()
            {
                if(this.isIncapacitatedStrain)
                {
                    return 'text-danger';
                }
                else if(this.isDangerStrain)
                {
                    return 'text-warning';
                } // end if

                return undefined;
            },
            staggeredText()
            {
                return `A <b>staggered</b> character cannot perform actions (including downgrading actions to maneuvers).`;
            },
            immobilizedText()
            {
                return `<span class="${ this.mode }-system">An <b>immobilized</b> character cannot perform maneuvers (including maneuvers purchased via strain or by spending <advantage></advantage>)</span>`;
            },
            disorientedText()
            {
                return `<span class="${ this.mode }-system">A <b>disoriented</b> character adds <setback></setback> (setback) to all checks they make.</span>`;
            },
            stims()
            {
                // This is just here in case there's ever a desire to make the maximum flexible.
                const maxStims = 5;
                return Math.max(0, maxStims - (this.health.stimsUsed || 0));
            }
        },
        methods: {
            openEditModal()
            {
                this.$refs.editModal.show();
            },
            useStim()
            {
                if((this.stims > 0) && (this.health.wounds > 0))
                {
                    const newWounds = this.health.wounds - this.stims;
                    this.health.wounds = Math.max(0, newWounds);
                    this.health.stimsUsed = (this.health.stimsUsed || 0) + 1;

                    // Save the character
                    return charMan.save(this.character);
                } // end if
            },
            resetStims()
            {
                this.health.stimsUsed = 0;

                // Save the character
                return charMan.save(this.character);
            },
            soakWounds()
            {
                const soak = this.defenses.soak || 0;
                if(this.woundsInput > soak)
                {
                    // Safety check; can never be less than 0.
                    const woundsRemaining = Math.max(0, this.woundsInput - soak);

                    // Apply the rest as normal wounds
                    this.dealWounds(woundsRemaining);
                } // end if
            },
            dealWounds(wounds)
            {
                wounds = wounds || this.woundsInput || 0;

                if(wounds)
                {
                    this.health.wounds += wounds;

                    // You can only get to 2 x woundThreshold before we stop tracking.
                    this.health.wounds = Math.min(this.health.woundThreshold * 2, this.health.wounds);

                    // Clear woundsInput
                    this.woundsInput = undefined;

                    // Save the character
                    return charMan.save(this.character);
                } // end if
            },
            healWounds(wounds)
            {
                wounds = wounds || this.woundsInput || 0;

                if(wounds && this.health.wounds)
                {
                    this.health.wounds -= wounds;
                    this.health.wounds = Math.max(0, this.health.wounds);

                    // Clear woundsInput
                    this.woundsInput = undefined;

                    // Save the character
                    return charMan.save(this.character);
                } // end if
            },
            soakStrain()
            {
                const soak = this.defenses.soak || 0;
                if(this.strainInput > soak)
                {
                    // Safety check; can never be less than 0.
                    const strainRemaining = Math.max(0, this.strainInput - soak);

                    // Apply the rest as normal strain
                    this.dealStrain(strainRemaining);
                } // end if
            },
            dealStrain(strain)
            {
                strain = strain || this.strainInput || 0;

                if(strain)
                {
                    this.health.strain += strain;

                    // You can only get to strainThreshold before we stop tracking.
                    this.health.strain = Math.min(this.health.strainThreshold, this.health.strain);

                    // Clear woundsInput
                    this.strainInput = undefined;

                    // Save the character
                    return charMan.save(this.character);
                } // end if
            },
            healStrain(strain)
            {
                strain = strain || this.strainInput || 0;

                if(strain && this.health.strain)
                {
                    this.health.strain -= strain;
                    this.health.strain = Math.max(0, this.health.strain);

                    // Clear woundsInput
                    this.strainInput = undefined;

                    // Save the character
                    return charMan.save(this.character);
                } // end if
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
