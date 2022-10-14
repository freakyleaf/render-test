<template>
    <div
        :class="`alert alert-${theme}`"
        role="alert"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ToastNotification',
    props: {
        theme: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
