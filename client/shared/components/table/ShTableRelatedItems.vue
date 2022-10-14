<template>
    <table class="table mb-0">
        <thead>
            <tr class="table-accent-alt">
                <th scope="col">
                    {{ capitalizeCategory }}
                </th>
                <th scope="col">
                    Link to page
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="item in relatedItems"
                :key="item"
            >
                <td>
                    <code>{{ item }}</code>
                </td>
                <td>
                    <router-link :to="`/${pluralizeCategory}/${item}`">
                        {{ `/${pluralizeCategory}/${item}` }}
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import capitalize from '@shared/mixins/capitalize';
import pluralize from '@shared/mixins/pluralize';

export default {
    name: 'ShTableRelatedItems',
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
        relatedItems: {
            type: Array,
            default: () => [],
            required: true,
        },
    },
    computed: {
        capitalizeCategory () {
            return this.capitalize(this.category);
        },
        pluralizeCategory () {
            return this.pluralize(this.category);
        },
    },
};
</script>
