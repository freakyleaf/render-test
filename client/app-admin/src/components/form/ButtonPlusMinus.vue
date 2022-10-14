<template>
    <button
        class="button-plus-minus"
        @click.prevent="$emit('click')"
    >
        <template v-if="isPlus">
            <IconPlusCircle class="button-plus-minus__icon" />
            <span class="visually-hidden">{{ textPlus }}</span>
        </template>
        <template v-else>
            <IconDashCircle class="button-plus-minus__icon" />
            <span class="visually-hidden">{{ textMinus }}</span>
        </template>
    </button>
</template>

<script>
import IconDashCircle from '@shared/components/icons/IconDashCircle.vue';
import IconPlusCircle from '@shared/components/icons/IconPlusCircle.vue';

export default {
    name: 'ButtonPlusMinus',
    components: {
        IconDashCircle,
        IconPlusCircle,
    },
    props: {
        isPlus: {
            type: Boolean,
            default: false,
        },
        textMinus: {
            type: String,
            default: '',
            required: true,
        },
        textPlus: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>

<style scoped>
.button-plus-minus {
    /* flex-grow: 1;
    display: flex;
    justify-content: flex-end; */
    border: none;
    padding: 0;
    background-color: transparent;
}

.button-plus-minus__icon {
    width: 28px;
    height: 28px;
}
</style>
