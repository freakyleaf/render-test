<template>
    <div class="view-attributes">
        <h1 class="mb-3">
            View Attribute: <code>{{ $route.params.name }}</code>
        </h1>
        <AttributesView />
    </div>
</template>

<script>
import AttributesView from '@/components/attribute/AttributesView.vue';

export default {
    name: 'ViewAttributesView',
    components: {
        AttributesView,
    },
};
</script>
