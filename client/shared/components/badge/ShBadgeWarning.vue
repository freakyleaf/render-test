<template>
    <span class="badge bg-warning">
        <span class="badge__text">
            Meh!
        </span>
        <IconEmojiNeutral class="badge__icon" />
    </span>
</template>

<script>
import IconEmojiNeutral from '@shared/components/icons/IconEmojiNeutral.vue';

export default {
    name: 'ShBadgeWarning',
    components: {
        IconEmojiNeutral,
    },
};
</script>
