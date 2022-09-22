<template>
    <div class="view-tags-list">
        <h1 class="mb-3">
            Tags
        </h1>
        <TagsList />
    </div>
</template>

<script>
import TagsList from '@/components/tag/TagsList.vue';

export default {
    name: 'ViewTagsList',
    components: {
        TagsList,
    },
};
</script>
