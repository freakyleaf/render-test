<template>
    <div class="form-check form-switch">
        <input
            :id="`${attributeName}-has-effect`"
            :checked="checked"
            class="form-check-input"
            role="switch"
            type="checkbox"
            @input="$emit('attributeHasEffect', $event.target.checked)"
        >
        <label
            class="form-check-label"
            :for="`${attributeName}-has-effect`"
        >
            Attribute <code>{{ attributeName }}</code> has an effect on tag <code>{{ tagName.length ? tagName : '[enter a tag name]' }}</code>
        </label>
    </div>
</template>

<script>
export default {
    name: 'InputAttributeHasEffect',
    props: {
        attributeName: {
            type: String,
            default: '',
            required: true,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        tagName: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
