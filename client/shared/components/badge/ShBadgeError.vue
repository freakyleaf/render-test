<template>
    <span class="badge bg-danger">
        <span class="badge__text">
            Nope!
        </span>
        <IconEmojiFrown class="badge__icon" />
    </span>
</template>

<script>
import IconEmojiFrown from '@shared/components/icons/IconEmojiFrown.vue';

export default {
    name: 'ShBadgeError',
    components: {
        IconEmojiFrown,
    },
};
</script>
