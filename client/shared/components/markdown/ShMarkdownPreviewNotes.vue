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
                    :value="markdownContentPatternInjected"
                />
            </div>
        </div>
    </div>
</template>

<script>
import contentPatternInject from '@shared/mixins/contentPatternInject';

import MarkdownElementInput from '@shared/components/markdown/ShMarkdownElementInput.vue';
import MarkdownElementOutput from '@shared/components/markdown/ShMarkdownElementOutput.vue';

export default {
    name: 'ShMarkdownPreviewNotes',
    components: {
        MarkdownElementInput,
        MarkdownElementOutput,
    },
    mixins: [
        contentPatternInject,
    ],
    props: {
        contentPatternMeta: {
            type: Object,
            default: () => {},
        },
        id: {
            type: String,
            default: '',
            required: true,
        },
        label: {
            type: String,
            default: 'Notes',
        },
        value: {
            type: String,
            default: '',
        },
    },
    computed: {
        markdownContentPatternInjected () {
            if (!this.contentPatternMeta) return this.value;

            const { attributeName, contentPatterns, tagName } = this.contentPatternMeta;

            return this.contentPatternInject({
                attributeName: attributeName,
                contentPatterns: contentPatterns,
                contentRaw: this.value,
                tagName: tagName,
            });
        },
    },
};
</script>
