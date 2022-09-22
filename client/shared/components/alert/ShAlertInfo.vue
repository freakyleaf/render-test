<template>
    <div
        class="alert alert-info"
        role="alert"
    >
        {{ infoMessage }}
    </div>
</template>

<script>
export default {
    name: 'ShAlertError',
    props: {
        infoMessage: {
            type: [
                String,
            ],
            default: '',
        },
    },
};
</script>
