<template>
    <div class="mb-3">
        <label class="form-label">
            Value Types <span class="text-danger">(required)</span>
        </label>
        <div
            v-for="(valueType, valueTypeIndex) in v.$model"
            :key="valueType.kebab"
            class="form-check form-switch"
        >
            <input
                :id="`value-type-${valueTypeIndex}`"
                :checked="valueType.checked"
                class="form-check-input"
                role="switch"
                type="checkbox"
                @input="$emit('input', {
                    checked: $event.target.checked,
                    kebab: valueType.kebab,
                    pretty: valueType.pretty,
                })"
            >
            <label
                class="form-check-label"
                :for="`value-type-${valueTypeIndex}`"
            >
                <!-- eslint-disable vue/no-v-html -->
                <div
                    class="markdown"
                    v-html="renderMarkdown(valueType.pretty, true)"
                />
                <!-- eslint-enable vue/no-v-html -->
            </label>
        </div>
    </div>
</template>

<script>
import renderMarkdown from '@shared/mixins/renderMarkdown';

export default {
    name: 'InputValueTypes',
    mixins: [
        renderMarkdown,
    ],
    props: {
        v: {
            type: Object,
            required: true,
        },
    },
    computed: {
        valueTypes: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>
