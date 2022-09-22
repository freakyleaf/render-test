<template>
    <table class="table table-striped">
        <tbody>
            <tr>
                <th
                    class="col-3"
                    scope="row"
                >
                    Tag Name
                </th>
                <td>
                    <code>{{ itemLocal.name }}</code>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    Tag Type
                </th>
                <td>
                    {{ prettyType(itemLocal.type) }}
                </td>
            </tr>
            <tr v-if="itemLocal.description">
                <th scope="row">
                    Description
                </th>
                <td>
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <div v-html="renderMarkdown(itemLocal.description)" />
                </td>
            </tr>
            <tr v-if="itemLocal.notes">
                <th scope="row">
                    Notes
                </th>
                <td>
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <div v-html="renderMarkdown(itemLocal.notes)" />
                </td>
            </tr>
            <tr v-if="isAdminApp && itemLocal.contentPatterns?.length">
                <th scope="row">
                    Content Patterns
                </th>
                <td>
                    <TableContentPatterns :content-patterns="itemLocal.contentPatterns" />
                </td>
            </tr>
            <tr v-if="itemLocal.references && itemLocal.references.length">
                <th scope="row">
                    References
                </th>
                <td>
                    <TableReferences :references="itemLocal.references" />
                </td>
            </tr>
            <tr v-if="itemLocal.attributes">
                <th scope="row">
                    Attributes
                </th>
                <td>
                    <category-sort-x
                        category="attribute"
                        :items="attributes"
                    >
                        <template #default="{ typesSorted }">
                            <ul class="list-unstyled">
                                <template v-for="type in typesSorted">
                                    <TagTableAttributes
                                        v-if="type.items.length"
                                        :key="type.title.kebab"
                                        :attributes="type.items"
                                        :tag="itemLocal"
                                        :title="type.title.pretty"
                                    />
                                </template>
                            </ul>
                        </template>
                    </category-sort-x>
                </td>
            </tr>
            <tr v-if="isAdminApp">
                <th scope="row">
                    Date published
                </th>
                <td>{{ dateParse(itemLocal.datePublished) }}</td>
            </tr>
            <tr v-if="isAdminApp && itemLocal.dateUpdated && dateParse(itemLocal.dateUpdated) !== dateParse(itemLocal.datePublished)">
                <th scope="row">
                    Last updated
                </th>
                <td>{{ dateParse(itemLocal.dateUpdated) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState } from 'vuex';

import CategorySortX from '@shared/components/renderless/ShCategorySortX.vue';
import TableContentPatterns from '@shared/components/table/ShTableContentPatterns.vue';
import TableReferences from '@shared/components/table/ShTableReferences.vue';
import TagTableAttributes from '@shared/components/tag/ShTagTableAttributes.vue';

import dateParse from '@shared/mixins/dateParse';
import prettyType from '@shared/mixins/prettyType';
import renderMarkdown from '@shared/mixins/renderMarkdown';

export default {
    name: 'ShTagTable',
    components: {
        CategorySortX,
        TableContentPatterns,
        TableReferences,
        TagTableAttributes,
    },
    mixins: [
        dateParse,
        prettyType,
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
