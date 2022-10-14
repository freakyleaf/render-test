<template>
    <div class="modal position-static d-block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <VsResults
                        :attribute="attribute"
                        :tag="tag"
                    >
                        <template #footer>
                            <button
                                class="btn btn-primary"
                                type="button"
                                @click.prevent="closeModal"
                            >
                                Close Modal
                            </button>
                        </template>
                    </VsResults>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

import VsResults from '@shared/components/vs/ShVsResults.vue';

export default {
    name: 'QuickSelectResultsModal',
    components: {
        VsResults,
    },
    props: {
        meta: {
            type: Object,
            default: () => {},
            required: true,
        },
    },
    data () {
        return {
            attribute: {},
            tag: {},
        };
    },
    created () {
        this.attribute = this.meta.attribute;
        this.tag = this.meta.tag;
    },
    methods: {
        ...mapActions({
            closeModal: 'modal/closeModal',
        }),
    },
};
</script>
