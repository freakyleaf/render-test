<template>
    <div class="form-helper">
        <span class="visually-hidden">Hint:</span>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'FormHelper',
};
</script>

<style scoped>
.form-helper {
    color: var(--bs-gray-700);
}
</style>
