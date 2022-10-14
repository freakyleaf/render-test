<template>
    <table class="table">
        <tbody>
            <tr>
                <th
                    class="col-3 table-accent"
                    scope="row"
                >
                    Tag Name
                </th>
                <td>
                    <code>{{ itemLocal.name }}</code>
                </td>
            </tr>
            <tr>
                <th
                    class="table-accent"
                    scope="row"
                >
                    Tag Type
                </th>
                <td>
                    {{ prettyType(itemLocal.type) }}
                </td>
            </tr>
            <tr v-if="itemLocal.description">
                <th
                    class="table-accent"
                    scope="row"
                >
                    Description
                </th>
                <td>
                    <!-- eslint-disable vue/no-v-html -->
                    <div
                        class="markdown"
                        v-html="renderMarkdown(itemLocal.description)"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                </td>
            </tr>
            <tr v-if="itemLocal.notes">
                <th
                    class="table-accent"
                    scope="row"
                >
                    Notes
                </th>
                <td>
                    <!-- eslint-disable vue/no-v-html -->
                    <div
                        class="markdown"
                        v-html="renderMarkdown(itemLocal.notes)"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                </td>
            </tr>
            <tr v-if="relatedItems.attribute.length">
                <th
                    class="table-accent"
                    scope="row"
                >
                    Related Attributes
                </th>
                <td>
                    <TableRelatedItems
                        category="attribute"
                        class="table-bordered-outside-alt"
                        :related-items="relatedItems.attribute"
                    />
                </td>
            </tr>
            <tr v-if="relatedItems.tag.length">
                <th
                    class="table-accent"
                    scope="row"
                >
                    Related Attributes
                </th>
                <td>
                    <TableRelatedItems
                        category="tag"
                        class="table-bordered-outside-alt"
                        :related-items="relatedItems.tag"
                    />
                </td>
            </tr>
            <tr v-if="isAdminApp && itemLocal.contentPatterns?.length">
                <th
                    class="table-accent"
                    scope="row"
                >
                    Content Patterns
                </th>
                <td>
                    <TableContentPatterns
                        class="table-bordered-outside-alt"
                        :content-patterns="itemLocal.contentPatterns"
                    />
                </td>
            </tr>
            <tr v-if="itemLocal.references && itemLocal.references.length">
                <th
                    class="table-accent"
                    scope="row"
                >
                    References
                </th>
                <td>
                    <TableReferences
                        class="table-bordered-outside-alt"
                        :references="itemLocal.references"
                    />
                </td>
            </tr>
            <tr v-if="isAdminApp">
                <th
                    class="table-accent"
                    scope="row"
                >
                    Date published
                </th>
                <td>{{ dateParse(itemLocal.datePublished) }}</td>
            </tr>
            <tr v-if="isAdminApp && itemLocal.dateUpdated && dateParse(itemLocal.dateUpdated) !== dateParse(itemLocal.datePublished)">
                <th
                    class="table-accent"
                    scope="row"
                >
                    Last updated
                </th>
                <td>{{ dateParse(itemLocal.dateUpdated) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState } from 'vuex';

import TableContentPatterns from '@shared/components/table/ShTableContentPatterns.vue';
import TableReferences from '@shared/components/table/ShTableReferences.vue';

import dateParse from '@shared/mixins/dateParse';
import prettyType from '@shared/mixins/prettyType';
import relatedItems from '@shared/mixins/relatedItems';
import renderMarkdown from '@shared/mixins/renderMarkdown';

export default {
    name: 'ShTagTable',
    components: {
        TableContentPatterns,
        TableReferences,
    },
    mixins: [
        dateParse,
        prettyType,
        relatedItems,
        renderMarkdown,
    ],
    props: {
        item: {
            type: Object,
            default: () => {},
        },
        isAdminApp: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            itemLocal: structuredClone(this.item),
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
        }),
    },
    created () {
        // Add any `attributes[attribute].contentPatterns` into `itemLocal.attributes[attribute].contentPatterns`
        this.itemLocal.attributes.forEach(itemLocalAttribute => {
            const attributeIndex = this.attributes.findIndex(({ name }) => name === itemLocalAttribute.name);
            if (this.attributes[attributeIndex].contentPatterns.length) {
                itemLocalAttribute.contentPatterns = this.attributes[attributeIndex].contentPatterns;

            } else {
                itemLocalAttribute.contentPatterns = [];
            }
        });
    },
};
</script>
