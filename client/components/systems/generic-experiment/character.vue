<!----------------------------------------------------------------------------------------------------------------------
  -- Character Component
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-container v-if="character" id="generic-experiment-character">
        oi
    </b-container>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #generic-experiment-character {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import authentication from '../../../api/managers/auth';
    import characters from '../../../api/managers/character';

    // Components
    import Portrait from '../../character/portrait.vue';

    // the ...experiment
    import {start as startExperiment} from './App.js';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        components: {
            Portrait,
        },
        computed: {
            isAuthorized()
            {
                return !!this.account
                    && !!this.character
                    && (this.account.id || 'nope!') === this.character.account_id;
            }
        },
        subscriptions: {
            account: authentication.account$,
            character: characters.selected$
        },
        mounted: function(){
            console.log('i do declare...', startExperiment);
            startExperiment('generic-experiment-character');
            //experiment.start('generic-experiment-character');
            //console.log('i did declar');
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
