<!----------------------------------------------------------------------------------------------------------------------
  -- Character Page
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-container id="character-page" class="mt-2 mb-3">
        <!-- Error Handling -->
        <b-container v-if="error">
            <b-alert variant="danger" show>
                <h4>
                    <fa icon="exclamation-triangle"></fa>
                    Error loading character
                </h4>
                <div v-for="(line, index) in error.stack.split('\n')" :key="index">
                    {{ line }}
                </div>
                <div class="text-right">
                    <b-btn to="/dashboard" variant="danger">
                        <fa icon="arrow-left"></fa>
                        Back to Dashboard
                    </b-btn>
                </div>
            </b-alert>
        </b-container>

        <!-- Loading -->
        <loading v-else-if="!char"></loading>

        <!-- Main Sheet Tabs -->
        <b-tabs v-else class="main-tabs" pills>
            <template v-if="system" slot="tabs-start">
                <li style="position: absolute; left: 18px; padding-top: 10px;">
                    <h4 class="text-muted">
                        {{ system.name }}
                        <fa v-if="saving" icon="save" class="flash text-success ml-2"></fa>
                    </h4>
                </li>
            </template>
            <b-tab active>
                <template slot="title">
                    <fa icon="file-user"></fa>
                    Sheet
                </template>

                <!-- Actual System Character Sheet -->
                <component :is="char.system">
                    <!-- We put a warning here, mostly for the developer. -->
                    <b-container>
                        <b-alert variant="warning" show>
                            <h4>
                                <fa icon="exclamation-triangle"></fa>
                                Unknown system "{{ char.system }}"
                            </h4>
                            <div>
                                This is an internal error, and you never be seen in normal operation. If you are a
                                developer, you done messed up. If you're a user, then please report this as a bug.
                            </div>
                            <div class="text-right">
                                <b-btn :href="`https://github.com/Morgul/rpgkeeper/issues/new?title=[Bug] Unknown system '${ char.system }'.&labels=bug`" target="_blank" variant="warning">
                                    <fa icon="bug"></fa>
                                    Report Bug
                                </b-btn>
                                <b-btn to="/dashboard" variant="warning">
                                    <fa icon="arrow-left"></fa>
                                    Back to Dashboard
                                </b-btn>
                            </div>
                        </b-alert>
                    </b-container>
                </component>
            </b-tab>
            <b-tab>
                <template slot="title">
                    <fa icon="book"></fa>
                    Notes
                </template>

                <notes></notes>
            </b-tab>
        </b-tabs>
    </b-container>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #character-page {
        .main-tabs {
            position: relative;

            .nav.nav-pills {
                float: right;
            }

            .tab-content {
                clear: both;
                padding-top: 0.5rem;
            }
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import charMan from '../api/managers/character';
    import sysMan from '../api/managers/systems';

    // Components
    import Loading from '../components/ui/loading.vue';
    import Notes from '../components/notes/notes.vue';

    // Systems
    import RisusCharacter from '../components/systems/risus/character.vue';
    import FateCharacter from '../components/systems/fate/character.vue';
    import EoteCharacter from '../components/systems/eote/character.vue';
    import WfrpCharacter from '../components/systems/wfrp/character.vue';
    import GenericExperiment from '../components/systems/generic-experiment/character.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'CharacterPage',
        components: {
            Loading,
            Notes,

            // Systems
            fate: FateCharacter,
            risus: RisusCharacter,
            genesys: EoteCharacter, // This is actually correct. We use the same component for both.
            eote: EoteCharacter,
            wfrp: WfrpCharacter,
            'generic-experiment': GenericExperiment
        },
        subscriptions: {
            char: charMan.selected$,
            saving: charMan.saving$
        },
        data()
        {
            return {
                error: undefined,
                system: undefined
            };
        },
        mounted()
        {
            this.$watch('char', async() =>
            {
                if(this.char)
                {
                    this.system = await sysMan.getSystem(this.char.system);
                }
                else
                {
                    this.system = undefined;
                } // end if
            });

            // We always select the character that matches our route, so we handle navigation.
            charMan.select(this.$route.params.id).catch((err) => this.error = err);
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
