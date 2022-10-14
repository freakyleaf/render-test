<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ContainerGeneric',
    props: {
        topSpacing: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes () {
            const classes = [ 'container' ];
            if (this.topSpacing) classes.push('container--top-spacing');
            return classes.join(' ');
        },
    },
};
</script>

<style scoped>
.container--top-spacing {
    padding-top: 1rem;
}
</style>
