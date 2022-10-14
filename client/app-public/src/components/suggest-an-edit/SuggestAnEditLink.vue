<template>
    <div class="suggest-an-edit-link mt-3 pt-3">
        Something wrong?
        <a
            href="#"
            @click.prevent="openSuggestAnEditModal"
        >
            Suggest an edit
        </a>.
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'SuggestAnEditLink',
    methods: {
        ...mapActions({
            openModal: 'modal/openModal',
        }),
        openSuggestAnEditModal () {
            this.openModal({
                component: 'SuggestAnEditModal',
                meta: {
                    attribute: this.$route.params.attribute,
                    category: this.$route.meta.category,
                    mode: this.$route.meta.mode,
                    name: this.$route.params.name,
                    tag: this.$route.params.tag,
                },
            });
        },
    },
};
</script>

<style scoped>
.suggest-an-edit-link {
    border-top: 1px solid var(--bs-border-color);
}
</style>
