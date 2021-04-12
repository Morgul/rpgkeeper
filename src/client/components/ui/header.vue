<!----------------------------------------------------------------------------------------------------------------------
  -- Site Header
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-navbar toggleable="md" type="dark" variant="dark" sticky>
        <b-navbar-brand to="/">
            <img src="/static/images/logo.png" width="30px" height="30px" style="display: inline-block; margin-top: -5px" />
            RPGKeeper
        </b-navbar-brand>
        <b-navbar-nav>
            <b-nav-item to="/dashboard">
                <fa icon="columns"></fa>
                Dashboard
            </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
            <login></login>
        </b-navbar-nav>
    </b-navbar>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
	#site-header {
	}
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

	// Managers
    import authMan from '../../api/managers/auth';

    // Components
    import LoginComponent from './login.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'SiteHeader',
        components: {
            login: LoginComponent
        },
        subscriptions: {
            account: authMan.account$
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
