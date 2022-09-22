<template>
    <div class="markdown-preview__output col">
        <label
            class="form-label"
            :for="`${id}-preview`"
        >
            Preview
        </label>
        <!-- eslint-disable vue/no-v-html -->
        <output
            :id="`${id}-preview`"
            class="form-control"
            v-html="renderMarkdown(value)"
        />
        <!-- eslint-enable vue/no-v-html -->
    </div>
</template>

<script>
import renderMarkdown from '@shared/mixins/renderMarkdown';

export default {
    name: 'ShMarkdownElementOutput',
    mixins: [
        renderMarkdown,
    ],
    props: {
        id: {
            type: String,
            default: '',
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
    },
};
</script>
