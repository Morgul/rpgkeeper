<template>
    <div id="generic-char" class="container">
        <div v-if="!char">
            <h4 class="text-center">Loading...</h4>
        </div>
        <div v-else>
            <header>
                <div class="pull-right">
                    <div class="btn-toolbar">
                        <button class="btn btn-primary" @click="open('addCounter')">
                            <i class="fa fa-plus"></i>
                            Counter
                        </button>
                        <button class="btn btn-primary" @click="open('addRoll')">
                            <i class="fa fa-plus"></i>
                            Roll
                        </button>
                        <button class="btn btn-primary" @click="open('addStatblock')">
                            <i class="fa fa-plus"></i>
                            Statblock
                        </button>
                    </div>
                </div>
                <h1>{{ char.name }} <small class="text-muted">{{ char.description }}</small></h1>
            </header>
            <div class="upper-sheet">
                <div class="main">
                    <div class="portrait">
                        <img class="img-thumbnail" :src="char.portrait || 'http://placehold.it/800x1200'" height="445px" width="300px" style="max-width: inherit">
                    </div>
                    <div class="counters">
                        <div v-if="!char.counters || char.counters.length == 0" class="text-center card-block">
                            <h6>No counters, yet.</h6>
                        </div>
                        <div v-else>
                            <counter v-for="counter in char.counters" :counter="counter" :save="save" :on-delete="deleteCounter" :move-up="moveUp" :move-down="moveDown"></counter>
                        </div>
                    </div>
                </div>
                <!--div class="sidebar"-->
                    <div id="rolls" class="sidebar card">
                        <div class="card-header">
                            <i class="fa fa-random"></i>
                            Rolls
                        </div>
                        <div class="card-block">
                            <div class="input-group">
                                <span class="input-group-addon roll-display" data-trigger="hover" data-container="body" data-toggle="popover" data-placement="top" data-content="{{ rollRendered }}">
                                    <button v-if="rollValue || rollValue === 0" type="button" class="close" @click.prevent.stop="clearRoll()">
                                        <span aria-hidden="true">
                                            &times;
                                        </span>
                                        <span class="sr-only">Clear</span>
                                    </button>
                                    {{ rollValue }}
                                </span>
                                <input type="text" class="form-control" placeholder="ex: 1d20 +1" v-model="rollExpression">
                                <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="button" title="Click to roll" @click="executeRoll()">
                                        <i class="fa fa-random"></i>
                                        Roll
                                    </button>
                                </span>
                            </div>
                            <hr>
                            <div v-if="!char.rolls || char.rolls.length == 0" class="text-center">
                                <h6>No rolls, yet.</h6>
                            </div>
                            <div v-else>
                                <roll v-for="roll in char.rolls" :roll="roll" :rolls="char.rolls" :context="char.rollContext" :save="save"></roll>
                            </div>
                        </div>
                    </div>
                <!--/div-->
            </div>

            <!-- Stats -->
            <div id="stats" class="card">
                <div v-if="!char.stats || char.stats.length === 0"  class="card-block">
                    <h6 class="text-center" style="margin: 0">No Stats, yet.</h6>
                </div>
                <div class="stats-list"  v-else>
                    <statblock v-for="statblock in char.stats" :statblock.sync="statblock" :context="char.rollContext" :move-up="moveUp" :move-down="moveDown" :save="save" :on-delete="deleteStatblock"></statblock>
                </div>
            </div>

            <!-- Notes -->
            <notes :notes="char.notes" :save="save"></notes>
        </div>

        <!-- Add Roll Modal -->
        <modal v-ref:add-roll :backdrop="'static'" :keyboard="false">
            <div class="modal-header" slot="header">
                <h4 class="modal-title">
                    <i class="fa fa-plus"></i>
                    New Roll
                </h4>
            </div>
            <div class="modal-body" slot="body">
                <form>
                    <fieldset class="form-group">
                        <label for="name">Name</label>
                        <input id="name" type="text" class="form-control" v-model="newRoll.name">
                    </fieldset>
                    <fieldset class="form-group">
                        <label for="expr">Expression</label>
                        <textarea id="expr" rows="5" class="form-control monospace" v-model="newRoll.expression"></textarea>
                    </fieldset>
                </form>
            </div>
            <div class="modal-footer" slot="footer">
                <button type="button"
                        class="btn btn-success"
                        @click="addRoll()">
                    <i class="fa fa-save"></i>
                    Add Roll
                </button>
                <button type="button"
                        class="btn btn-secondary"
                        @click="$refs.addRoll.hideModal()">
                    <i class="fa fa-times"></i>
                    Cancel
                </button>
            </div>
        </modal>

        <!-- Add Counter Modal -->
        <modal v-ref:add-counter :backdrop="'static'" :keyboard="false">
            <div class="modal-header" slot="header">
                <h4 class="modal-title">
                    <i class="fa fa-plus"></i>
                    Add Counter
                </h4>
            </div>
            <div class="modal-body" slot="body">
                <form>
                    <fieldset class="form-group">
                        <label for="name">Name</label>
                        <input id="name" type="text" class="form-control" v-model="newCounter.name">
                    </fieldset>
                    <fieldset class="form-group">
                        <label for="value">Value</label>
                        <input id="value" type="number" class="form-control" v-model="newCounter.value" number>
                    </fieldset>
                    <fieldset class="form-group">
                        <label for="step">Step</label>
                        <input id="step" type="number" class="form-control" step=".01" v-model="newCounter.step" number>
                    </fieldset>
                    <fieldset class="form-group">
                        <label for="min">Min</label>
                        <input id="min" type="number" class="form-control" v-model="newCounter.min" number>
                    </fieldset>
                    <fieldset class="form-group">
                        <label for="max">Max</label>
                        <input id="max" type="number" class="form-control" v-model="newCounter.max" number>
                    </fieldset>
                </form>
            </div>
            <div class="modal-footer" slot="footer">
                <button type="button"
                        class="btn btn-success"
                        @click="addCounter()">
                    <i class="fa fa-save"></i>
                    Save Counter
                </button>
                <button type="button"
                        class="btn btn-secondary"
                        @click="$refs.addCounter.hideModal()">
                    <i class="fa fa-times"></i>
                    Cancel
                </button>
            </div>
        </modal>

        <!-- Add Statblock Modal -->
        <add-edit-stat-modal v-ref:add-statblock :stats.sync="newStatblock" :mode="'add'" :save="addStatblock"></add-edit-stat-modal>
    </div>
