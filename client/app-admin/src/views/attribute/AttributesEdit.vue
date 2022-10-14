<template>
    <div>
        <PageTitle>
            Edit Attribute: <code>{{ $route.params.name }}</code>
        </PageTitle>
        <ToolbarSticky>
            <ToolbarFormUtility
                action="update"
                category="attribute"
                :item="item"
                :v="$v"
                @updateAttribute="updateAttribute(true)"
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
                    :v="$v.item.type"
                    category="attribute"
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
                    action="update"
                    category="attribute"
                    :item="item"
                    :v="$v"
                    @updateAttribute="updateAttribute(true)"
                />
            </form>
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import router from '@/router';

import eventBus from '@shared/eventBus';

import AttributeService from '@shared/services/attributeService';

import itemPropsAttribute from '@/mixins/itemPropsAttribute';
import keyboardSave from '@shared/mixins/keyboardSave';
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
    name: 'AttributesEdit',
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
        keyboardSave,
        itemPropsBoth,
    ],
    data () {
        return {
            item: {},
        };
    },
    computed: {
        ...mapGetters({
            getAttributeByName: 'attribute/getAttributeByName',
        }),
    },
    async created () {
        this.setLoading(true);
        this.item = this.getAttributeByName(this.$route.params.name);
        this.$set(this.item, 'subtypesInflated', this.subtypesInflate());
        this.$set(this.item, 'valueTypesInflated', this.valueTypesInflate());
        this.setLoading(false);
        this.focusItemName = true;
    },
    mounted () {
        eventBus.$on('ToolbarFormUtilityConfirmRemoveItem', this.removeAttribute);
    },
    beforeDestroy () {
        eventBus.$off('ToolbarFormUtilityConfirmRemoveItem');
        this.item = {};
    },
    methods: {
        ...mapActions({
            createToast: 'toast/createToast',
            getAllAttributes: 'attribute/getAllAttributes',
        }),
        keyboardSave () {
            return this.updateAttribute();
        },
        async removeAttribute () {
            try {
                await AttributeService.removeAttribute(this.item._id);
                await this.getAllAttributes();
                this.createToast({ text: `Attribute removed: '${this.item.name}'` });
                router.push('/attributes/');
            } catch (error) {
                this.setError(error);
                this.createToast({
                    text: `Attribute remove error: Could not remove '${this.item.name}'`,
                    theme: 'danger',
                });
            }
        },
        async updateAttribute (redirectOnSuccess = false) {
            // Validate
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            // Submit
            this.setLoading(true);
            this.focusItemName = false;

            try {
                await AttributeService.updateAttribute({
                    _id: this.item._id,
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
                this.createToast({ text: `Attribute saved: '${this.item.name}'` });

                if (redirectOnSuccess) router.push(`/attributes/${this.item.name}`);
            } catch (error) {
                this.setError(error);
                this.createToast({
                    text: `Attribute save error: Could not save '${this.item.name}'`,
                    theme: 'danger',
                });
                this.focusItemName = true;
            } finally {
                this.setLoading(false);
            }
        },
    },
};
</script>
