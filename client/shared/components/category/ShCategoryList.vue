<template>
    <div>
        <InputFilterCategoryItems
            ref="InputFilterCategoryItems"
            :value="filter"
            @input="(value) => filterByName(value, items)"
        />
        <category-sort-x :items="itemsLocal">
            <template #default="{ typesSorted }">
                <ul class="category-list list-unstyled mb-0">
                    <template v-for="type in typesSorted">
                        <CategoryListType
                            v-if="type.items.length"
                            :key="type.title.kebab"
                            :is-admin-app="isAdminApp"
                            :type="type"
                        />
                    </template>
                </ul>
            </template>
        </category-sort-x>
    </div>
</template>

<script>
import filterByName from '@shared/mixins/filterByName';

import CategoryListType from '@shared/components/category/ShCategoryListType.vue';
import CategorySortX from '@shared/components/renderless/ShCategorySortX.vue';
import InputFilterCategoryItems from '@shared/components/form/ShInputFilterCategoryItems.vue';

export default {
    name: 'ShCatgoryList',
    components: {
        CategoryListType,
        CategorySortX,
        InputFilterCategoryItems,
    },
    mixins: [
        filterByName,
    ],
    props: {
        isAdminApp: {
            type: Boolean,
            default: false,
        },
        items: {
            type: Array,
            default: () => [],
        },
    },
    data () {
        return {
            filter: '',
            itemsLocal: this.items,
        };
    },
};
</script>

<style>
.category-list > li:last-of-type > ul > li:last-of-type {
    margin-bottom: 0 !important;
}
</style>
