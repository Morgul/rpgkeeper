<!----------------------------------------------------------------------------------------------------------------------
  -- Character Component
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-container v-if="character" id="fate-character">
        <div class="d-flex">
            <portrait class="mr-1 d-none d-lg-block" :src="character.portrait" size="lg"></portrait>
            <identity class="mr-1 ml-1 w-50" :readonly="!isAuthorized"></identity>
            <rolls class="ml-1 w-50" :skills="character.details.skills" :readonly="!isAuthorized"></rolls>
        </div>
        <div class="d-flex mt-2">
            <aspects v-model="character.details.aspects" :readonly="!isAuthorized"></aspects>
            <skills v-model="character.details.skills" :readonly="!isAuthorized"></skills>
        </div>
        <div class="d-flex mt-2">
            <extras v-model="character.details.extras" class="w-50" :readonly="!isAuthorized"></extras>
            <stunts v-model="character.details.stunts" class="w-50 ml-2" :readonly="!isAuthorized"></stunts>
        </div>
        <div class="d-flex mt-2">
            <stress v-model="character" style="flex-basis: 40%" :readonly="!isAuthorized"></stress>
            <consequences style="flex-basis: 60%" class="ml-2" :readonly="!isAuthorized"></consequences>
        </div>
    </b-container>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #fate-character {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import Identity from './identity.vue';
    import Rolls from './rolls.vue';
    import Aspects from './aspects.vue';
    import Skills from './skills.vue';
    import Extras from './extras.vue';
    import Stunts from './stunts.vue';
    import Stress from './stress.vue';
    import Consequences from './consequences.vue';
    import Portrait from '../../character/portrait.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        components: {
            Portrait,
            Identity,
            Rolls,
            Aspects,
            Skills,
            Extras,
            Stunts,
            Stress,
            Consequences
        },
        props: {
            isAuthorized: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            character: charMan.selected$
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
