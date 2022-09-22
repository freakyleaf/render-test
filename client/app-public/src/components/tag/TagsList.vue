<template>
    <CategoryList :items="items" />
</template>

<script>
import { mapState } from 'vuex';

import CategoryList from '@shared/components/category/ShCategoryList.vue';

export default {
    name: 'TagsList',
    components: {
        CategoryList,
    },
    computed: {
        ...mapState({
            items: state => state.tag.all,
        }),
    },
};
</script>
