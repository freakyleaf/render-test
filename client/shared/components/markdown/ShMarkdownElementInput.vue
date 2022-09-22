<template>
    <div class="markdown-preview__input col">
        <slot name="label" />
        <textarea
            :id="id"
            :ref="id"
            class="form-control font-monospace"
            :class="{ 'is-invalid': isInvalid }"
            :value="value"
            @input="$emit('markdownPreviewInput', $event.target.value)"
        />
        <slot name="validation" />
    </div>
</template>

<script>
export default {
    name: 'ShMarkdownElementInput',
    props: {
        id: {
            type: String,
            default: '',
            required: true,
        },
        isInvalid: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: '',
        },
    },
};
</script>
