<template>
    <div class="form-check form-switch">
        <input
            :id="`${attributeName}-notes-opinionated`"
            :checked="checked"
            class="form-check-input"
            role="switch"
            type="checkbox"
            @input="$emit('attributeNotesOpinionated', $event.target.checked)"
        >
        <label
            class="form-check-label"
            :for="`${attributeName}-notes-opinionated`"
        >
            Notes are opinionated
        </label>
    </div>
</template>

<script>
export default {
    name: 'InputAttributeNotesOpinionated',
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
        attributeName: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
