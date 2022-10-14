<template>
    <div>
        <PageTitle>
            Tags
        </PageTitle>
        <ContainerGeneric>
            <CategoryList :items="items" />
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import CategoryList from '@shared/components/category/ShCategoryList.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';

export default {
    name: 'TagsList',
    components: {
        CategoryList,
        ContainerGeneric,
        PageTitle,
    },
    computed: {
        ...mapState({
            items: state => state.tag.all,
        }),
    },
};
</script>
