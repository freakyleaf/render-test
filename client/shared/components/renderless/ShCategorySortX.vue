<script>
import attributeTypes from '@shared/constants/attributeTypes';
import tagTypes from '@shared/constants/tagTypes';

import sortByName from '@shared/mixins/sortByName';

export default {
    name: 'ShCategorySortX',
    mixins: [
        sortByName,
    ],
    props: {
        category: {
            type: String,
            default: '',
        },
        items: {
            type: Array,
            default: () => [],
            required: true,
        },
    },
    data () {
        return {
            types: {
                attribute: attributeTypes,
                tag: tagTypes,
            },
        };
    },
    computed: {
        categoryValue () {
            return this.category ? this.category : this.$route.meta.category;
        },
        categorySortByType () {
            return this.types[this.categoryValue].map(type => {
                return {
                    items: this.itemsFilteredAndSorted(type),
                    title: {
                        kebab: type.kebab,
                        pretty: type.pretty,
                    },
                };
            });
        },
    },
    methods: {
        itemsFilteredAndSorted (type) {
            return this.sortByName(this.items.filter(item => item.type === type.kebab));
        },
    },
    render () {
        return this.$scopedSlots.default({
            typesSorted: this.categorySortByType,
        });
    },
};
</script>
