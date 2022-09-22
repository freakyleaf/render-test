<template>
    <tr>
        <td>
            <router-link
                class="d-block"
                :to="`/attributes/view/${attributeLocal.name}`"
            >
                {{ attributeLocal.name }}
            </router-link>
        </td>
        <td>
            <BadgeStatus :status="badgeStatus(attributeLocal, tag)" />
        </td>
        <td>
            <template v-if="attributeLocal.subform">
                <BadgeOpinionated
                    v-if="attributeLocal.subform.notesOpinionated"
                    class="mb-3"
                />
                <!-- eslint-disable vue/no-v-html -->
                <div
                    v-if="attributeLocal.subform.notes"
                    v-html="renderMarkdown(markdownOutput(attributeLocal))"
                />
                <!-- eslint-enable vue/no-v-html -->
                <p v-if="attributeLocal.subform.codepen">
                    For a working example of <code>{{ attributeLocal.name }}</code> + <code>{{ tag.name }}</code> see
                    <a
                        :href="`${codePenUrl}${ attributeLocal.subform.codepen}`"
                        target="_blank"
                    >
                        this CodePen
                    </a>.
                </p>
            </template>
        </td>
    </tr>
</template>

<script>
import codePenUrl from '@shared/constants/codePenUrl';

import badgeStatus from '@shared/mixins/badgeStatus';
import contentPatternInject from '@shared/mixins/contentPatternInject';
import renderMarkdown from '@shared/mixins/renderMarkdown';

import BadgeOpinionated from '@shared/components/badge/ShBadgeOpinionated.vue';
import BadgeStatus from '@shared/components/badge/ShBadgeStatus.vue';

export default {
    name: 'ShTagTableAttributesRow',
    components: {
        BadgeOpinionated,
        BadgeStatus,
    },
    mixins: [
        badgeStatus,
        contentPatternInject,
        renderMarkdown,
    ],
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
    data () {
        return {
            attributeLocal: structuredClone(this.attribute),
            codePenUrl: codePenUrl,
        };
    },
    created () {
        // Merge `tag.attributes[attribute]` with `attributeLocal`
        const tagAttribute = this.tag.attributes.find(({ name }) => name === this.attributeLocal.name);

        if (tagAttribute) {
            this.$set(this.attributeLocal, 'isActive', tagAttribute.isActive);
            this.$set(this.attributeLocal, 'subform', tagAttribute.subform);

            // Merge `contentPatterns` if `attributeLocal.contentPatterns` has entries
            if (this.attributeLocal.contentPatterns.length) {
                this.attributeLocal.contentPatterns = [ ...this.attributeLocal.contentPatterns, ...this.tag.contentPatterns ];
            } else {
                this.attributeLocal.contentPatterns = this.tag.contentPatterns;
            }
        }
    },
    methods: {
        contentPatterns (attribute) {
            return [
                { attribute: [ ...attribute.contentPatterns ] },
                { tag: [ ...this.tag.contentPatterns ] },
            ];
        },
        markdownOutput (attribute) {
            return this.contentPatternInject({
                attributeName: attribute.name,
                contentPatterns: this.contentPatterns(attribute),
                contentRaw: attribute.subform.notes,
                tagName: this.tag.name,
            });
        },
    },
};
</script>
