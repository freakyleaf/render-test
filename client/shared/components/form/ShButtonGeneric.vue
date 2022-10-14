<template>
    <button
        :class="classes"
        @click.prevent="$emit('click')"
    >
        {{ text }}
    </button>
</template>
<script>
export default {
    name: 'ShButtonGeneric',
    props: {
        size: {
            type: String,
            default: '',
            validator: (value) => {
                return [ '', 'lg', 'sm' ].includes(value);
            },
        },
        text: {
            type: String,
            default: '',
            required: true,
        },
        theme: {
            type: String,
            default: 'primary',
            validator: (value) => {
                return [ 'dark', 'primary', 'secondary' ].includes(value);
            },
        },
    },
    computed: {
        classes () {
            const classes = [ 'btn', `btn-${this.theme}` ];
            if (this.size) classes.push(`btn-${this.size}`);
            return classes.join(' ');
        },
    },
};
</script>
