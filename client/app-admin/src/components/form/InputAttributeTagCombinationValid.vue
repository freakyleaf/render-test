<template>
    <div class="form-check form-switch">
        <input
            :id="`${attributeName}-valid`"
            :checked="checked"
            class="form-check-input"
            role="switch"
            type="checkbox"
            @input="$emit('attributeTagCombinationValid', $event.target.checked)"
        >
        <label
            class="form-check-label"
            :for="`${attributeName}-valid`"
        >
            Attribute <code>{{ attributeName }}</code> and tag <code>{{ tagName.length ? tagName : '[enter a tag name]' }}</code> is a valid combination
        </label>
    </div>
</template>

<script>
export default {
    name: 'InputAttributeTagCombinationValid',
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
