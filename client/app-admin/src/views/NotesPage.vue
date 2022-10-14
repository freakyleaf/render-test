<template>
    <div class="notes">
        <PageTitle>
            Notes
        </PageTitle>
        <ContainerGeneric>
            <div v-show="true">
                <h2>Attributes</h2>
                <ul class="list-group mb-3">
                    <li
                        v-for="attribute in attributes"
                        :key="attribute._id"
                        class="card mb-3"
                    >
                        <div class="card-header">
                            <h3>
                                <code>{{ attribute.name }}</code>
                            </h3>
                        </div>
                        <div class="card-body">
                            <template v-if="attribute.description">
                                <div class="mb-3">
                                    <h4>Description</h4>
                                    <!-- eslint-disable vue/no-v-html -->
                                    <div
                                        class="markdown"
                                        v-html="renderMarkdown(attribute.description)"
                                    />
                                    <!-- eslint-enable vue/no-v-html -->
                                </div>
                            </template>
                            <template v-if="attribute.notes">
                                <div class="mb-3">
                                    <h4>Notes</h4>
                                    <!-- eslint-disable vue/no-v-html -->
                                    <div
                                        class="markdown"
                                        v-html="renderMarkdown(attribute.notes)"
                                    />
                                    <!-- eslint-enable vue/no-v-html -->
                                </div>
                            </template>
                            <TableValidValues
                                class="table-bordered-outside-alt"
                                :item="attribute"
                            />
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                <h2>Tags</h2>
                <ul class="list-group mb-3">
                    <li
                        v-for="tag in tags"
                        :key="tag._id"
                        class="card mb-3"
                    >
                        <div class="card-header">
                            <h3>
                                <code>{{ tag.name }}</code>
                            </h3>
                        </div>
                        <div class="card-body">
                            <template v-if="false">
                                <h4>Description</h4>
                                <!-- eslint-disable vue/no-v-html -->
                                <div
                                    class="markdown"
                                    v-html="renderMarkdown(tag.description)"
                                />
                                <!-- eslint-enable vue/no-v-html -->
                            </template>
                            <template v-if="tag.notes">
                                <h4>Notes</h4>
                                <!-- eslint-disable vue/no-v-html -->
                                <div
                                    class="markdown"
                                    v-html="renderMarkdown(tag.notes)"
                                />
                                <!-- eslint-enable vue/no-v-html -->
                            </template>
                            <ul
                                v-if="tag.contentPatterns.length"
                                class="list-group mb-3"
                            >
                                <li
                                    v-for="tagAttribute in filterTagAttributesWithNotes(tag.attributes)"
                                    :key="tagAttribute._id"
                                    class="card mb-3"
                                >
                                    <div class="card-header">
                                        <h5>
                                            <code>{{ tagAttribute.name }}</code> x <code>{{ tag.name }}</code>
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <!-- eslint-disable vue/no-v-html -->
                                        <div
                                            class="markdown"
                                            v-html="renderMarkdown(doContentPatternInjection(tag, tagAttribute))"
                                        />
                                        <!-- eslint-enable vue/no-v-html -->
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import contentPatternInject from '@shared/mixins/contentPatternInject';
import renderMarkdown from '@shared/mixins/renderMarkdown';

import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';
import TableValidValues from '@shared/components/table/ShTableValidValues.vue';

export default {
    name: 'ViewNotes',
    components: {
        ContainerGeneric,
        PageTitle,
        TableValidValues,
    },
    mixins: [
        contentPatternInject,
        renderMarkdown,
    ],
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
            tags: state => state.tag.all,
        }),
    },
    methods: {
        filterTagAttributesWithNotes (attributes) {
            return attributes.filter(({ subform }) => subform.notes);
        },
        doContentPatternInjection (tag, attribute) {
            const attributeContentPatterns = this.attributes.find(({ name }) => name === attribute.name).contentPatterns;
            return this.contentPatternInject({
                attributeName: attribute.name,
                contentPatterns: [
                    { attribute: [ ...attributeContentPatterns ] },
                    { tag: [ ...tag.contentPatterns ] },
                ],
                contentRaw: attribute.subform.notes,
                tagName: tag.name,
            });
        },
    },
};
</script>
