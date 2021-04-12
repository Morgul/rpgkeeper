<!----------------------------------------------------------------------------------------------------------------------
  -- Character Component
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-container v-if="character" id="risus-character">
        <div class="d-flex">
            <portrait class="mr-1 d-none d-lg-block" :src="character.portrait" size="lg"></portrait>
            <bio class="mr-1 ml-1 w-50" :readonly="!isAuthorized"></bio>
            <rolls ref="roller" class="ml-1 w-50" :skills="character.details.skills" :readonly="!isAuthorized"></rolls>
        </div>
        <div class="d-flex mt-2">
            <cliches class="w-50 mr-1" :readonly="!isAuthorized" @roll="onRoll"></cliches>
            <hooks class="w-50 ml-1" :readonly="!isAuthorized"></hooks>
        </div>
    </b-container>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #risus-character {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import BioComponent from './bio.vue';
    import RollsComponent from './rolls.vue';
    import PortraitComponent from '../../character/portrait.vue';
    import ClichesComponent from './cliches.vue';
    import HooksComponent from './hooks.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        components: {
            bio: BioComponent,
            rolls: RollsComponent,
            portrait: PortraitComponent,
            cliches: ClichesComponent,
            hooks: HooksComponent
        },
        props: {
            isAuthorized: {
                type: Boolean,
                default: false
            }
        },
        subscriptions: {
            character: charMan.selected$
        },
        computed: {
            cliches()
            {
                return _.sortBy(this.character.cliches, 'value').reverse();
            },
            hooks()
            {
                return this.character.hooks;
            }
        },
        methods: {
            onRoll(dice, name)
            {
                this.$refs.roller.roll(dice, name);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
