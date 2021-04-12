<!----------------------------------------------------------------------------------------------------------------------
  -- qualityEdit.vue
  --------------------------------------------------------------------------------------------------------------------->

<template>
    <div id="quality-edit">
        <supplement-select
            ref="suppSelect"
            label="Qualities"
            label-class="font-weight-bold"
            :available="qualities"
            :selected="selectedQualities"
            @add="onQualityAdd"
            @remove="onQualityRemove"
            @new="onQualityNew"
            @edit="onQualityEdit"
            @delete="onQualityDelete"
        >
            <template #preview="{ instance, supplement }">
                <div v-if="supplement.ranked" class="mb-2 float-right">
                    <label for="sb-inline">Ranks</label>
                    <b-form-spinbutton id="sb-inline" v-model="instance.ranks" inline></b-form-spinbutton>
                </div>
                <div class="mb-2">
                    <i v-if="supplement.passive">Passive</i>
                    <i v-else>Active</i>
                </div>
                <markdown-block :text="supplement.description" inline></markdown-block>
                <reference
                    class="float-right mt-2"
                    :reference="supplement.reference"
                ></reference>
            </template>
        </supplement-select>

        <!-- Modals -->
        <add-edit-quality-modal ref="addEditQualityModal" @add="onQualityAdd"></add-edit-quality-modal>
        <delete-modal
            ref="delQualityModal"
            :name="delQuality.name"
            type="quality"
            @hidden="onDelQualityHidden"
            @delete="onDelQualityDelete"
        ></delete-modal>
    </div>
</template>

<!--------------------------------------------------------------------------------------------------------------------->

<style lang="scss" scoped>
    #quality-edit {
    }
</style>

<!--------------------------------------------------------------------------------------------------------------------->

<script>
    //------------------------------------------------------------------------------------------------------------------

    import _ from 'lodash';

    // Managers
    import charMan from '../../../../api/managers/character';
    import eoteMan from '../../../../api/managers/eote';

    // Components
    import SupplementSelect from '../../../character/supplementSelect.vue';
    import DeleteModal from '../../../ui/deleteModal';
    import AddEditQualityModal from '../modals/addEditQualityModal.vue';
    import MarkdownBlock from '../../../ui/markdown.vue';
    import Reference from '../../../character/reference.vue';

    //------------------------------------------------------------------------------------------------------------------

    export default {
        name: 'EoteQualityEdit',
        components: {
            DeleteModal,
            SupplementSelect,
            AddEditQualityModal,
            MarkdownBlock,
            Reference
        },
        props: {
            value: {
                type: Array,
                required: true
            }
        },
        subscriptions: {
            character: charMan.selected$,
            mode: eoteMan.mode$,
            qualities: eoteMan.qualities$
        },
        data()
        {
            return {
                delQuality: {
                    id: undefined,
                    name: undefined
                }
            };
        },
        computed: {
            selectedQualities: {
                get()
                {
                    return this.value.concat();
                },
                set(val)
                {
                    this.$emit('input', val);
                }
            }
        },
        methods: {
            getQual(qualityInstance)
            {
                return this.qualities.find((qual) => qual.id === qualityInstance.id);
            },
            onQualityAdd(quality)
            {
                const newQual = { id: quality.id };

                if(this.getQual(quality).ranked)
                {
                    newQual.ranks = 1;
                } // end if

                this.selectedQualities.push(newQual);
                this.selectedQualities = _.uniqBy(this.selectedQualities, 'id');

                this.$emit('input', this.selectedQualities);
            },
            onQualityRemove(quality)
            {
                this.selectedQualities = _.remove(this.selectedQualities, (qual) => qual.id !== quality.id);
            },
            onQualityNew()
            {
                this.$refs.addEditQualityModal.show();
            },
            onQualityEdit(quality)
            {
                this.$refs.addEditQualityModal.show(quality);
            },
            onQualityDelete(quality)
            {
                this.delQuality.id = quality.id;
                this.delQuality.name = quality.name;

                this.$refs.delQualityModal.show();
            },
            onDelQualityHidden()
            {
                this.delQuality.id = '';
                this.delQuality.name = '';
            },
            async onDelQualityDelete()
            {
                this.$refs.suppSelect.clearSelection();
                this.selectedQualities = this.selectedQualities.filter((item) => item.id !== this.delQuality.id);
                this.character.details.qualities = this.selectedQualities;

                return Promise.all([
                    await charMan.save(this.character),
                    await eoteMan.delSup('qualities', this.delQuality)
                ]);
            }
        }
    };
</script>

<!--------------------------------------------------------------------------------------------------------------------->
