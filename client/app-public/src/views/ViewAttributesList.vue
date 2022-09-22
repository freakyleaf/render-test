<template>
    <div class="view-attributes-list">
        <h1 class="mb-3">
            Attributes
        </h1>
        <AttributesList />
    </div>
</template>

<script>
import AttributesList from '@/components/attribute/AttributesList.vue';

export default {
    name: 'ViewAttributesList',
    components: {
        AttributesList,
    },
};
</script>
