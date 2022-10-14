<template>
    <div class="mb-3">
        <div class="form-check form-switch">
            <input
                id="opinionated"
                :checked="checked"
                class="form-check-input"
                role="switch"
                type="checkbox"
                @input="$emit('input', $event.target.checked)"
            >
            <label
                class="form-check-label"
                for="opinionated"
            >
                Opinionated
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputOpinionated',
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
