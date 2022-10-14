<template>
    <div>
        <PageTitle>
            Tag: <code>{{ $route.params.name }}</code>
        </PageTitle>
        <ContainerGeneric>
            <template v-if="!isValidItem(item)">
                <h2>Whoops!</h2>
                <BoxGeneric>
                    <DidYouMeanSingle
                        item-category="tag"
                        :item-name="itemName"
                        :suggested-item="suggestedItem"
                    />
                </BoxGeneric>
            </template>
            <template v-else>
                <TagTable :item="item" />
                <TagAttributes :item="item" />
                <SuggestAnEditLink />
            </template>
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import getSuggested from '@shared/mixins/getSuggested';

import BoxGeneric from '@shared/components/layout/ShBoxGeneric.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import DidYouMeanSingle from '@shared/components/did-you-mean/ShDidYouMeanSingle.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';
import SuggestAnEditLink from '@/components/suggest-an-edit/SuggestAnEditLink.vue';
import TagAttributes from '@shared/components/tag/ShTagAttributes.vue';
import TagTable from '@shared/components/tag/ShTagTable.vue';

export default {
    name: 'TagsView',
    components: {
        BoxGeneric,
        ContainerGeneric,
        DidYouMeanSingle,
        PageTitle,
        SuggestAnEditLink,
        TagAttributes,
        TagTable,
    },
    mixins: [
        getSuggested,
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
            getTagByName: 'tag/getTagByName',
        }),
    },
    created () {
        this.item = this.getTagByName(this.itemName);
        if (!this.isValidItem(this.item)) {
            this.suggestedItem = this.getSuggestedItem(this.itemName, 'tag');
        }
    },
};
</script>
