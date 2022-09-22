<template>
    <li class="card mb-3">
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
                        @click="itemView(item.name)"
                    >
                        View {{ capitalizeCategory }}
                    </button>
                    <button
                        class="btn btn-primary"
                        @click="itemEdit(item.name)"
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

export default {
    name: 'ShCategoryListTypeItem',
    mixins: [
        capitalize,
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
    },
    methods: {
        itemEdit (name) {
            router.push(`/${this.category}s/edit/${name}`);
        },
        itemView (name) {
            router.push(`/${this.category}s/view/${name}`);
        },
    },
};
</script>

<style scoped>
.card-header__heading {
    margin-bottom: 0;
}
</style>
