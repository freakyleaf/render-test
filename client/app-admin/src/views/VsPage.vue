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
        </ContainerGeneric>
    </div>
</template>

<script>
import AttributeVsTag from '@shared/components/vs/ShAttributeVsTag.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';

export default {
    name: 'ViewVs',
    components: {
        AttributeVsTag,
        ContainerGeneric,
        PageTitle,
    },
    data () {
        return {
            attributeName: this.$route.params.attribute,
            tagName: this.$route.params.tag,
        };
    },
};
</script>