</template>

<style lang="sass" src="character.scss"></style>

<script type="text/babel">
    import { modal } from 'vueboot';

    import GenericCharacter from './components/model';
    import systemsSvc from '../../../client/components/systems/systemsService';
    import diceUtil from '../../../client/components/dice/diceService';

    import counter from './components/counter.vue';
    import roll from './components/roll.vue';
    import statblock from './components/statblock.vue';
    import notes from '../../../../../client/components/notes/notes.vue';
    import AddEditStatModal from './modals/statAddEdit.vue';

    export default {
        components: {
            counter,
            roll,
            statblock,
            notes,
            modal,
            addEditStatModal: AddEditStatModal
        },
        props: {
            base: {
                required: true
            }
        },
        data: function()
        {
            return {
                char: null,
                newRoll: {},
                newCounter: {},
                newStatblock: {},
                rollResults: null,
                rollExpression: ""
            };
        },
        computed: {
            rollRendered: function()
            {
                if(this.rollResults)
                {
                    return this.rollResults.render();
                } // end if

                return "";
            },
            rollValue: function()
            {
                return (this.rollResults || {}).value;
            }
        },
        methods: {
            moveUp: function(listName, item)
            {
                this.char.moveUp(listName, item);
            },
            moveDown: function(listName, item)
            {
                this.char.moveDown(listName, item);
            },
            save: function()
            {
                this.char.save();
            },
            deleteCounter: function(counter)
            {
                this.char.counters.$remove(counter);
                this.char.save();
            },
            executeRoll: function()
            {
                this.rollResults = diceSvc.roll(this.rollExpression, {});
            },
            clearRoll: function()
            {
                this.rollResults = null;
                this.rollExpression = "";
            },
            open: function(modal)
            {
                this.$refs[modal].showModal();
            },
            addRoll: function()
            {
                this.char.rolls.push(this.newRoll);
                this.newRoll = {};
                this.$refs.addRoll.hideModal();

                this.char.save();
            },
            addCounter: function()
            {
                this.char.counters.push(this.newCounter);
                this.newCounter = {};
                this.$refs.addCounter.hideModal();

                this.char.save();
            },
            addStatblock: function()
            {
                this.char.stats.push(this.newStatblock);
                this.newStatblock = {};
                this.char.save();
            },
            deleteStatblock: function(statblock)
            {
                this.char.stats.$remove(statblock);
                this.char.save();
            }
        },
        activate: function(done)
        {
            systemsSvc.getChar(this.base.system, this.base.id)
                .then((char) =>
                {
                    // Wrap this in a model!
                    this.char = new GenericCharacter(this.base, char);
                    done();
                });
        }
    }
</script>
