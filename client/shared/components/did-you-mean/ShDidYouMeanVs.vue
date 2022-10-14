<template>
    <div>
        <p><code>{{ itemName }}</code> is not a valid {{ itemCategory }}.</p>
        <template v-if="suggestedItem !== null">
            <p>
                Did you mean <code>{{ suggestedItem }}</code>? If so try
                <router-link
                    v-if="itemCategory === 'attribute'"
                    :to="`/${UrlFragmentDedicatedPage}/${suggestedItem}/${itemCounterpartName}`"
                >
                    {{ suggestedItem }} + {{ itemCounterpartName }}
                </router-link>
                <router-link
                    v-if="itemCategory === 'tag'"
                    :to="`/${UrlFragmentDedicatedPage}/${itemCounterpartName}/${suggestedItem}`"
                >
                    {{ itemCounterpartName }} + {{ suggestedItem }}
                </router-link>
                .
            </p>
        </template>
        <template v-else>
            <p>Try one of these:</p>
            <category-sort-x
                :category="itemCategory"
                :items="itemsLocal"
            >
                <template #default="{ typesSorted }">
                    <ul class="list-unstyled">
                        <template v-for="type in typesSorted">
                            <li
                                v-if="type.items.length"
                                :key="type.title.kebab"
                                class="list-item"
                            >
                                <h3 class="h5">
                                    {{ type.title.pretty }} {{ capitalize(pluralizeCategory) }}
                                </h3>
                                <table class="mb-3">
                                    <tr>
                                        <th class="col-2">
                                            {{ capitalizeCategory }}
                                        </th>
                                        <th>
                                            Link to page
                                        </th>
                                    </tr>
                                    <tr
                                        v-for="item in type.items"
                                        :key="item.name"
                                    >
                                        <td>
                                            <code>{{ item.name }}</code>
                                        </td>
                                        <td>
                                            <router-link
                                                v-if="isValidAttribute"
                                                :to="`/${UrlFragmentDedicatedPage}/${itemCounterpartName}/${item.name}`"
                                            >
                                                '{{ itemCounterpartName }}' + '{{ item.name }}'
                                            </router-link>
                                            <router-link
                                                v-else-if="isValidTag"
                                                :to="`/${UrlFragmentDedicatedPage}/${item.name}/${itemCounterpartName}`"
                                            >
                                                '{{ item.name }}' + '{{ itemCounterpartName }}'
                                            </router-link>
                                        </td>
                                    </tr>
                                </table>
                            </li>
                        </template>
                    </ul>
                </template>
            </category-sort-x>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import UrlFragmentDedicatedPage from '@shared/constants/urlFragmentDedicatedPage';

import capitalize from '@shared/mixins/capitalize';
import pluralize from '@shared/mixins/pluralize';

import CategorySortX from '@shared/components/renderless/ShCategorySortX.vue';

export default {
    name: 'ShAttributeVsTagInvalid',
    components: {
        CategorySortX,
    },
    mixins: [
        capitalize,
        pluralize,
    ],
    props: {
        isValidAttribute: {
            type: Boolean,
            default: false,
            required: true,
        },
        isValidTag: {
            type: Boolean,
            default: false,
            required: true,
        },
        itemCategory: {
            type: String,
            default: '',
            validator: (value) => {
                return [ 'attribute', 'tag' ].includes(value);
            },
        },
        itemCounterpartName: {
            type: String,
            default: '',
            required: true,
        },
        itemName: {
            type: String,
            default: '',
            required: true,
        },
        suggestedItem: {
            default: '',
            required: true,
            validator: (value) => {
                return typeof value === 'string' || value === null;
            },
        },
    },
    data () {
        return {
            itemsLocal: [],
            UrlFragmentDedicatedPage: UrlFragmentDedicatedPage,
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
            tags: state => state.tag.all,
        }),
        capitalizeCategory () {
            return this.capitalize(this.itemCategory);
        },
        pluralizeCategory () {
            return this.pluralize(this.itemCategory);
        },
    },
    created () {
        this.itemsLocal = this[`${this.pluralizeCategory}`];
    },
};
</script>
