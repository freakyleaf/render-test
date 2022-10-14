<template>
    <div class="loading mb-3">
        <IconArrowClockwise class="loading__icon" />
    </div>
</template>

<script>
import IconArrowClockwise from '@shared/components/icons/IconArrowClockwise.vue';

export default {
    name: 'ShLoading',
    components: {
        IconArrowClockwise,
    },
};
</script>

<style scoped>
@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

.loading__icon {
    display: block;
    width: 8rem;
    height: 8rem;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.15;
    animation: rotate 3s linear infinite;
}
</style>
