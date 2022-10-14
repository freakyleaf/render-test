<template>
    <li class="card">
        <div class="card-header">
            <h4 class="card-header__heading">
                <code>{{ item.name }}</code>
            </h4>
        </div>
        <div class="card-body">
            <div
                class="btn-toolbar"
                role="toolbar"
            >
                <div class="btn-group">
                    <button
                        class="btn btn-primary"
                        @click.prevent="itemView"
                    >
                        View {{ capitalizeCategory }}
                    </button>
                    <button
                        class="btn btn-primary"
                        @click.prevent="itemEdit"
                    >
                        Edit {{ capitalizeCategory }}
                    </button>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import router from '@/router';

import capitalize from '@shared/mixins/capitalize';
import pluralize from '@shared/mixins/pluralize';

export default {
    name: 'ShCategoryListTypeItemAdmin',
    mixins: [
        capitalize,
        pluralize,
    ],
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    data () {
        return {
            category: this.$route.meta.category,
        };
    },
    computed: {
        capitalizeCategory () {
            return this.capitalize(this.category);
        },
        pluralizeCategory () {
            return this.pluralize(this.category);
        },
    },
    methods: {
        itemEdit () {
            router.push(`/${this.pluralizeCategory}/${this.item.name}/edit`);
        },
        itemView () {
            router.push(`/${this.pluralizeCategory}/${this.item.name}`);
        },
    },
};
</script>

<style scoped>
.card-header__heading {
    margin-bottom: 0;
}
</style>
