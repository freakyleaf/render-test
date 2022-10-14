<template>
    <div>
        <template v-if="!isValidAttribute || !isValidTag">
            <h2>Whoops!</h2>
            <BoxGeneric>
                <template v-if="!isValidAttribute && !isValidTag">
                    <p><code>{{ attributeName }}</code> is not a valid attribute and <code>{{ tagName }}</code> is not a valid tag.</p>
                    <p v-if="suggestedAttribute && suggestedTag">
                        Did you mean <code>{{ suggestedAttribute }}</code> and <code>{{ suggestedTag }}</code>? If so try
                        <router-link :to="`/${UrlFragmentDedicatedPage}/${suggestedAttribute}/${suggestedTag}`">
                            {{ suggestedAttribute }} + {{ suggestedTag }}
                        </router-link>.
                    </p>
                    <p v-else>
                        <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
                        Try going back to the <router-link to="/">home page</router-link> and performing a search from there.
                    </p>
                </template>
                <DidYouMeanVs
                    v-else-if="!isValidAttribute"
                    :is-valid-attribute="isValidAttribute"
                    :is-valid-tag="isValidTag"
                    item-category="attribute"
                    :item-counterpart-name="tagName"
                    :item-name="attributeName"
                    :suggested-item="suggestedAttribute"
                />
                <DidYouMeanVs
                    v-else-if="!isValidTag"
                    :is-valid-attribute="isValidAttribute"
                    :is-valid-tag="isValidTag"
                    item-category="tag"
                    :item-counterpart-name="attributeName"
                    :item-name="tagName"
                    :suggested-item="suggestedTag"
                />
            </BoxGeneric>
        </template>
        <template v-else>
            <VsResults
                :attribute="attribute"
                :tag="tag"
            />
            <template v-if="codePenId">
                <h2 class="h4">
                    CodePen Example
                </h2>
                <CodePenEmbed :code-pen-id="codePenId" />
            </template>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import UrlFragmentDedicatedPage from '@shared/constants/urlFragmentDedicatedPage';

import getSuggested from '@shared/mixins/getSuggested';

import BoxGeneric from '@shared/components/layout/ShBoxGeneric.vue';
import CodePenEmbed from '@shared/components/vs/ShCodePenEmbed.vue';
import DidYouMeanVs from '@shared/components/did-you-mean/ShDidYouMeanVs.vue';
import VsResults from '@shared/components/vs/ShVsResults.vue';

export default {
    name: 'ShAttributeVsTag',
    components: {
        DidYouMeanVs,
        BoxGeneric,
        CodePenEmbed,
        VsResults,
    },
    mixins: [
        getSuggested,
    ],
    props: {
        attributeName: {
            type: String,
            default: '',
            required: true,
        },
        tagName: {
            type: String,
            default: '',
            required: true,
        },
    },
    data () {
        return {
            attribute: {},
            isValidAttribute: null,
            isValidTag: null,
            suggestedAttribute: '',
            suggestedTag: '',
            tag: {},
            UrlFragmentDedicatedPage: UrlFragmentDedicatedPage,
        };
    },
    computed: {
        ...mapGetters({
            getAttributeByName: 'attribute/getAttributeByName',
            getTagByName: 'tag/getTagByName',
        }),
        codePenId () {
            if (!this.attribute || !this.tag) return null;
            const attributeIndex = this.tag.attributes.findIndex(({ name }) => name === this.attribute.name);
            return this.tag.attributes[attributeIndex].subform.codepen;
        },
    },
    created () {
        this.attribute = this.getAttributeByName(this.attributeName);
        this.tag = this.getTagByName(this.tagName);
        this.isValidAttribute = this.isValidItem(this.attribute);
        this.isValidTag = this.isValidItem(this.tag);
        this.suggestedAttribute = this.isValidAttribute ? '' : this.getSuggestedItem(this.attributeName, 'attribute');
        this.suggestedTag = this.isValidTag ? '' : this.getSuggestedItem(this.tagName, 'tag');
    },
};
</script>
