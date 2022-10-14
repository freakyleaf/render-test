<template>
    <optgroup
        :label="`${type.title.pretty} ${capitalize(pluralize(category))}`"
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
import capitalize from '@shared/mixins/capitalize';
import pluralize from '@shared/mixins/pluralize';

export default {
    name: 'QuickSelectOptionGroup',
    mixins: [
        capitalize,
        pluralize,
    ],
    props: {
        category: {
            type: String,
            default: '',
            required: true,
            validator: (value) => {
                return [ 'attribute', 'tag' ].includes(value);
            },
        },
        type: {
            type: Object,
            default: () => {},
            required: true,
        },
    },
};
</script>
