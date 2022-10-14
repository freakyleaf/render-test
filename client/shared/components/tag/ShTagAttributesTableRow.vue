<template>
    <tr>
        <td>
            <router-link
                class="attribute-name d-block"
                :to="`/attributes/${attributeLocal.name}`"
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
                    class="markdown"
                    v-html="renderMarkdown(markdownOutput(attributeLocal))"
                />
                <!-- eslint-enable vue/no-v-html -->
                <p v-if="attributeLocal.subform.codepen">
                    For a working example of <code>{{ attributeLocal.name }}</code> + <code>{{ tag.name }}</code> see
                    <a
                        :href="`${urlCodePen}${attributeLocal.subform.codepen}`"
                        target="_blank"
                    >
                        this CodePen
                    </a>
                    <IconExternalLink />
                    .
                </p>
                <p class="mb-0">
                    Check out the dedicated
                    <router-link :to="`/vs/${attribute.name}/${tag.name}`">
                        '{{ attribute.name }}' + '{{ tag.name }}' page
                    </router-link>.
                </p>
            </template>
        </td>
    </tr>
</template>

<script>
import urlCodePen from '@shared/constants/urlCodePen';

import badgeStatus from '@shared/mixins/badgeStatus';
import contentPatternInject from '@shared/mixins/contentPatternInject';
import renderMarkdown from '@shared/mixins/renderMarkdown';

import BadgeOpinionated from '@shared/components/badge/ShBadgeOpinionated.vue';
import BadgeStatus from '@shared/components/badge/ShBadgeStatus.vue';
import IconExternalLink from '@shared/components/icons/IconExternalLink.vue';

export default {
    name: 'ShTagAttributesTableRow',
    components: {
        BadgeOpinionated,
        BadgeStatus,
        IconExternalLink,
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
            urlCodePen: urlCodePen,
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

<style scoped>
.attribute-name {
    white-space: nowrap;
}
</style>
