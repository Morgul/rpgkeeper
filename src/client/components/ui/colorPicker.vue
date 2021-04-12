<!----------------------------------------------------------------------------------------------------------------------
  -- colorPicker.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="color-picker">
        <b-button :id="btnID" variant="light" type="button" class="pl-2 pr-2 w-100">
            <span class="color-block" :style="{ 'background-color': color }">&nbsp;</span>
        </b-button>

        <b-popover
            v-if="color"
            :target="btnID"
            triggers="click blur"
            placement="auto"
            class="cp-popover"
        >
            <div class="cp-popover-body">
                <vue-color v-model="color" :disable-alpha="true"></vue-color>
            </div>
        </b-popover>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .color-picker {
        .color-block {
            display: inline-block;
            min-width: 1.5rem;
            height: 100%;
            width: 100%;
        }
    }
    .cp-popover-body {
        margin: -0.5rem -0.75rem;

        .vc-sketch {
            box-shadow: none;
        }
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Components
    import { Sketch } from 'vue-color';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'ColorPicker',
        components: {
            vueColor: Sketch
        },
        props: {
            value: {
                type: String,
                default: '#ffffff'
            }
        },
        data()
        {
            return {
                color: undefined
            };
        },
        computed: {
            btnID() { return `color-picker-${ this._uid }`; }
        },
        watch: {
            value()
            {
                this.color = this.value;
            },
            color()
            {
                if(this.value && this.color.hex && this.color.hex !== this.value)
                {
                    this.$emit('input', this.color.hex);
                } // end if
            }
        },
        mounted()
        {
            this.color = this.value;
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
