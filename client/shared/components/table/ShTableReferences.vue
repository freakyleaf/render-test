<template>
    <table class="table mb-0">
        <thead>
            <tr class="table-accent-alt">
                <th scope="col">
                    Reference Name
                </th>
                <th scope="col">
                    Reference URL
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="reference in references"
                :key="reference.name"
            >
                <td>
                    <!-- eslint-disable vue/no-v-html -->
                    <span
                        class="markdown"
                        v-html="renderMarkdown(reference.name, true)"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                </td>
                <td>
                    <a
                        class="reference-url"
                        :href="reference.url"
                        target="_blank"
                    >
                        {{ reference.url }}
                    </a>
                    <IconExternalLink v-if="urlIsExternal(reference.url)" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import renderMarkdown from '@shared/mixins/renderMarkdown';

import IconExternalLink from '@shared/components/icons/IconExternalLink.vue';

export default {
    name: 'ShTableReferences',
    components: {
        IconExternalLink,
    },
    mixins: [
        renderMarkdown,
    ],
    props: {
        references: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        urlIsExternal (url) {
            return url.includes('http');
        },
    },
};
</script>

<style scoped>
.reference-url {
    word-break: break-word;
}
</style>
