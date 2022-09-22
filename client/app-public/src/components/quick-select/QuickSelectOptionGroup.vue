<template>
    <optgroup
        :label="`${type.title.pretty} Attributes`"
    >
        <option
            v-for="item in type.items"
            :key="item.name"
            :value="item.name"
        >
            {{ item.name }}
        </option>
    </optgroup>
</template>

<script>
export default {
    name: 'QuickSelectOptionGroup',
    props: {
        type: {
            type: Object,
            default: () => {},
            required: true,
        },
    },
};
</script>
