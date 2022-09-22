<template>
    <div class="view-attributes">
        <h1 class="mb-3">
            View Tag: <code>{{ $route.params.name }}</code>
        </h1>
        <TagsView />
    </div>
</template>

<script>
import TagsView from '@/components/tag/TagsView.vue';

export default {
    name: 'ViewTagsView',
    components: {
        TagsView,
    },
};
</script>
