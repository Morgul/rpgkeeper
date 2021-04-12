<!----------------------------------------------------------------------------------------------------------------------
  -- editReference
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div class="edit-reference d-flex">
        <b-form-group
            class="flex-fill"
            label="Source"
            label-class="font-weight-bold"
            label-for="source-input"
        >
            <b-form-select
                id="source-input"
                v-model="source"
                :options="references"
                text-field="name"
                value-field="abbr"
            ></b-form-select>
        </b-form-group>
        <b-form-group
            class="flex-fill ml-2"
            label="Page"
            label-class="font-weight-bold"
            label-for="page-input"
        >
            <b-form-input
                id="page-input"
                v-model.number="page"
                type="number"
                step="1"
                min="1"
                :disabled="source === 'HB'"
            ></b-form-input>
        </b-form-group>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    .edit-reference {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    // Managers
    import eoteManager from '../../api/managers/eote';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EditReference',
        props: {
            value: {
                type: String,
                required: true
            }
        },
        subscriptions: {
            references: eoteManager.references$
        },
        data()
        {
            return {
                source: '',
                page: undefined
            };
        },
        computed: {
            valParts()
            {
                return this.value.split(':');
            },
            refString()
            {
                if(this.page)
                {
                    return `${ this.source }:${ this.page }`;
                }
                else
                {
                    return `${ this.source }`;
                } // end if
            }
        },
        watch: {
            value()
            {
                this.source = this.valParts[0];
                this.page = this.valParts[1];
            },
            source()
            {
                if(this.source === 'HB')
                {
                    this.page = undefined;
                } // end if

                this.$emit('input', this.refString);
            },
            page()
            {
                this.$emit('input', this.refString);
            }
        },
        mounted()
        {
            this.source = this.valParts[0];
            this.page = this.valParts[1];
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
