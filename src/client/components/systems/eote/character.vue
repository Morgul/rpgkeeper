<!----------------------------------------------------------------------------------------------------------------------
  -- Character Component
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div id="eote-character" class="container" :class="`${ mode }-system`">
        <div class="d-flex">
            <portrait class="mr-1 d-none d-lg-block" :src="character.portrait" size="lg"></portrait>
            <div class="d-flex flex-column w-50">
                <biography :readonly="!isAuthorized"></biography>
                <characteristics class="mt-1" :readonly="!isAuthorized"></characteristics>
            </div>
            <rolls ref="roller" class="ml-1 w-50" :skills="character.details.skills" :readonly="!isAuthorized"></rolls>
        </div>
        <div class="d-flex mt-1">
            <div class="d-flex flex-column flex-fill mr-1">
                <skills :readonly="!isAuthorized" @roll="onRoll"></skills>
                <talents class="mt-1" :readonly="!isAuthorized"></talents>
                <force-powers v-if="showForcePowers" class="mt-1" :readonly="!isAuthorized"></force-powers>
                <weapons class="mt-1" :readonly="!isAuthorized" @roll="onRoll"></weapons>
                <armor class="mt-1" :readonly="!isAuthorized"></armor>
            </div>
            <div class="d-flex flex-column" style="min-width: 300px; max-width: 300px;">
                <motivations v-if="mode === 'genesys'" class="mb-1 flex-shrink-1 flex-grow-0" :readonly="!isAuthorized"></motivations>
                <experience class="flex-shrink-1 flex-grow-0" :readonly="!isAuthorized"></experience>
                <defenses class="mt-1 flex-shrink-1 flex-grow-0" :readonly="!isAuthorized"></defenses>
                <wounds class=" mt-1 flex-shrink-1 flex-grow-0" :readonly="!isAuthorized"></wounds>
                <force-pool v-if="mode === 'eote'" class=" mt-1 flex-shrink-1 flex-grow-0" :readonly="!isAuthorized"></force-pool>
                <criticals class="mt-1" :readonly="!isAuthorized"></criticals>
            </div>
        </div>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #eote-character {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';
    import eoteMan from '../../../api/managers/eote';

    // Components
    import Portrait from '../../character/portrait.vue';
    import Biography from './biography.vue';
    import Characteristics from './characteristics.vue';
    import Rolls from './rolls.vue';
    import Skills from './skills';
    import Defenses from './defenses.vue';
    import Experience from './experience.vue';
    import Wounds from './wounds.vue';
    import Criticals from './criticals.vue';
    import Weapons from './weapons.vue';
    import Armor from './armor.vue';
    import Talents from './talents.vue';
    import ForcePool from './forcePool.vue';
    import ForcePowers from './forcePowers.vue';
    import Motivations from './motivations.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: eoteMan.mode === 'genesys' ? 'GenesysCharacter' : 'EotECharacter',
        components: {
            Biography,
            Characteristics,
            Portrait,
            Rolls,
            Skills,
            Defenses,
            Experience,
            Wounds,
            Criticals,
            Weapons,
            Armor,
            Talents,
            ForcePool,
            ForcePowers,
            Motivations
        },
        props: {
            isAuthorized: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$
        },
        computed: {
            showForcePowers()
            {
                return this.mode === 'eote' && this.character.details.force.sensitive;
            }
        },
        methods: {
            onRoll(dice, name)
            {
                window.scrollTo(0, 0);
                this.$refs.roller.setDice(dice, name);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
