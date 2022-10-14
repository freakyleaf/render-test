<template>
    <table class="table">
        <tbody>
            <tr>
                <th
                    class="col-3 table-accent"
                    scope="row"
                >
                    Attribute Name
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
                    Attribute Type
                </th>
                <td>
                    {{ prettyType(itemLocal.type) }}
                    <span v-if="itemLocal.typeAlsoGlobal">
                        <br>
                        This attribute can also be considered an ARIA Global attribute
                    </span>
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
                        v-html="itemContentDescription"
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
                        v-html="itemContentNotes"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                </td>
            </tr>
            <tr>
                <th
                    class="table-accent"
                    scope="row"
                >
                    Attribute Value:<br>Valid Types
                </th>
                <td>
                    <ul class="list-unstyled">
                        <li
                            v-for="valueType in itemLocal.valueTypes"
                            :key="valueType"
                        >
                            <!-- eslint-disable vue/no-v-html -->
                            <div
                                class="markdown"
                                v-html="renderMarkdown(prettyType(valueType), true)"
                            />
                            <!-- eslint-enable vue/no-v-html -->
                        </li>
                    </ul>
                </td>
            </tr>
            <tr v-if="itemLocal.subtypes?.length">
                <th
                    class="table-accent"
                    scope="row"
                >
                    Attribute Subtypes
                </th>
                <td>
                    <ul class="list-unstyled">
                        <li
                            v-for="subtype in itemLocal.subtypes"
                            :key="subtype"
                        >
                            {{ prettyType(subtype) }}
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th
                    class="table-accent"
                    scope="row"
                >
                    Attribute Value:<br>Valid Values
                </th>
                <td>
                    <TableValidValues
                        class="table-bordered-outside-alt"
                        :item="itemLocal"
                    />
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
            <tr v-if="itemLocal.references?.length">
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
import TableContentPatterns from '@shared/components/table/ShTableContentPatterns.vue';
import TableReferences from '@shared/components/table/ShTableReferences.vue';
import TableRelatedItems from '@shared/components/table/ShTableRelatedItems.vue';
import TableValidValues from '@shared/components/table/ShTableValidValues.vue';

import dateParse from '@shared/mixins/dateParse';
import prettyType from '@shared/mixins/prettyType';
import relatedItems from '@shared/mixins/relatedItems';
import renderMarkdown from '@shared/mixins/renderMarkdown';

export default {
    name: 'ShAttributeTable',
    components: {
        TableContentPatterns,
        TableRelatedItems,
        TableReferences,
        TableValidValues,
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
            itemContentDescription: '',
            itemContentNotes: '',
            itemLocal: {},
        };
    },
    created () {
        this.itemLocal = structuredClone(this.item);
        this.itemContentDescription = this.renderMarkdown(this.itemLocal.description);
        this.itemContentNotes = this.renderMarkdown(this.itemLocal.notes);
    },
};
</script>
