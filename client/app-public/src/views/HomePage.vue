<template>
    <div class="view-home">
        <PageTitle :visually-hidden="true">
            Home
        </PageTitle>
        <ContainerGeneric>
            <h2 class="mb-3 pb-3">
                Quick Select
            </h2>
            <div class="mb-3">
                <form class="quick-select-form">
                    <div class="row gy-3 p-3 pt-0">
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
                                        v-model="quickSelectInputAttribute"
                                        class="form-select form-select-lg"
                                        @click="quickSelectResultsInlineHide"
                                    >
                                        <template v-for="type in typesSorted">
                                            <QuickSelectOptionGroup
                                                v-if="type.items.length"
                                                :key="type.title.kebab"
                                                category="attribute"
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
                                        v-model="quickSelectInputTag"
                                        class="form-select form-select-lg"
                                        @click="quickSelectResultsInlineHide"
                                    >
                                        <template v-for="type in typesSorted">
                                            <QuickSelectOptionGroup
                                                v-if="type.items.length"
                                                :key="type.title.kebab"
                                                category="tag"
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
                                @click.prevent="quickSelectResultsInlineShow"
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
            <VsResults
                v-if="quickSelectResultsInlineVisible"
                id="quickSelectResults"
                ref="quickSelectResults"
                :attribute="quickSelect.attribute"
                :tag="quickSelect.tag"
            >
                <template #footer>
                    <button
                        class="btn btn-primary"
                        @click.prevent="tryAnotherSearch"
                    >
                        Try another Search
                    </button>
                </template>
            </VsResults>
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
                                    @tableItemClick="tableClickItem"
                                />
                            </template>
                        </div>
                    </template>
                </category-sort-x>
            </div>
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

import attributeTypes from '@shared/constants/attributeTypes';
// import tagTypes from '@shared/constants/tagTypes';
import urlFragmentQuickSearch from '@shared/constants/urlFragmentQuickSearch';

import CategorySortX from '@shared/components/renderless/ShCategorySortX.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import HomeTable from '@/components/HomeTable.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';
import QuickSelectOptionGroup from '@/components/quick-select/QuickSelectOptionGroup.vue';
import VsResults from '@shared/components/vs/ShVsResults.vue';

export default {
    name: 'ViewHome',
    components: {
        CategorySortX,
        ContainerGeneric,
        HomeTable,
        PageTitle,
        QuickSelectOptionGroup,
        VsResults,
    },
    data () {
        return {
            quickSelect: {
                attribute: '',
                tag: '',
            },
            quickSelectResultsInlineVisible: false,
            urlFragmentQuickSearch: urlFragmentQuickSearch,
        };
    },
    computed: {
        ...mapGetters({
            getAttributeByName: 'attribute/getAttributeByName',
            getTagByName: 'tag/getTagByName',
        }),
        ...mapState({
            attributes: state => state.attribute.all,
            loading: state => state.loading.loading,
            tags: state => state.tag.all,
        }),
        quickSelectDefaultValues () {
            return {
                attribute: this.attributes.filter(({ type }) => type === attributeTypes[0].kebab)[0],
                // tag: this.tags.filter(({ type }) => type === tagTypes[0].kebab)[0],
                // Temp start
                tag: this.tags.filter(({ name }) => name === 'address')[0],
                // Temp end
            };
        },
        quickSelectInputAttribute: {
            get () {
                return this.quickSelect.attribute.name;
            },
            set (value) {
                this.quickSelect.attribute = this.getAttributeByName(value);
            },
        },
        quickSelectInputTag: {
            get () {
                return this.quickSelect.tag.name;
            },
            set (value) {
                this.quickSelect.tag = this.getTagByName(value);
            },
        },
    },
    async mounted () {
        if (this.$route.params.attribute && this.$route.params.tag) {
            this.quickSelect = {
                attribute: this.getAttributeByName(this.$route.params.attribute),
                tag: this.getTagByName(this.$route.params.tag),
            };
            await this.$nextTick();
            await this.$nextTick();
            this.quickSelectResultsInlineShow();
        } else {
            this.quickSelect = this.quickSelectDefaultValues;
        }
    },
    methods: {
        ...mapActions({
            openModal: 'modal/openModal',
        }),
        ...mapMutations({
            setError: 'error/setError',
            setLoading: 'loading/setLoading',
        }),
        selectRandomCombination () {
            this.quickSelect = {
                attribute: this.attributes[Math.floor(Math.random() * this.attributes.length)],
                tag: this.tags[Math.floor(Math.random() * this.tags.length)],
            };
            this.quickSelectResultsInlineShow();
        },
        async tryAnotherSearch () {
            this.quickSelectResultsInlineVisible = false;
            // Wait for `quickSelectAttribute` to appear in the dom
            await this.$nextTick();
            await this.$nextTick();
            this.$refs.quickSelectAttribute.focus();
        },
        // async quickSelectResultsFocus () {
        //     // Wait for `quickSelectResults` to appear in the dom
        //     await this.$nextTick();
        //     await this.$nextTick();
        //     this.$refs.quickSelectResults.$el.focus();
        // },
        quickSelectResultsInlineHide () {
            this.quickSelectResultsInlineVisible = false;
        },
        quickSelectResultsInlineShow () {
            this.quickSelectResultsInlineVisible = true;

            if (this.$route.params.attribute !== this.quickSelect.attribute.name && this.$route.params.tag !== this.quickSelect.tag.name) {
                // this.quickSelectResultsFocus();
                this.updateUrl();
            }
        },
        quickSelectResultsModalShow () {
            // Hiding inline results feels better but leads to weird reflow as the modal opens
            // this.quickSelectResultsInlineVisible = false;

            this.openModal({
                component: 'QuickSelectResultsModal',
                meta: {
                    attribute: this.quickSelect.attribute,
                    tag: this.quickSelect.tag,
                },
            });

            if (this.$route.params.attribute !== this.quickSelect.attribute.name && this.$route.params.tag !== this.quickSelect.tag.name) {
                // this.quickSelectResultsFocus();
                this.updateUrl();
            }
        },
        async tableClickItem ({ attribute, tag }) {
            this.quickSelect = {
                attribute,
                tag,
            };
            await this.$nextTick();
            await this.$nextTick();
            this.quickSelectResultsModalShow();
        },
        updateUrl () {
            this.$router.push(`/${this.urlFragmentQuickSearch}/${this.quickSelect.attribute.name}/${this.quickSelect.tag.name}`);
        },
    },
};
</script>

<style scoped>
.quick-select-form {
    background-color: var(--cia-light);
}

.quick-select-button {
    width: 100%;
}
</style>
