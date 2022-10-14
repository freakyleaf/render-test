<template>
    <BoxGeneric class="mb-3">
        <label
            class="form-label"
            for="input-filter-by-name"
        >
            Filter {{ pluralizeCategory }} by name
            <FormHelper>
                Start typing {{ indefiniteArticleSwitch(categoryValue) }} {{ categoryValue }} name to begin filtering the list below
            </FormHelper>
        </label>
        <input
            id="input-filter-by-name"
            ref="inputFilterByName"
            v-model.trim="filter"
            class="form-control form-control-lg"
            spellcheck="false"
            type="text"
        >
    </BoxGeneric>
</template>
<script>
import indefiniteArticleSwitch from '@shared/mixins/indefiniteArticleSwitch';
import pluralize from '@shared/mixins/pluralize';

import BoxGeneric from '@shared/components/layout/ShBoxGeneric.vue';
import FormHelper from '@shared/components/form/ShFormHelper.vue';

export default {
    name: 'ShInputFilterCategoryItems',
    components: {
        BoxGeneric,
        FormHelper,
    },
    mixins: [
        indefiniteArticleSwitch,
        pluralize,
    ],
    props: {
        category: {
            type: String,
            default: '',
            validator: (value) => {
                return [ '', 'attribute', 'tag' ].includes(value);
            },
        },
        value: {
            type: String,
            default: '',
        },
    },
    computed: {
        categoryValue () {
            return this.category ? this.category : this.$route.meta.category;
        },
        filter: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            },
        },
        pluralizeCategory () {
            return this.pluralize(this.categoryValue);
        },
    },
};
</script>
