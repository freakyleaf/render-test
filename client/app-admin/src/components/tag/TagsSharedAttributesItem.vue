<template>
    <div class="subform p-3 pr-0 mt-3">
        <div class="mb-3">
            <InputAttributeTagCombinationValid
                :attribute-name="attribute.name"
                :checked="attribute.subform.isValid"
                :tag-name="tag.name"
                @attributeTagCombinationValid="(value) => {
                    $emit('attributeSubformInput', {
                        attribute: attribute.name,
                        key: 'isValid',
                        value: value,
                    });
                }"
            />
            <InputAttributeHasEffect
                :attribute-name="attribute.name"
                :checked="attribute.subform.hasEffect"
                :tag-name="tag.name"
                @attributeHasEffect="(value) => {
                    $emit('attributeSubformInput', {
                        attribute: attribute.name,
                        key: 'hasEffect',
                        value: value,
                    });
                }"
            />
            <InputAttributeNotesOpinionated
                :attribute-name="attribute.name"
                :checked="attribute.subform.notesOpinionated"
                @attributeNotesOpinionated="(value) => {
                    $emit('attributeSubformInput', {
                        attribute: attribute.name,
                        key: 'notesOpinionated',
                        value: value,
                    });
                }"
            />
        </div>
        <MarkdownPreviewNotes
            :id="`${attribute.name}-notes`"
            ref="markdownPreviewNotes"
            :content-pattern-meta="{
                attributeName: attribute.name,
                contentPatterns: contentPatterns,
                tagName: tag.name,
            }"
            :value="attribute.subform.notes"
            @markdownPreviewInput="(value) => {
                $emit('attributeSubformInput', {
                    attribute: attribute.name,
                    key: 'notes',
                    value: value,
                });
            }"
        />
        <TagTableContentPatternsAvailable
            v-if="attribute.contentPatterns.length || tag.contentPatterns.length"
            :attribute-content-patterns="attribute.contentPatterns"
            :tag-content-patterns="tag.contentPatterns"
            @addContentPatternToNotes="(value) => {
                addContentPatternToNotes(value);
            }"
        />
        <InputCodePen
            :id="`${attribute.name}-codepen`"
            :value="attribute.subform.codepen"
            @input="(value) => {
                $emit('attributeSubformInput', {
                    attribute: attribute.name,
                    key: 'codepen',
                    value: value,
                })
            }"
        />
    </div>
</template>

<script>
import InputAttributeHasEffect from '@/components/form/InputAttributeHasEffect.vue';
import InputAttributeNotesOpinionated from '@/components/form/InputAttributeNotesOpinionated.vue';
import InputAttributeTagCombinationValid from '@/components/form/InputAttributeTagCombinationValid.vue';
import InputCodePen from '@/components/form/InputCodePen.vue';
import MarkdownPreviewNotes from '@shared/components/markdown/ShMarkdownPreviewNotes.vue';
import TagTableContentPatternsAvailable from '@/components/tag/TagTableContentPatternsAvailable.vue';

export default {
    name: 'TagsSharedAttributesItem',
    components: {
        InputAttributeHasEffect,
        InputAttributeNotesOpinionated,
        InputAttributeTagCombinationValid,
        InputCodePen,
        MarkdownPreviewNotes,
        TagTableContentPatternsAvailable,
    },
    props: {
        attribute: {
            type: Object,
            default: () => {},
        },
        tag: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        contentPatterns () {
            return [
                { attribute: [ ...this.attribute.contentPatterns ] },
                { tag: [ ...this.tag.contentPatterns ] },
            ];
        },
    },
    methods: {
        addContentPatternToNotes (contentPatternToAdd) {
            const currentNotes = this.attribute.subform.notes;
            const newNotes = currentNotes.length ? `${currentNotes}\n\n${contentPatternToAdd}` : contentPatternToAdd;

            this.$emit('attributeSubformInput', {
                attribute: this.attribute.name,
                key: 'notes',
                value: newNotes,
            });

            // Focus the `<textarea>` tag we've just appended content to
            this.$refs.markdownPreviewNotes.$refs.MarkdownElementInput.$refs[`${this.attribute.name}-notes`].focus();
        },
    },
};
</script>
