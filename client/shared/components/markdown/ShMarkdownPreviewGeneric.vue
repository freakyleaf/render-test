<template>
    <div class="mb-3">
        <div class="markdown-preview container-fluid g-0">
            <div class="row">
                <MarkdownElementInput
                    :id="id"
                    :label="label"
                    :value="value"
                    @markdownPreviewInput="(value) => {
                        $emit('markdownPreviewInput', value);
                    }"
                >
                    <template #label>
                        <label
                            class="form-label"
                            :for="id"
                        >
                            {{ label }}
                        </label>
                    </template>
                </MarkdownElementInput>
                <MarkdownElementOutput
                    :id="id"
                    :value="value"
                />
            </div>
        </div>
    </div>
</template>

<script>
import MarkdownElementInput from '@shared/components/markdown/ShMarkdownElementInput.vue';
import MarkdownElementOutput from '@shared/components/markdown/ShMarkdownElementOutput.vue';

export default {
    name: 'ShMarkdownPreviewGeneric',
    components: {
        MarkdownElementInput,
        MarkdownElementOutput,
    },
    props: {
        id: {
            type: String,
            default: '',
            required: true,
        },
        label: {
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
