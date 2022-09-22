<template>
    <category-sort-x :items="items">
        <template #default="{ typesSorted }">
            <ul class="list-unstyled">
                <template v-for="type in typesSorted">
                    <CategoryListType
                        v-if="type.items.length"
                        :key="type.title.kebab"
                        :type="type"
                    />
                </template>
            </ul>
        </template>
    </category-sort-x>
</template>

<script>
import CategoryListType from '@shared/components/category/ShCategoryListType.vue';
import CategorySortX from '@shared/components/renderless/ShCategorySortX.vue';

export default {
    name: 'ShCatgoryList',
    components: {
        CategoryListType,
        CategorySortX,
    },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
