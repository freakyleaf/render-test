<template>
    <span class="badge bg-success">
        <span class="badge__text">
            Yup!
        </span>
        <IconEmojiSmile class="badge__icon" />
    </span>
</template>

<script>
import IconEmojiSmile from '@shared/icons/IconEmojiSmile.vue';

export default {
    name: 'ShBadgeSuccess',
    components: {
        IconEmojiSmile,
    },
};
</script>
