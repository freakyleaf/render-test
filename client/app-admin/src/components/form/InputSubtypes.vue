<template>
    <div class="mb-3">
        <label class="form-label">
            Subtypes
        </label>
        <div
            v-for="(subtype, subtypeIndex) in subtypes"
            :key="subtype.kebab"
            class="form-check form-switch"
        >
            <input
                :id="`subtype-${subtypeIndex}`"
                :checked="subtype.checked"
                class="form-check-input"
                role="switch"
                type="checkbox"
                @input="$emit('input', {
                    checked: $event.target.checked,
                    kebab: subtype.kebab,
                })"
            >
            <label
                class="form-check-label"
                :for="`subtype-${subtypeIndex}`"
            >
                {{ subtype.pretty }}
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputSubtypes',
    props: {
        subtypes: {
            type: Array,
            default: () => [],
            required: true,
        },
    },
};
</script>
