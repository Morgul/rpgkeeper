<!----------------------------------------------------------------------------------------------------------------------
  -- Login Component
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div id="login">
        <!-- Profile dropdown -->
        <b-nav-item-dropdown v-if="account" id="profile-dropdown" :title="account.username" right no-caret>
            <template slot="button-content">
                <b-img v-if="account.avatar" rounded="circle" width="32" height="32" blank-color="#777" :src="account.avatar"></b-img>
                <fa v-else icon="user-circle" size="2x"></fa>
                {{ account.name }}
            </template>
            <b-dropdown-item to="/settings">
                <fa icon="user-circle"></fa>
                Profile
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="signOut()">
                <fa icon="sign-out"></fa>
                Sign Out
            </b-dropdown-item>
        </b-nav-item-dropdown>

        <!-- Spinner -->
        <b-nav-text v-else-if="loading" class="p-0">
            <span class="fa-layers fa-fw fa-2x">
                <fa class="text-primary" icon="spinner-third" spin></fa>
                <fa icon="user-circle"></fa>
            </span>
        </b-nav-text>

        <!-- Sign In Button -->
        <b-button v-else id="google-signin-btn" variant="dark">
            <fa :icon="['fab', 'google']"></fa>
            Sign In
        </b-button>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #login {
		#profile-dropdown {
            margin-top: -2px;
            margin-bottom: -2px;
			a.nav-link {
				padding-top: 0.25rem;
                padding-bottom: 0.25rem;
			}
		}
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import $ from 'jquery';

    // Managers
    import authMan from '../../api/managers/auth';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        subscriptions: {
            account: authMan.account$,
            authStatus: authMan.status$
        },
        computed: {
            loading() { return this.authStatus === 'signing in'; }
        },
        mounted()
        {
            const btnElem = $(this.$el).find('#google-signin-btn');
            authMan.attachSignIn(btnElem[0]);
        },
        methods: {
            signOut() { return authMan.signOut(); }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
