<template>
    <div id="rolls" class="card">
        <div class="card-header">
            <button class="btn btn-secondary pull-right" title="Clear Roll History" @click="clearResults()">
                <i class="fa fa-undo"></i>
            </button>
            <i class="fa fa-random"></i>
            Rolls
        </div>
        <div class="card-block">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="1d20 + ..." v-model="rollInput" @keypress.enter="roll()">
                <span class="input-group-btn">
                    <button class="btn btn-secondary" type="button" @click="roll()" :disabled="!rollInput">Roll</button>
                </span>
            </div>
            <hr>
            <div class="results-list">
                <div class="roll-result" v-for="result in state.results">
                    <div class="title">
                        <span v-if="result.title">{{ result.title }}: </span><b>{{ result.roll.value }}</b>
                    </div>
                    <div class="result" :title="result.roll.text">
                        {{ result.roll.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    #rolls {
        flex: 0 0 350px;
        min-height: 350px;

        .results-list {
            height: 210px;
            overflow-y: auto;
            margin-top: -2px;

            .roll-result {
                font-size: 14px;
                padding: 5px 7px;

                &:nth-child(1) {
                    padding-top: 0;
                }

                &:nth-child(even) {
                    background-color: #eee;
                }

                .result {
                    font-size: 10px;
                    font-family: "Hack", "Monaco", monospace;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>

<script type="text/babel">
    import rollsSvc from '../services/rolls';

    export default {
        props: {
            char: {
                required: true
            }
        },
        data()
        {
            return {
                rollInput: "",
                state: rollsSvc.state
            };
        },
        methods: {
            clearResults()
            {
                rollsSvc.clearResults();
            },
            roll()
            {
                if(this.rollInput)
                {
                    rollsSvc.roll(this.rollInput, this.char.toJSON());
                    this.rollInput = "";
                } // end if
            }
        }
    }
</script>