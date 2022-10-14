<template>
    <div
        class="btn-toolbar"
        role="toolbar"
    >
        <button
            class="btn btn-primary"
            @click.prevent="$emit('click')"
        >
            Edit {{ capitalizeCategory }}
        </button>
        <span
            v-if="item"
            class="mx-3"
        >
            <code>{{ item.name }}</code>
        </span>
    </div>
</template>

<script>
import capitalize from '@shared/mixins/capitalize';

export default {
    name: 'ToolbarView',
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
};
</script>
