<template>
    <li class="list-item">
        <h3>{{ type.title.pretty }}</h3>
        <ul class="list-group">
            <template v-for="item in type.items">
                <CategoryListTypeItem
                    :key="item.name"
                    :item="item"
                />
            </template>
        </ul>
    </li>
</template>

<script>
import CategoryListTypeItem from '@shared/components/category/ShCategoryListTypeItem.vue';

export default {
    name: 'ShCategoryListType',
    components: {
        CategoryListTypeItem,
    },
    props: {
        type: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
