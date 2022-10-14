<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ShBoxGeneric',
    computed: {
        classes () {
            const classes = [ 'box-generic' ];
            return classes.join(' ');
        },
    },
};
</script>

<style scoped>
.box-generic {
    padding: 1rem;
    background-color: var(--bs-light);
    border: 1px solid var(--bs-border-color);
}
</style>
