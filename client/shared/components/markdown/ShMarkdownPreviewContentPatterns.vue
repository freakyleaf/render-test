<template>
    <div class="mb-3">
        <div class="markdown-preview container-fluid g-0">
            <div class="row">
                <MarkdownElementInput
                    :id="id"
                    :is-invalid="v.$error"
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
                            {{ label }} <span class="text-danger">(required)</span>
                        </label>
                    </template>
                    <template #validation>
                        <div
                            v-if="!v.required"
                            class="invalid-feedback"
                        >
                            {{ label }} field is required
                        </div>
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
    name: 'ShMarkdownPreviewNotesContentPatterns',
    components: {
        MarkdownElementInput,
        MarkdownElementOutput,
    },
    props: {
        id: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: 'Content Pattern Content',
        },
        v: {
            type: Object,
            default: () => {},
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
    },
};
</script>
