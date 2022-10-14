<template>
    <ContainerGeneric>
        <h1 :class="classes">
            <slot />
        </h1>
    </ContainerGeneric>
</template>

<script>
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';

export default {
    name: 'PageTitle',
    components: {
        ContainerGeneric,
    },
    props: {
        visuallyHidden: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes () {
            const classes = [ 'mb-3' ];
            if (this.visuallyHidden) classes.push('visually-hidden');
            return classes.join(' ');
        },
    },
};
</script>
