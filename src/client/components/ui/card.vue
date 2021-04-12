<!----------------------------------------------------------------------------------------------------------------------
  -- RPGKeeper Card
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <b-card
        class="rpgkeeper-card shadow-sm"
        :align="align"
        header-bg-variant="dark"
        header-text-variant="white"
        :class="classes"
        :no-body="noBody"
    >
        <template slot="header">
            <slot name="header">
                <h5 class="align-items-center d-flex text-nowrap m-0 mt-1 mr-2 flex-grow-0 flex-shrink-0 w-auto">
                    <fa v-if="icon" class="mr-1" :icon="icon"></fa>
                    <span class="d-none d-md-inline">
                        {{ title }}
                    </span>
                </h5>
            </slot>
        </template>

        <slot></slot>

        <template slot="footer">
            <slot name="footer"></slot>
        </template>
    </b-card>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .rpgkeeper-card {
        overflow: hidden;

        .card-header {
            min-height: 57px;
        }

        &.fill {
            flex: 1 1 auto;
        }

        &.fixed {
            flex: 0 0 auto;
        }

        &.grow {
            flex: 1 0 auto;
        }

        &.shrink {
            flex: 0 1 auto;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'RPGKCard',
        props: {
            icon: {
                type: String,
                default: undefined
            },
            title: {
                type: String,
                default: undefined
            },
            noBody: {
                type: Boolean,
                default: false
            },
            align: {
                type: String,
                default: undefined
            },
            fill: {
                type: Boolean,
                default: false
            },
            fixed: {
                type: Boolean,
                default: false
            },
            grow: {
                type: Boolean,
                default: false
            },
            shrink: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            classes()
            {
                // We default these to false so that we can test against it, instead of testing truthiness, because the
                // short cut `<card fill>` makes the property into an empty string. This just means we only have to
                // test against false.
                if(this.fill !== false)
                {
                    return 'fill';
                }
                else if(this.fixed !== false)
                {
                    return 'fixed';
                }
                else if(this.grow !== false)
                {
                    return 'grow';
                }
                else if(this.shrink !== false)
                {
                    return 'shrink';
                } // end if

                return 'nothing';
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
