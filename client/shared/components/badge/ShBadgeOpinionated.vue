<template>
    <span class="badge bg-warning">
        <span class="badge__text">
            Opinionated!
        </span>
        <IconWarning class="badge__icon" />
    </span>
</template>

<script>
import IconWarning from '@shared/icons/IconWarning.vue';

export default {
    name: 'ShBadgeOpinionated',
    components: {
        IconWarning,
    },
};
</script>
