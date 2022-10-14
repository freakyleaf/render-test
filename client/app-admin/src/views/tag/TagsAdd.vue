<template>
    <div>
        <PageTitle>
            Add Tag
        </PageTitle>
        <ToolbarSticky>
            <ToolbarFormUtility
                action="add"
                category="tag"
                :v="$v"
                @addTag="addTag"
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
                    category="tag"
                    :v="$v.item.type"
                />
                <label class="form-label">
                    Attributes
                </label>
                <InputFilterCategoryItems
                    category="attribute"
                    :value="filter"
                    @input="(value) => filterByName(value, attributes)"
                />
                <div class="mb-3">
                    <category-sort-x
                        category="attribute"
                        :items="itemsLocal"
                    >
                        <template #default="{ typesSorted }">
                            <ul class="list-unstyled">
                                <template v-for="type in typesSorted">
                                    <li
                                        v-if="type.items.length"
                                        :key="type.title.kebab"
                                        class="list-item"
                                    >
                                        <TagsAddAttributes
                                            :attributes="type.items"
                                            :tag="item"
                                            :title="type.title.pretty"
                                            @attributeIsActive="attributeIsActive"
                                            @attributeSubformInput="attributeSubformInput"
                                            @attributeIsVisible="attributeIsVisible"
                                        />
                                    </li>
                                </template>
                            </ul>
                        </template>
                    </category-sort-x>
                </div>
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
                <hr>
                <ToolbarFormUtility
                    action="add"
                    category="tag"
                    :v="$v"
                    @addTag="addTag"
                />
            </form>
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import router from '@/router';

import TagService from '@shared/services/tagService';

import filterByName from '@shared/mixins/filterByName';
import itemPropsBoth from '@/mixins/itemPropsBoth';
import itemPropsTag from '@/mixins/itemPropsTag';

import CategorySortX from '@shared/components/renderless/ShCategorySortX.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import ContentPatterns from '@/components/form/ContentPatterns.vue';
import InputFilterCategoryItems from '@shared/components/form/ShInputFilterCategoryItems.vue';
import InputName from '@/components/form/InputName.vue';
import InputOpinionated from '@/components/form/InputOpinionated.vue';
import InputReferences from '@/components/form/InputReferences.vue';
import InputType from '@/components/form/InputType.vue';
import MarkdownPreviewGeneric from '@shared/components/markdown/ShMarkdownPreviewGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';
import TagsAddAttributes from '@/components/tag/TagsAddAttributes.vue';
import ToolbarFormUtility from '@/components/toolbar/ToolbarFormUtility.vue';
import ToolbarSticky from '@/components/toolbar/ToolbarSticky.vue';

export default {
    name: 'TagsAdd',
    components: {
        CategorySortX,
        ContainerGeneric,
        ContentPatterns,
        InputFilterCategoryItems,
        InputName,
        InputOpinionated,
        InputReferences,
        InputType,
        MarkdownPreviewGeneric,
        PageTitle,
        TagsAddAttributes,
        ToolbarFormUtility,
        ToolbarSticky,
    },
    mixins: [
        filterByName,
        itemPropsBoth,
        itemPropsTag,
    ],
    data () {
        return {
            filter: '',
            item: {
                contentPatterns: [],
                description: 'From MDN:\n\n> ',
                name: '',
                notes: '',
                notesOpinionated: false,
                references: [],
                type: '',
            },
            itemsLocal: [],
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
        }),
    },
    created () {
        this.setLoading(true);
        this.tagAttributesSetup();
        this.itemsLocal = this.attributes;
        this.setLoading(false);
        this.focusItemName = true;
    },
    beforeDestroy () {
        this.item = {};
    },
    methods: {
        ...mapActions({
            getAllTags: 'tag/getAllTags',
        }),
        async addTag () {
            // Validate
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            // Submit
            this.setLoading(true);
            this.focusItemName = false;

            try {
                await TagService.addTag({
                    attributes: this.buildTagAttributes(),
                    contentPatterns: this.item.contentPatterns,
                    description: this.item.description,
                    name: this.item.name,
                    notes: this.item.notes,
                    notesOpinionated: this.item.notesOpinionated,
                    references: this.item.references,
                    type: this.item.type,
                });
                await this.getAllTags(); // Reload with latest data
                router.push(`/tags/${this.item.name}`);
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
