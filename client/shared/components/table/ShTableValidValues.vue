<template>
    <table class="table mb-0">
        <thead>
            <tr class="table-accent-alt">
                <th scope="col">
                    Value
                </th>
                <th scope="col">
                    Example
                </th>
                <th
                    v-if="hasNotes"
                    scope="col"
                >
                    Notes
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="valueTypesIncludesBooleanAttributeOnly">
                <td>
                    <code>[none]</code>
                </td>
                <td>
                    <code>{{ item.name }}</code>
                </td>
                <td>
                    <!-- eslint-disable vue/no-v-html -->
                    <div
                        class="markdown"
                        v-html="renderMarkdown(valueTypesBooleanAttributeNotes)"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                </td>
            </tr>
            <template v-if="valueTypesIncludesBooleanEnumerated">
                <tr>
                    <td>
                        <code>true</code>
                    </td>
                    <td>
                        <code>{{ item.name }}="true"</code>
                    </td>
                    <td />
                </tr>
                <tr>
                    <td>
                        <code>false</code>
                    </td>
                    <td>
                        <code>{{ item.name }}="false"</code>
                    </td>
                    <td v-if="hasNotes" />
                </tr>
            </template>
            <tr
                v-for="valueValue in item.valueValues"
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
                <td v-if="hasNotes">
                    <!-- eslint-disable vue/no-v-html -->
                    <div
                        v-if="valueValue.notes"
                        class="markdown"
                        v-html="renderMarkdown(valueValue.notes)"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import renderMarkdown from '@shared/mixins/renderMarkdown';

export default {
    name: 'ShTableValidsValues',
    mixins: [
        renderMarkdown,
    ],
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        hasNotes () {
            return this.item.valueValues.some(({ notes }) => notes) || this.valueTypesIncludesBooleanAttributeOnly;
        },
        valueTypesIncludesBooleanEnumerated () {
            return this.item.valueTypes?.includes('boolean-enumerated');
        },
        valueTypesIncludesBooleanAttributeOnly () {
            return this.item.valueTypes?.includes('boolean-attribute-only');
        },
        valueTypesBooleanAttributeNotes () {
            const part1 = `The presence of the \`${this.item.name}\` attribute equates to \`true\` while the absence of the \`${this.item.name}\` attribute equates to \`false\`.`;
            const part2 = `Providing an explicit value (such as \`${this.item.name}="true"\` or \`${this.item.name}="false"\`) is not valid.`;

            return this.valueTypesIncludesBooleanEnumerated ? part1 : `${part1}\n\n${part2}`;
        },
    },
    methods: {
        valueValueExample (valueValue) {
            const itemName = this.item.name === 'data-*' ? 'data-foo' : this.item.name;
            const itemValue = valueValue.example ? valueValue.example === '[empty string]' ? '' : valueValue.example : valueValue.name;
            return `${itemName}="${itemValue}"`;
        },
    },
};
</script>
