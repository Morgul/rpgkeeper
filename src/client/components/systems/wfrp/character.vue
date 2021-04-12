<!----------------------------------------------------------------------------------------------------------------------
  -- Character Component
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-container v-if="character" id="wfrp-character">
        <div class="d-flex">
            <portrait class="mr-1 d-none d-lg-block" :src="character.portrait" size="lg"></portrait>
            <bio class="mr-1 ml-1 w-50" :readonly="!isAuthorized"></bio>
        </div>
        <div class="d-flex mt-2">
            <stats class="w-50 mr-1" :readonly="!isAuthorized"></stats>
            <skills class="w-50 mr-1" :readonly="!isAuthorized"></skills>
        </div>
    </b-container>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #wfrp-character {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../../../api/managers/character';

    // Components
    import BioComponent from './bio.vue';
    import PortraitComponent from '../../character/portrait.vue';
    import StatsComponent from './stats.vue';
    import SkillsComponent from './skills';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        components: {
            bio: BioComponent,
            portrait: PortraitComponent,
            stats: StatsComponent,
            skills: SkillsComponent
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
            stats()
            {
                return this.character.stats;
            },
            skills()
            {
                return this.character.skills;
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
