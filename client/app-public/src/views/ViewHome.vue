<template>
    <div class="view-home">
        <h1 class="visually-hidden">
            Home
        </h1>
        <div class="container">
            <div class="row">
                <h2>Quick select</h2>
            </div>
            <div class="row mb-3">
                <form class="quick-select-form">
                    <div class="row gy-3 p-3">
                        <div class="col col-12 col-lg-6">
                            <span class="fs-5">
                                Can I use the attribute:
                            </span>
                            <label
                                for="quick-select-attribute"
                                class="form-label visually-hidden"
                            >
                                Attribute
                            </label>
                            <category-sort-x
                                category="attribute"
                                :items="attributes"
                            >
                                <template #default="{ typesSorted }">
                                    <select
                                        id="quick-select-attribute"
                                        ref="quickSelectAttribute"
                                        v-model="quickSelect.attribute"
                                        class="form-select form-select-lg"
                                    >
                                        <template v-for="type in typesSorted">
                                            <QuickSelectOptionGroup
                                                v-if="type.items.length"
                                                :key="type.title.kebab"
                                                :type="type"
                                            />
                                        </template>
                                    </select>
                                </template>
                            </category-sort-x>
                        </div>
                        <div class="col col-12 col-lg-6">
                            <span class="fs-5">
                                with the tag:
                            </span>
                            <label
                                for="quick-select-tag"
                                class="form-label visually-hidden"
                            >
                                Tag
                            </label>
                            <category-sort-x
                                category="tag"
                                :items="tags"
                            >
                                <template #default="{ typesSorted }">
                                    <select
                                        id="quick-select-tag"
                                        ref="quickSelectTag"
                                        v-model="quickSelect.tag"
                                        class="form-select form-select-lg"
                                    >
                                        <template v-for="type in typesSorted">
                                            <QuickSelectOptionGroup
                                                v-if="type.items.length"
                                                :key="type.title.kebab"
                                                :type="type"
                                            />
                                        </template>
                                    </select>
                                </template>
                            </category-sort-x>
                        </div>
                        <div class="col col-12">
                            <button
                                class="quick-select-button btn btn-lg btn-primary"
                                @click.prevent="quickSelectResultsShow"
                            >
                                Search
                            </button>
                            <span class="d-block text-center py-2">
                                or
                            </span>
                            <button
                                class="quick-select-button btn btn-primary btn-lg"
                                @click.prevent="selectRandomCombination"
                            >
                                Select a random combination instead
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <QuickSelectResults
                v-if="quickSelectResultsVisible"
                id="quickSelectResults"
                ref="quickSelectResults"
                :results="quickSelectResults"
                @tryAnotherSearch="tryAnotherSearch"
            />
            <div class="row">
                <h2>Prefer to view tabular data instead?</h2>
            </div>
            <div class="row">
                <category-sort-x
                    category="attribute"
                    :items="attributes"
                >
                    <template #default="{ typesSorted }">
                        <div>
                            <template v-for="type in typesSorted">
                                <HomeTable
                                    v-if="type.items.length"
                                    :key="type.title.kebab"
                                    :attributes="type.items"
                                    :tags="tags"
                                    :title="`${type.title.pretty} Attributes`"
                                />
                            </template>
                        </div>
                    </template>
                </category-sort-x>
                <!-- <HomeTable
                    :attributes="attributesGlobal"
                    :tags="tags"
                />
                <h3>Regular Attributes</h3>
                <HomeTable
                    :attributes="attributesRegular"
                    :tags="tags"
                />
                <h3>ARIA Regular Attributes</h3>
                <HomeTable
                    :attributes="attributesAriaRegular"
                    :tags="tags"
                /> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import attributeTypes from '@shared/constants/attributeTypes';
// import tagTypes from '@shared/constants/tagTypes';

import badgeStatus from '@shared/mixins/badgeStatus';

import CategorySortX from '@shared/components/renderless/ShCategorySortX.vue';
import HomeTable from '@/components/HomeTable.vue';
import QuickSelectOptionGroup from '@/components/quick-select/QuickSelectOptionGroup.vue';
import QuickSelectResults from '@/components/quick-select/QuickSelectResults.vue';

export default {
    name: 'ViewHome',
    components: {
        CategorySortX,
        HomeTable,
        QuickSelectOptionGroup,
        QuickSelectResults,
    },
    mixins: [
        badgeStatus,
    ],
    data () {
        return {
            quickSelect: {
                attribute: '',
                tag: '',
            },
            quickSelectResults: {},
            quickSelectResultsVisible: false,
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
            loading: state => state.loading.loading,
            tags: state => state.tag.all,
        }),
        quickSelectDefaultValues () {
            return {
                attribute: this.attributes.filter(({ type }) => type === attributeTypes[0].kebab)[0].name,
                // tag: this.tags.filter(({ type }) => type === tagTypes[0].kebab)[0].name,
                tag: 'address', // Temporary
            };
        },
    },
    mounted () {
        this.quickSelect = this.quickSelectDefaultValues;
    },
    methods: {
        ...mapMutations({
            setError: 'error/setError',
            setLoading: 'loading/setLoading',
        }),
        selectRandomCombination () {
            this.quickSelect.attribute = this.orderedByNameAttributes[Math.floor(Math.random() * this.orderedByNameAttributes.length)].name;
            this.quickSelect.tag = this.orderedByNameTags[Math.floor(Math.random() * this.orderedByNameTags.length)].name;
            this.quickSelectResultsShow();
        },
        async tryAnotherSearch () {
            this.quickSelectResultsVisible = false;
            this.quickSelectResults = {};
            // Wait for `quickSelectAttribute` to appear in the dom
            await this.$nextTick();
            await this.$nextTick();
            this.$refs.quickSelectAttribute.focus();
        },
        async quickSelectResultsFocus () {
            // Wait for `quickSelectResults` to appear in the dom
            await this.$nextTick();
            await this.$nextTick();
            this.$refs.quickSelectResults.$el.focus();
        },
        quickSelectResultsShow () {
            const attribute = this.attributes.find(({ name }) => name === this.quickSelect.attribute);
            const tag = this.tags.find(({ name }) => name === this.quickSelect.tag);

            this.quickSelectResults = {
                attribute: attribute,
                status: this.badgeStatus(attribute, tag),
                tag: tag,
                tagAttribute: tag.attributes.find(({ name }) => name === attribute.name),
            };
            this.quickSelectResultsVisible = true,
            this.quickSelectResultsFocus();
        },
    },
};
</script>

<style scoped>
.quick-select-form {
    background-color: var(--bs-gray-200);
}

.quick-select-button {
    width: 100%;
}
</style>
