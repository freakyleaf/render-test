<template>
    <div
        class="toolbar-sticky"
        role="toolbar"
    >
        <ContainerGeneric>
            <slot />
        </ContainerGeneric>
    </div>
</template>

<script>
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';

export default {
    name: 'ToolbarSticky',
    components: {
        ContainerGeneric,
    },
};
</script>

<style scoped>
.toolbar-sticky {
    z-index: 1;
    position: sticky;
    top: 77px;
    margin-top: -1rem;
    padding: 1rem 0;
    background-color: var(--bs-white);
    border-bottom: 1px solid var(--bs-border-color);
}
</style>
