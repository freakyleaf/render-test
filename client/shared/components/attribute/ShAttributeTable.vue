<template>
    <table class="table table-striped">
        <tbody>
            <tr>
                <th
                    class="col-3"
                    scope="row"
                >
                    Attribute Name
                </th>
                <td>
                    <code>{{ itemLocal.name }}</code>
                </td>
            </tr>
            <tr>
                <th scope="row">
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
            <tr v-if="itemLocal.subtypes?.length">
                <th scope="row">
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
                <th scope="row">
                    Attribute Value:<br>Valid Types
                </th>
                <td>
                    <ul class="list-unstyled">
                        <li
                            v-for="valueType in itemLocal.valueTypes"
                            :key="valueType"
                        >
                            <!-- eslint-disable-next-line vue/no-v-html -->
                            <div v-html="renderMarkdown(prettyType(valueType), true)" />
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th scope="row">
                    Attribute Value:<br>Valid Values
                </th>
                <td>
                    <table class="table table-light mb-0">
                        <thead>
                            <tr>
                                <th>
                                    Value
                                </th>
                                <th>
                                    Example
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="valueTypesIncludesBooleanAttributeOnly">
                                <td>
                                    <code>[none]</code>
                                </td>
                                <td>
                                    <code>{{ itemLocal.name }}</code>
                                </td>
                            </tr>
                            <template v-if="valueTypesIncludesBooleanEnumerated">
                                <tr>
                                    <td>
                                        <code>true</code>
                                    </td>
                                    <td>
                                        <code>{{ itemLocal.name }}="true"</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>false</code>
                                    </td>
                                    <td>
                                        <code>{{ itemLocal.name }}="false"</code>
                                    </td>
                                </tr>
                            </template>
                            <tr
                                v-for="valueValue in itemLocal.valueValues"
                                :key="valueValue.name"
                            >
                                <td>
                                    <code>{{ valueValue.name }}</code>
                                </td>
                                <td>
                                    <code>
                                        {{ valueValueExample(valueValue) }}
                                    </code>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            <tr v-if="itemLocal.references?.length">
                <th scope="row">
                    References
                </th>
                <td>
                    <TableReferences :references="itemLocal.references" />
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
import TableContentPatterns from '@shared/components/table/ShTableContentPatterns.vue';
import TableReferences from '@shared/components/table/ShTableReferences.vue';

import dateParse from '@shared/mixins/dateParse';
import prettyType from '@shared/mixins/prettyType';
import renderMarkdown from '@shared/mixins/renderMarkdown';

export default {
    name: 'ShAttributeTable',
    components: {
        TableContentPatterns,
        TableReferences,
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
        valueTypesIncludesBooleanEnumerated () {
            return this.itemLocal.valueTypes?.includes('boolean-enumerated');
        },
        valueTypesIncludesBooleanAttributeOnly () {
            return this.itemLocal.valueTypes?.includes('boolean-attribute-only');
        },
    },
    methods: {
        valueValueExample (valueValue) {
            const itemName = this.itemLocal.name === 'data-*' ? 'data-foo' : this.itemLocal.name;
            const itemValue = valueValue.example ? valueValue.example === '[empty string]' ? '' : valueValue.example : valueValue.name;
            return `${itemName}="${itemValue}"`;
        },
    },
};
</script>
