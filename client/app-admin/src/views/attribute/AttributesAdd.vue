<template>
    <div>
        <PageTitle>
            Add Attribute
        </PageTitle>
        <ToolbarSticky>
            <ToolbarFormUtility
                action="add"
                category="attribute"
                :v="$v"
                @addAttribute="addAttribute"
            />
        </ToolbarSticky>
        <ContainerGeneric :top-spacing="true">
            <form>
                <InputName
                    ref="InputName"
                    v-model="item.name"
                    :v="$v.item.name"
                />
                <InputType
                    v-model="item.type"
                    category="attribute"
                    :v="$v.item.type"
                />
                <InputTypeAlsoGlobal
                    v-if="typeIsAriaRegular"
                    :checked="item.typeAlsoGlobal"
                    @input="(value) => {
                        item.typeAlsoGlobal = value;
                    }"
                />
                <InputSubtypes
                    v-if="subtypesActive"
                    :subtypes="subtypesFilteredByType"
                    @input="(value) => {
                        subtypesUpdateSelected(value);
                    }"
                />
                <InputSince
                    v-model="item.since"
                    :v="$v.item.since"
                />
                <InputValueTypes
                    :v="$v.item.valueTypesInflated"
                    @input="(value) => {
                        valueTypesUpdateSelected(value);
                    }"
                />
                <InputValueValues
                    v-if="valueValuesActive"
                    v-model="item.valueValues"
                    :v="$v.item.valueValues"
                    @valueValueAdd="valueValueAdd"
                    @valueValueRemove="valueValueRemove"
                />
                <ContentPatterns
                    v-model="item.contentPatterns"
                    :v="$v.item.contentPatterns"
                    @contentPatternAdd="contentPatternAdd"
                    @contentPatternRemove="contentPatternRemove"
                />
                <MarkdownPreviewGeneric
                    id="itemDescription"
                    label="Description"
                    :value="item.description"
                    @markdownPreviewInput="(value) => {
                        item.description = value;
                    }"
                />
                <MarkdownPreviewGeneric
                    id="itemNotes"
                    label="Notes"
                    :value="item.notes"
                    @markdownPreviewInput="(value) => {
                        item.notes = value;
                    }"
                />
                <InputOpinionated
                    :checked="item.notesOpinionated"
                    @input="(value) => {
                        item.notesOpinionated = value;
                    }"
                />
                <InputReferences
                    v-model="item.references"
                    :v="$v.item.references"
                    @referenceAdd="referenceAdd"
                    @referenceRemove="referenceRemove"
                />
                <InputCodePen
                    :id="`${item.name}-codepen`"
                    v-model="item.codepen"
                />
                <hr>
                <ToolbarFormUtility
                    action="add"
                    category="attribute"
                    :v="$v"
                    @addAttribute="addAttribute"
                />
            </form>
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

import router from '@/router';

import AttributeService from '@shared/services/attributeService';

import itemPropsAttribute from '@/mixins/itemPropsAttribute';
import itemPropsBoth from '@/mixins/itemPropsBoth';

import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import ContentPatterns from '@/components/form/ContentPatterns.vue';
import ToolbarFormUtility from '@/components/toolbar/ToolbarFormUtility.vue';
import InputCodePen from '@/components/form/InputCodePen.vue';
import InputName from '@/components/form/InputName.vue';
import InputOpinionated from '@/components/form/InputOpinionated.vue';
import InputReferences from '@/components/form/InputReferences.vue';
import InputSince from '@/components/form/InputSince.vue';
import InputSubtypes from '@/components/form/InputSubtypes.vue';
import InputType from '@/components/form/InputType.vue';
import InputTypeAlsoGlobal from '@/components/form/InputTypeAlsoGlobal.vue';
import InputValueTypes from '@/components/form/InputValueTypes.vue';
import InputValueValues from '@/components/form/InputValueValues.vue';
import MarkdownPreviewGeneric from '@shared/components/markdown/ShMarkdownPreviewGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';
import ToolbarSticky from '@/components/toolbar/ToolbarSticky.vue';

export default {
    name: 'AttributesAdd',
    components: {
        ContainerGeneric,
        ContentPatterns,
        ToolbarFormUtility,
        InputCodePen,
        InputName,
        InputOpinionated,
        InputReferences,
        InputSince,
        InputSubtypes,
        InputType,
        InputTypeAlsoGlobal,
        InputValueTypes,
        InputValueValues,
        MarkdownPreviewGeneric,
        PageTitle,
        ToolbarSticky,
    },
    mixins: [
        itemPropsAttribute,
        itemPropsBoth,
    ],
    data () {
        return {
            item: {
                codepen: '',
                contentPatterns: [],
                description: 'From MDN:\n\n> ',
                name: '',
                notes: '',
                notesOpinionated: false,
                references: [],
                since: '',
                subtypesInflated: [],
                type: '',
                typeAlsoGlobal: false,
                valueTypesInflated: [],
                valueValues: [],
            },
        };
    },
    created () {
        this.setLoading(true);
        this.$set(this.item, 'subtypesInflated', this.subtypesInflate());
        this.$set(this.item, 'valueTypesInflated', this.valueTypesInflate());
        this.setLoading(false);
        this.focusItemName = true;
    },
    beforeDestroy () {
        this.item = {};
    },
    methods: {
        ...mapActions({
            getAllAttributes: 'attribute/getAllAttributes',
        }),
        async addAttribute () {
            // Validate
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            // Submit
            this.setLoading(true);
            this.focusItemName = false;

            try {
                await AttributeService.addAttribute({
                    codepen: this.item.codepen,
                    contentPatterns: this.item.contentPatterns,
                    description: this.item.description,
                    name: this.item.name,
                    notes: this.item.notes,
                    notesOpinionated: this.item.notesOpinionated,
                    references: this.item.references,
                    since: this.item.since,
                    subtypes: this.subtypesDeflate(),
                    type: this.item.type,
                    typeAlsoGlobal: this.typeIsAriaRegular ? this.item.typeAlsoGlobal : false,
                    valueTypes: this.valueTypesDeflate(),
                    valueValues: this.item.valueValues,
                });
                await this.getAllAttributes(); // Reload with latest data
                router.push(`/attributes/${this.item.name}`);
            } catch (error) {
                this.setError(error);
                this.focusItemName = true;
            } finally {
                this.setLoading(false);
            }
        },
    },
};
</script>
