<!----------------------------------------------------------------------------------------------------------------------
  -- About Page
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="about-page">
        <h1 class="text-center mt-4 mb-4">
            <img class="rpgk-logo" src="/static/images/logo.png" alt="RPGKeeper Logo" width="40px" height="40px" />
            About RPGKeeper
        </h1>
        <div class="container">
            <p>
                I am an avid table-top RPG player. I have been playing various forms of RPGs for years. Frequently, I
                felt limited or frustrated by the paper character sheets I had. And sometimes I'd lose them, or
                something would get spilled, or I'd want to look up something about my character, but didn't have it on
                me. Any of you who've played table-top RPGs know what I'm talking about.
            </p>

            <p>
                That's why I've decided to make a website for storing your characters. It's a daunting task, and I've
                been working on various versions of it for years; this is only the latest iteration. And yes, it does
                keep getting better.
            </p>

            <p>
                My vision for RPGKeeper is that it become a site useful for groups of players as well as individuals. I
                want GMs and Players to love it, using it for big campaigns, and as a central clearinghouse for campaign
                related things. At the moment, most of these features are missing, but I will be working on adding them
                just as soon as I get my core target systems built and working.
            </p>

            <hr />

            <p>
                If you want to help out (or have a suggestion) please checkout the
                <a href="https://github.com/Morgul/rpgkeeper">GitHub Project</a>. If you'd like to just help support the
                project, I do take donations.
            </p>

            <div class="text-center mb-3">
                <b-btn variant="primary" href="https://www.paypal.me/morgul/10" target="_blank" class="m-auto">
                    <fa icon="donate"></fa>
                    Buy me a Pizza
                </b-btn>
            </div>
        </div>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .about-page {
        .rpgk-logo {
            margin-top: -10px;
            margin-right: -5px;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'AboutPage'
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
