<!----------------------------------------------------------------------------------------------------------------------
  -- Main Application Dashboard
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-container id="dashboard" class="pb-0">
        <b-form-row>
            <!--<b-col cols="12" lg="6" class="mb-3">-->
            <!--<b-card header-bg-variant="dark" header-text-variant="white" class="shadow-sm h-100">-->
            <!--<template slot="header">-->
            <!--<div class="d-flex">-->
            <!--<h5 class="align-items-center d-flex text-nowrap m-0 flex-grow-0 flex-shrink-0 w-auto">-->
            <!--<fa class="mr-1" icon="books"></fa>-->
            <!--<span class="d-none d-md-inline">Campaigns</span>-->
            <!--</h5>-->
            <!--<b-input-group class="flex-fill ml-2">-->
            <!--<b-form-input placeholder="Search Campaigns..." disabled></b-form-input>-->
            <!--<b-input-group-append>-->
            <!--<b-btn variant="primary" disabled>-->
            <!--<fa icon="search"></fa>-->
            <!--</b-btn>-->
            <!--</b-input-group-append>-->
            <!--</b-input-group>-->
            <!--<b-dropdown id="filterSystems" class="ml-2 flex-grow-0 flex-shrink-0 w-auto" right disabled>-->
            <!--<template slot="button-content">-->
            <!--<fa icon="cog"></fa>-->
            <!--</template>-->

            <!--<b-dropdown-item>Filter 1</b-dropdown-item>-->
            <!--</b-dropdown>-->
            <!--</div>-->
            <!--</template>-->

            <!--<h4 class="text-center text-muted mb-0">Campaigns are not implemented.</h4>-->
            <!--</b-card>-->
            <!--</b-col>-->
            <b-col cols="12" class="mb-3">
                <!-- Characters Card -->
                <b-card header-bg-variant="dark" header-text-variant="white" class="shadow-sm h-100" no-body>
                    <template slot="header">
                        <div class="d-flex">
                            <h5 class="align-items-center d-flex text-nowrap m-0 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                                <fa class="mr-1" icon="users"></fa>
                                <span class="d-none d-md-inline">Characters</span>
                            </h5>
                            <b-input-group class="flex-fill ml-auto" style="max-width: 400px">
                                <b-form-input v-model="charFilter" placeholder="Search Characters..."></b-form-input>
                                <b-input-group-append>
                                    <b-btn variant="primary">
                                        <fa icon="search"></fa>
                                    </b-btn>
                                </b-input-group-append>
                            </b-input-group>
                            <b-dropdown id="filterSystems" class="ml-2 flex-grow-0 flex-shrink-0 w-auto" right>
                                <template slot="button-content">
                                    <fa icon="cog"></fa>
                                </template>

                                <b-dropdown-item v-for="(system, index) in systems" :key="system.id">
                                    <b-form-checkbox
                                        :id="`checkbox-${ index }`"
                                        v-model="systemsFilter[index]"
                                        :value="system.id"
                                        @click.native.stop
                                    >
                                        {{ system.name }}
                                        <b-badge
                                            v-if="system.status"
                                            :variant="getStatusVariant(system.status)"
                                            class="ml-2"
                                            :title="getStatusDescription(system.status)"
                                        >
                                            <fa :icon="getStatusIcon(system.status)"></fa>
                                            {{ getStatusDisplay(system.status) }}
                                        </b-badge>
                                    </b-form-checkbox>
                                </b-dropdown-item>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item style="pointer-events: none">
                                    <div style="pointer-events: all" @click.stop="selectAllSystems()">
                                        <fa icon="check-square"></fa>
                                        Select All
                                    </div>
                                </b-dropdown-item>
                                <b-dropdown-item style="pointer-events: none">
                                    <div style="pointer-events: all" @click.stop="selectNoneSystems()">
                                        <fa :icon="['far', 'square']"></fa>
                                        Select None
                                    </div>
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </template>

                    <!-- List of Characters -->
                    <div v-if="charsLoading" class="card-body">
                        <loading></loading>
                    </div>

                    <b-list-group v-else-if="characters.length > 0" flush>
                        <b-list-group-item v-for="char in characters" :key="char.id" :to="`/characters/${ char.id }`">
                            <div class="d-flex">
                                <thumbnail :src="char.thumbnail" :color="char.color" :text="char.initial"></thumbnail>
                                <div class="ml-2 flex-column d-flex justify-content-center flex-fill">
                                    <h5 class="mb-1">
                                        {{ char.name }}
                                    </h5>
                                    <p class="text-muted m-0">
                                        <b-badge>{{ getSystem(char.system).name }}</b-badge>
                                        <small>{{ char.campaign }}</small>
                                    </p>
                                </div>
                                <div class="mr-2 flex-column d-flex justify-content-center flex-nowrap" style="flex: 0 0 auto">
                                    <b-button-close title="Edit User" @click.prevent.stop="openAddEditModal(char)">
                                        <fa icon="user-edit"></fa>
                                    </b-button-close>
                                </div>
                                <div class="ml-2 flex-column d-flex justify-content-center flex-nowrap" style="flex: 0 0 auto">
                                    <b-button-close title="Delete Character" @click.prevent.stop="openDelCharacter(char)">
                                        <fa icon="trash-alt"></fa>
                                    </b-button-close>
                                </div>
                            </div>
                        </b-list-group-item>
                    </b-list-group>

                    <div v-else class="card-body">
                        <h6 class="text-center text-muted">
                            No Characters found.
                        </h6>
                    </div>

                    <div class="card-body text-right">
                        <b-btn variant="primary" @click="openAddEditModal()">
                            <fa icon="user-plus"></fa>
                            New Character
                        </b-btn>
                    </div>
                </b-card>
            </b-col>
        </b-form-row>

        <!-- Modals -->
        <add-edit-modal v-model="addEditChar" @hidden="onAddEditHidden"></add-edit-modal>
        <delete-modal v-model="delChar" @hidden="onDeleteHidden"></delete-modal>
    </b-container>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #dashboard {
        padding: 16px;
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import authMan from '../api/managers/auth';
    import systemsMan from '../api/managers/systems';
    import characterMan from '../api/managers/character';

    // Components
    import Loading from '../components/ui/loading.vue';
    import AddEditModal from '../components/character/addEditModal.vue';
    import DeleteModal from '../components/character/deleteModal.vue';
    import Thumbnail from '../components/character/thumbnail.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'DashboardPage',
        components: {
            AddEditModal,
            DeleteModal,
            Loading,
            Thumbnail
        },
        subscriptions: {
            account: authMan.account$,
            allSystems: systemsMan.systems$,
            characterList: characterMan.characters$,
            accountStatus: authMan.status$,
            charsStatus: characterMan.status$,
            systemsStatus: systemsMan.status$
        },
        data()
        {
            return {
                charFilter: '',
                systemsFilter: [],
                addEditChar: undefined,
                delChar: undefined
            };
        },
        computed: {
            charsLoading()
            {
                return ![ 'signed in', 'signed out' ].includes(this.accountStatus)
                    || this.systemsStatus !== 'loaded'
                    || this.charsStatus !== 'loaded';
            },
            systems() { return this.allSystems; },
            characters()
            {
                return _(this.characterList)
                    // eslint-disable-next-line camelcase
                    .filter({ accountID: (this.account || {}).id })
                    .filter((char) =>
                    {
                        return _.includes(this.systemsFilter, char.system);
                    })
                    .filter((char) =>
                    {
                        return !this.charFilter || char.name.toLowerCase().includes(this.charFilter.toLocaleLowerCase());
                    })
                    .value();
            }
        },
        mounted()
        {
            this.$subscribeTo(authMan.status$, (status) =>
            {
                if(status === 'signed out')
                {
                    // We've finished loading, and we're not signed in
                    this.$router.push('/');
                } // end if

                this.selectAllSystems();
            });
        },
        methods: {
            getSystem(systemID)
            {
                return _.find(this.systems, { id: systemID });
            },
            getStatusDisplay(desc)
            {
                return systemsMan.getStatusDisplay(desc);
            },
            getStatusDescription(desc)
            {
                return systemsMan.getStatusDescription(desc);
            },
            getStatusIcon(desc)
            {
                switch (desc)
                {
                    case 'dev':
                        return 'exclamation-triangle';

                    case 'beta':
                        return 'info-circle';

                    case 'disabled':
                        return 'exclamation-triangle';

                    default:
                        return undefined;
                } // end switch
            },
            getStatusVariant(desc)
            {
                switch (desc)
                {
                    case 'dev':
                        return 'warning';

                    case 'beta':
                        return 'info';

                    case 'disabled':
                        return 'danger';

                    default:
                        return undefined;
                } // end switch
            },

            selectAllSystems()
            {
                this.systemsFilter = [].concat(this.systems.map((sys) => sys.id));
            },
            selectNoneSystems()
            {
                this.systemsFilter = [];
            },

            // Add/Edit Modal
            async openAddEditModal(char)
            {
                // If we don't have a character, we build once from scratch.
                if(!char)
                {
                    char = await characterMan.create({});
                } // end if

                this.addEditChar = char;
            },
            onAddEditHidden()
            {
                // We just need to clear this when the modal is hidden.
                this.addEditChar = undefined;
            },

            // Delete Modal
            openDelCharacter(char)
            {
                this.delChar = char;
            },
            onDeleteHidden()
            {
                // We just need to clear this when the modal is hidden.
                this.delChar = undefined;
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
