<template>
    <div>
        <PageTitle>
            Edit Tag: <code>{{ $route.params.name }}</code>
        </PageTitle>
        <ToolbarSticky>
            <ToolbarFormUtility
                action="update"
                category="tag"
                :item="item"
                :v="$v"
                @globalVisibility="(value) => toggleGlobalVisibility(value)"
                @updateTag="updateTag(true)"
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
                    category="tag"
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
                                        <TagsEditAttributes
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
                    action="update"
                    category="tag"
                    :item="item"
                    :v="$v"
                    @updateTag="updateTag(true)"
                />
            </form>
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

import router from '@/router';

import eventBus from '@shared/eventBus';

import TagService from '@shared/services/tagService';

import filterByName from '@shared/mixins/filterByName';
import keyboardSave from '@shared/mixins/keyboardSave';
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
import TagsEditAttributes from '@/components/tag/TagsEditAttributes.vue';
import ToolbarFormUtility from '@/components/toolbar/ToolbarFormUtility.vue';
import ToolbarSticky from '@/components/toolbar/ToolbarSticky.vue';

export default {
    name: 'TagsEdit',
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
        TagsEditAttributes,
        ToolbarFormUtility,
        ToolbarSticky,
    },
    mixins: [
        filterByName,
        keyboardSave,
        itemPropsBoth,
        itemPropsTag,
    ],
    data () {
        return {
            filter: '',
            item: {},
            itemsLocal: [],
        };
    },
    computed: {
        ...mapGetters({
            getTagByName: 'tag/getTagByName',
        }),
        ...mapState({
            attributes: state => state.attribute.all,
        }),
    },
    async created () {
        this.setLoading(true);
        this.tagAttributesSetup();
        this.item = this.getTagByName(this.$route.params.name);
        this.item.attributes.forEach(itemAttribute => {
            const attributeIndex = this.attributes.findIndex(({ name }) => name === itemAttribute.name);

            if (attributeIndex === -1) {
                this.setError(`Cannot find attribute '${itemAttribute.name}' in tag '${this.item.name}'`);
            }

            this.$set(this.attributes[attributeIndex], 'isActive', itemAttribute.isActive);
            this.$set(this.attributes[attributeIndex], 'subform', itemAttribute.subform);
        });
        this.itemsLocal = this.attributes;
        this.setLoading(false);
        this.focusItemName = true;
    },
    mounted () {
        eventBus.$on('ToolbarFormUtilityConfirmRemoveItem', this.removeTag);
    },
    beforeDestroy () {
        eventBus.$off('ToolbarFormUtilityConfirmRemoveItem');
        this.item = {};
    },
    methods: {
        ...mapActions({
            createToast: 'toast/createToast',
            getAllTags: 'tag/getAllTags',
        }),
        ...mapMutations({
            setError: 'error/setError',
        }),
        keyboardSave () {
            return this.updateTag();
        },
        async removeTag () {
            try {
                await TagService.removeTag(this.item._id);
                await this.getAllTags();
                this.createToast({ text: `Tag removed: '${this.item.name}'` });
                router.push('/tags/');
            } catch (error) {
                this.setError(error);
                this.createToast({
                    text: `Tag remove error: Could not remove '${this.item.name}'`,
                    theme: 'danger',
                });
            }
        },
        async updateTag (redirectOnSuccess = false) {
            // Validate
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            // Submit
            this.setLoading(true);
            this.focusItemName = false;

            try {
                await TagService.updateTag({
                    _id: this.item._id,
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
                this.createToast({ text: `Tag saved: '${this.item.name}'` });

                if (redirectOnSuccess) router.push(`/tags/${this.item.name}`);
            } catch (error) {
                this.setError(error);
                this.createToast({
                    text: `Tag save error: Could not save '${this.item.name}'`,
                    theme: 'danger',
                });
                this.focusItemName = true;
            }  finally {
                this.setLoading(false);
            }
        },
    },
};
</script>
