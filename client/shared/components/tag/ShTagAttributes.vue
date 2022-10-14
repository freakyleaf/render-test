<template>
    <div>
        <h3>Tag Attributes</h3>
        <InputFilterCategoryItems
            category="attribute"
            :value="filter"
            @input="(value) => filterByName(value, attributes)"
        />
        <category-sort-x
            category="attribute"
            :items="itemsLocal"
        >
            <template #default="{ typesSorted }">
                <ul class="list-unstyled">
                    <template v-for="type in typesSorted">
                        <TagTableAttributes
                            v-if="type.items.length"
                            :key="type.title.kebab"
                            :attributes="type.items"
                            :tag="itemLocal"
                            :title="type.title.pretty"
                        />
                    </template>
                </ul>
            </template>
        </category-sort-x>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import filterByName from '@shared/mixins/filterByName';

import CategorySortX from '@shared/components/renderless/ShCategorySortX.vue';
import InputFilterCategoryItems from '@shared/components/form/ShInputFilterCategoryItems.vue';
import TagTableAttributes from '@shared/components/tag/ShTagAttributesTable.vue';

export default {
    name: 'ShTagAttributes',
    components: {
        CategorySortX,
        InputFilterCategoryItems,
        TagTableAttributes,
    },
    mixins: [
        filterByName,
    ],
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    data () {
        return {
            filter: '',
            itemLocal: structuredClone(this.item),
            itemsLocal: [],
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
        }),
    },
    created () {
        // Add any `attributes[attribute].contentPatterns` into `itemLocal.attributes[attribute].contentPatterns`
        this.itemLocal.attributes.forEach(itemLocalAttribute => {
            const attributeIndex = this.attributes.findIndex(({ name }) => name === itemLocalAttribute.name);

            if (attributeIndex === -1) {
                this.setError(`Cannot find attribute '${itemLocalAttribute.name}' in tag '${this.itemLocal.name}'`);
            }

            if (this.attributes[attributeIndex].contentPatterns.length) {
                itemLocalAttribute.contentPatterns = this.attributes[attributeIndex].contentPatterns;

            } else {
                itemLocalAttribute.contentPatterns = [];
            }
        });
        this.itemsLocal = this.attributes;
    },
    methods: {
        ...mapMutations({
            setError: 'error/setError',
        }),
    },
};
</script>
