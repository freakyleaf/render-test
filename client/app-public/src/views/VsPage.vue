<template>
    <div class="view-attribute-vs-tag">
        <PageTitle>
            <code>{{ attributeName }}</code> + <code>{{ tagName }}</code>
        </PageTitle>
        <ContainerGeneric>
            <AttributeVsTag
                :attribute-name="attributeName"
                :tag-name="tagName"
            />
            <SuggestAnEditLink />
        </ContainerGeneric>
    </div>
</template>

<script>
import AttributeVsTag from '@shared/components/vs/ShAttributeVsTag.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';
import SuggestAnEditLink from '@/components/suggest-an-edit/SuggestAnEditLink.vue';

export default {
    name: 'ViewVs',
    components: {
        AttributeVsTag,
        ContainerGeneric,
        PageTitle,
        SuggestAnEditLink,
    },
    data () {
        return {
            attributeName: this.$route.params.attribute,
            tagName: this.$route.params.tag,
        };
    },
};
</script>
