<template>
    <li class="list-item">
        <h3>{{ type.title.pretty }}</h3>
        <ul class="list-group">
            <template v-for="item in type.items">
                <CategoryListTypeItemAdmin
                    v-if="isAdminApp"
                    :key="item.name"
                    class="mb-3"
                    :item="item"
                />
                <CategoryListTypeItemPublic
                    v-else
                    :key="item.name"
                    class="mb-3"
                    :item="item"
                />
            </template>
        </ul>
    </li>
</template>

<script>
import CategoryListTypeItemAdmin from '@shared/components/category/ShCategoryListTypeItemAdmin.vue';
import CategoryListTypeItemPublic from '@shared/components/category/ShCategoryListTypeItemPublic.vue';

export default {
    name: 'ShCategoryListType',
    components: {
        CategoryListTypeItemAdmin,
        CategoryListTypeItemPublic,
    },
    props: {
        isAdminApp: {
            type: Boolean,
            default: false,
        },
        type: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
