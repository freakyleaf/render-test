<template>
    <div class="modal position-static d-block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Confirm Remove
                    </h5>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to remove <code>{{ meta.name }}</code>?</p>
                </div>
                <div class="modal-footer d-flex justify-content-between">
                    <button
                        type="button"
                        class="btn btn-danger"
                        @click.prevent="doAction"
                    >
                        Yes
                    </button>
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click.prevent="closeModal"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

import eventBus from '@shared/eventBus';

export default {
    name: 'ToolbarFormUtilityConfirmRemoveModal',
    props: {
        meta: {
            type: Object,
            default: () => {},
            required: true,
        },
    },
    methods: {
        ...mapActions({
            closeModal: 'modal/closeModal',
        }),
        doAction () {
            this.closeModal();
            eventBus.$emit('ToolbarFormUtilityConfirmRemoveItem');
        },
    },
};
</script>
