<template>
    <keep-alive>
        <div class="toast-manager">
            <div class="toast-manager_content p-3">
                <ContainerGeneric>
                    <transition
                        mode="out-in"
                        name="toast-slide-fade"
                    >
                        <template v-if="activeToast">
                            <ToastNotifictation
                                :icon="activeToast.icon"
                                :theme="activeToast.theme"
                            >
                                {{ activeToast.text }}
                            </ToastNotifictation>
                        </template>
                    </transition>
                </ContainerGeneric>
            </div>
        </div>
    </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex';

import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import ToastNotifictation from '@shared/components/toast/ShToastNotification.vue';

export default {
    name: 'ToastManager',
    components: {
        ContainerGeneric,
        ToastNotifictation,
    },
    computed: {
        ...mapGetters({
            activeToast: 'toast/activeToast',
        }),
    },
};
</script>

<style>
.toast-manager {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

.toast-slide-fade-enter-active,
.toast-slide-fade-leave-active {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out !important;
}

.toast-slide-fade-enter,
.toast-slide-fade-leave-to {
    opacity: 0 !important;
    transform: translateY(-150%) !important;
}
</style>
