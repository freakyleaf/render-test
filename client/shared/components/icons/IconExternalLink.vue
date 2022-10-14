<template>
    <span class="icon-external-link">
        <span class="visually-hidden">Information: Link opens in new tab.</span>
        <IconBoxArrowUpRight class="icon-external-link__icon" />
    </span>
</template>

<script>
import IconBoxArrowUpRight from '@shared/components/icons/IconBoxArrowUpRight.vue';

export default {
    name: 'IconExternalLink',
    components: {
        IconBoxArrowUpRight,
    },
};
</script>

<style scoped>
.icon-external-link {
    display: inline-block;
    margin-left: 0.25em;
    color: var(--bs-gray);
}

.icon-external-link__icon {
    width: 0.85rem;
    height: 0.85rem;
    transform: translateY(-0.15em);
}
</style>
