<template>
    <div>
        <h3 class="h6 mt-1 mb-3">
            {{ title }}
        </h3>
        <table class="table mb-0">
            <thead>
                <tr>
                    <th>
                        Attribute Name
                    </th>
                    <th>
                        Has effect
                    </th>
                    <th>
                        Notes
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="attribute in attributes"
                    :key="attribute._id"
                >
                    <td>
                        <router-link :to="`/attributes/${attribute.name}`">
                            {{ attribute.name }}
                        </router-link>
                    </td>
                    <td>
                        <code>{{ attribute.subform.hasEffect }}</code>
                    </td>
                    <td>
                        <!-- eslint-disable vue/no-v-html -->
                        <div
                            class="markdown"
                            v-html="renderMarkdown(attribute.subform.notes)"
                        />
                        <!-- eslint-enable vue/no-v-html -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import renderMarkdown from '@shared/mixins/renderMarkdown';

export default {
    name: 'TagTableAttributes',
    mixins: [
        renderMarkdown,
    ],
    props: {
        attributes: {
            type: Array,
            default: () => [],
        },
        title: {
            type: String,
            default: '',
        },
    },
};
</script>
