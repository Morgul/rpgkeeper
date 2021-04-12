<!----------------------------------------------------------------------------------------------------------------------
  -- Footer
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <footer id="site-footer" class="container text-center">
        <hr class="mt-0 fancy" />
        <ul>
            <li>
                <router-link to="/about">
                    <fa icon="question"></fa>
                    About
                </router-link>
            </li>
            <li>|</li>
            <li>
                <a href="https://github.com/Morgul/rpgkeeper" target="_blank">
                    <fa :icon="['fab', 'github']"></fa>
                    Github Project
                </a>
            </li>
            <li>|</li>
            <li>
                <a href="https://github.com/Morgul/rpgkeeper/issues/new?labels=bug,needs%20review&title=[Bug Report]%20" target="_blank">
                    <fa icon="bug"></fa>
                    Report a Bug
                </a>
            </li>
            <li>|</li>
            <li>
                <a href="https://github.com/Morgul/rpgkeeper/issues/new?labels=feedback&title=[Feedback]%20" target="_blank">
                    <fa icon="comment-alt-lines"></fa>
                    Leave Feedback
                </a>
            </li>
        </ul>
        <p class="mt-2 mb-0">
            &copy; 2015 - {{ currentYear }} Skewed Aspect Studios. All rights reserved.
        </p>
        <div class="mb-2">
            v{{ version }}
        </div>
    </footer>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss">
    #site-footer {
        color: #aaa;
        font-size: 12px;

        ul {
            padding-left: 0;
            margin-bottom: 0;
            list-style-type: none;

            li {
                display: inline-block;
                margin-right: 20px;

                &:last-child {
                    margin-right: 0;
                }
            }

            & + p {
                margin-top: 0;
            }
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import { version } from '../../../../package.json';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'SiteFooter',
        data()
        {
            return {
                version
            };
        },
        computed: {
            currentYear()
            {
                return (new Date()).getFullYear();
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
