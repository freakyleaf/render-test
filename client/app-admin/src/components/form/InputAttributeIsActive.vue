<template>
    <div class="form-check form-switch">
        <div class="d-flex justify-content-between">
            <div>
                <input
                    :id="`attribute-is-active-${name}`"
                    :checked="checked"
                    class="form-check-input"
                    role="switch"
                    type="checkbox"
                    @input="$emit('attributeIsActive', $event.target.checked)"
                >
                <label
                    class="form-check-label"
                    :for="`attribute-is-active-${name}`"
                >
                    {{ name }}
                </label>
            </div>
            <ButtonPlusMinus
                :is-plus="visible"
                text-minus="Show attribute"
                text-plus="Hide attribute"
                @click="$emit('attributeIsVisible')"
            />
        </div>
        <slot />
    </div>
</template>

<script>
import ButtonPlusMinus from '@/components/form/ButtonPlusMinus.vue';

export default {
    name: 'InputAttributeIsActive',
    components: {
        ButtonPlusMinus,
    },
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: '',
            required: true,
        },
        visible: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
