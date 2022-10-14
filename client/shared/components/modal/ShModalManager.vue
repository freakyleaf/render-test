<template>
    <keep-alive>
        <div class="modal-manager">
            <dialog ref="dialog">
                <template v-if="activeModal">
                    <component
                        :is="activeModal.component"
                        :action="activeModal.action"
                        :meta="activeModal.meta"
                    />
                </template>
            </dialog>
        </div>
    </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ModalManager',
    computed: {
        ...mapGetters({
            activeModal: 'modal/activeModal',
        }),
    },
    watch: {
        activeModal () {
            this.activeModal ? this.$refs.dialog.showModal() : this.$refs.dialog.close();
        },
    },
};
</script>
