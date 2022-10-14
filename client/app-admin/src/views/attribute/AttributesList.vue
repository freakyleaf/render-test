<template>
    <div>
        <PageTitle>
            Attributes
        </PageTitle>
        <ContainerGeneric>
            <CategoryList
                ref="CategoryList"
                :is-admin-app="true"
                :items="items"
            />
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import CategoryList from '@shared/components/category/ShCategoryList.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';

export default {
    name: 'AttributesList',
    components: {
        CategoryList,
        ContainerGeneric,
        PageTitle,
    },
    computed: {
        ...mapState({
            items: state => state.attribute.all,
        }),
    },
    mounted () {
        this.$refs.CategoryList.$refs.InputFilterCategoryItems.$refs.inputFilterByName.focus();
    },
};
</script>
