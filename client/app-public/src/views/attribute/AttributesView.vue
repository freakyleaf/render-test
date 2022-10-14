<template>
    <div>
        <PageTitle>
            Attribute: <code>{{ $route.params.name }}</code>
        </PageTitle>
        <ContainerGeneric>
            <template v-if="!isValidItem(item)">
                <h2>Whoops!</h2>
                <BoxGeneric>
                    <DidYouMeanSingle
                        item-category="attribute"
                        :item-name="itemName"
                        :suggested-item="suggestedItem"
                    />
                </BoxGeneric>
            </template>
            <template v-else>
                <AttributeTable :item="item" />
                <template v-if="item.codepen">
                    <h2 class="h4">
                        CodePen Example
                    </h2>
                    <CodePenEmbed :code-pen-id="item.codepen" />
                </template>
                <SuggestAnEditLink />
            </template>
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import getSuggested from '@shared/mixins/getSuggested';
import indefiniteArticleSwitch from '@shared/mixins/indefiniteArticleSwitch';
import prettyType from '@shared/mixins/prettyType';
import renderMarkdown from '@shared/mixins/renderMarkdown';

import AttributeTable from '@shared/components/attribute/ShAttributeTable.vue';
import BoxGeneric from '@shared/components/layout/ShBoxGeneric.vue';
import CodePenEmbed from '@shared/components/vs/ShCodePenEmbed.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import DidYouMeanSingle from '@shared/components/did-you-mean/ShDidYouMeanSingle.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';
import SuggestAnEditLink from '@/components/suggest-an-edit/SuggestAnEditLink.vue';

export default {
    name: 'AttributesView',
    components: {
        AttributeTable,
        BoxGeneric,
        CodePenEmbed,
        ContainerGeneric,
        DidYouMeanSingle,
        PageTitle,
        SuggestAnEditLink,
    },
    mixins: [
        getSuggested,
        indefiniteArticleSwitch,
        prettyType,
        renderMarkdown,
    ],
    data () {
        return {
            item: {},
            itemName: this.$route.params.name,
            suggestedItem: '',
        };
    },
    computed: {
        ...mapGetters({
            getAttributeByName: 'attribute/getAttributeByName',
        }),
    },
    created () {
        this.item = this.getAttributeByName(this.itemName);
        if (!this.isValidItem(this.item)) {
            this.suggestedItem = this.getSuggestedItem(this.itemName, 'attribute');
        }
    },
};
</script>
