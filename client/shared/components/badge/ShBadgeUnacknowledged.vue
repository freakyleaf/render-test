<template>
    <span class="badge bg-dark">
        <span class="badge__text">
            Unacknowledged
        </span>
        <IconEmojiExpressionless class="badge__icon" />
    </span>
</template>

<script>
import IconEmojiExpressionless from '@shared/icons/IconEmojiExpressionless.vue';

export default {
    name: 'ShBadgeUnacknowledged',
    components: {
        IconEmojiExpressionless,
    },
};
</script>
