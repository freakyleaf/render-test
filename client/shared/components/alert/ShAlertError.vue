<template>
    <div
        class="alert alert-danger"
        role="alert"
    >
        {{ errorMessage }}
    </div>
</template>

<script>
export default {
    name: 'ShAlertError',
    props: {
        errorMessage: {
            type: [
                Error,
                String,
            ],
            default: '',
        },
    },
};
</script>
