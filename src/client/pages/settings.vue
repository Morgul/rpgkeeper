<!----------------------------------------------------------------------------------------------------------------------
  -- Settings
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="settings-page container pt-3">
        <!-- Loading -->
        <loading v-if="status === 'unknown'" text="Account Loading..."></loading>

        <!-- Once loaded -->
        <div v-else-if="status === 'signed in'">
            <!-- Giant Avatar Picture of Doom -->
            <div class="avatar-holder">
                <b-img rounded="circle" width="128" height="128" :src="account.avatarUrl" :alt="account.name" class="m-1" center></b-img>
                <h4 class="text-center">
                    {{ account.email }}
                </h4>
            </div>

            <!-- Display Name setting -->
            <b-form-row class="mb-4">
                <b-col offset="1" cols="10" offset-md="3" md="6" offset-lg="4" lg="4">
                    <b-input-group>
                        <b-form-input v-model="account.name" placeholder="Display Name"></b-form-input>

                        <b-input-group-append>
                            <b-btn variant="primary" @click="save()">
                                <fa icon="save"></fa>
                                Set Name
                            </b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-form-row>

            <!-- Settings -->
            <b-card header-bg-variant="dark" header-text-variant="white" class="drop-shadow">
                <template slot="header">
                    <h5 class="align-middle mt-2">
                        <fa icon="sliders-h"></fa>
                        Settings
                    </h5>
                </template>

                <h4 class="text-center text-muted mb-0">
                    Settings are not implemented.
                </h4>
            </b-card>
        </div>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .settings-page {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import authMan from '../api/managers/auth';

    // Components
    import Loading from '../components/ui/loading.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'SettingsPage',
        components: {
            Loading
        },
        subscriptions: {
            account: authMan.account$,
            status: authMan.status$
        },
        methods: {
            save()
            {
                authMan.saveAccount(this.account);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
