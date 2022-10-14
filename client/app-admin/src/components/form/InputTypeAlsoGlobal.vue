<template>
    <div class="mb-3">
        <div class="form-check form-switch">
            <input
                id="type-also-global"
                :checked="checked"
                class="form-check-input"
                role="switch"
                type="checkbox"
                @input="$emit('input', $event.target.checked)"
            >
            <label
                for="type-also-global"
                class="form-check-label"
            >
                ARIA Regular attribute is also ARIA Global attribute
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputTypeAlsoGlobal',
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
