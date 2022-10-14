<template>
    <div id="app">
        <ModalManager />
        <ToastManager />
        <SiteNavigation />
        <ContainerGeneric>
            <AlertError
                v-if="errorMessage"
                :error-message="errorMessage"
            />
            <Loading v-if="!errorMessage && loadingGlobal" />
        </ContainerGeneric>
        <router-view
            v-if="!loadingGlobal"
            :key="$route.fullPath"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

import AlertError from '@shared/components/alert/ShAlertError.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import Loading from '@shared/components/ShLoading.vue';
import ModalManager from '@shared/components/modal/ShModalManager.vue';
import SiteNavigation from '@/components/SiteNavigation.vue';
import ToastManager from '@shared/components/toast/ShToastManager.vue';

export default {
    components: {
        AlertError,
        ContainerGeneric,
        Loading,
        ModalManager,
        SiteNavigation,
        ToastManager,
    },
    computed: {
        ...mapGetters({
            activeModal: 'modal/activeModal',
        }),
        ...mapState({
            attributes: state => state.attribute.all,
            errorMessage: state => state.error.errorMessage,
            loadingGlobal: state => state.loading.loadingGlobal,
            tags: state => state.tag.all,
        }),
    },
    watch: {
        $route () {
            this.unsetError();
        },
        activeModal () {
            this.activeModal ? this.bodyScrollLock() : this.bodyScrollUnlock();
        },
    },
    async created () {
        try {
            this.setLoadingGlobal(true);
            await this.getAllAttributes();
            await this.getAllTags();
        } catch (error) {
            this.setError(error);
        } finally {
            this.setLoadingGlobal(false);
        }
    },
    methods: {
        ...mapActions({
            getAllAttributes: 'attribute/getAllAttributes',
            getAllTags: 'tag/getAllTags',
        }),
        ...mapMutations({
            setError: 'error/setError',
            setLoadingGlobal: 'loading/setLoadingGlobal',
            unsetError: 'error/unsetError',
        }),
        bodyScrollLock () {
            const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
            const body = document.body;
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}`;
        },
        bodyScrollUnlock () {
            const body = document.body;
            const scrollY = body.style.top;
            body.style.position = '';
            body.style.top = '';
            window.scrollTo({
                behavior: 'instant',
                left: 0,
                top: parseInt(scrollY || '0') * -1,
            });
        },
    },
};
</script>

<style>
:root {
    --cia-light: #F5F5F4;
    --cia-light-rgb: 245, 245, 244;
    --cia-light-alt: #F1F5F9;
    --cia-border-color: #E7E5E4;
    --cia-border-color-alt: #E2E8F0;
    --cia-primary: #475569;
    --cia-primary-rgb: 71, 85, 105;
    --cia-primary-hover: #334155;
    --bs-light: var(--cia-light) !important;
    --bs-light-rgb: var(--cia-light-rgb) !important;
    --bs-border-color: var(--cia-border-color) !important;
    --bs-primary: var(--cia-primary) !important;
    --bs-primary-rgb: var(--cia-primary-rgb) !important;
}

.bg-light-alt {
    background-color: var(--cia-light-alt);
}

.btn-primary {
    --bs-btn-bg: var(--cia-primary) !important;
    --bs-btn-border-color: var(--cia-primary) !important;
    --bs-btn-hover-bg: var(--cia-primary-hover) !important;
    --bs-btn-hover-border-color: var(--cia-primary-hover) !important;
}

html {
    overflow-x: hidden;
    overflow-y: scroll;
}

body {
    width: 100%; /* Required for position: fixed modal stuff */
}

main {
    background-color: var(--bs-white);
}

* {
    line-height: 1.75; /* Allow `<code>` elements to exist happily */
}

.table-bordered-outside {
    border: 1px solid var(--bs-border-color);
}

.table-bordered-outside-alt {
    border: 1px solid var(--cia-border-color-alt);
}

th {
    white-space: nowrap;
}

/* td:last-child {
    width: 100%;
} */

code {
    font-size: 1em;
    line-height: 1;
    padding: 0.2em 0.5em;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.25em;
}

h1 code,
h2 code,
h3 code,
h4 code,
h5 code,
h6 code,
a code {
    display: inline-block;
    padding: 0.35em 0.5em;
}

/* Removing this fixes '[a single printable character]' */
/* table code {
    white-space: normal;
} */

blockquote {
    border-left: 10px solid var(--bs-gray-300);
    padding-left: 1em;
}

textarea {
    min-height: 120px !important;
}

.list-unstyled__striped > li:nth-child(odd) {
    border: 1px solid var(--bs-gray-100);
}
.list-unstyled__striped > li:nth-child(even) {
    background-color: var(--bs-gray-100);
}

.subform {
    border-left: 10px solid var(--bs-gray-200);
}

@keyframes flash {

    0% {
        background-color: rgba(255, 193, 7, 0.5);
    }

    100% {
        background-color: rgba(255, 193, 7, 0);
    }
}

.flash {
    animation: flash 1.5s;
}

.badge {
    display: inline-flex;
    align-items: center;
    padding: 0.5em 0.75em;
}

.badge.bg-danger,
.badge.bg-success,
.badge.bg-warning {
    color: #fff;
}

.badge__icon {
    margin-left: 0.5em;
}

/* Button */

.btn-toolbar {
    align-items: center;
}

/* Dialog */

dialog {
    width: 100%;
    padding: 0;
    background-color: transparent;
    border: none;
}

dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}

.modal {
    min-width: 50%;
}

.modal-dialog {
    margin: 0 auto !important;
}

/* VueDraggable */

.col-icon {
    cursor: grab;
}

.col-icon__icon {
    transform: translateY(-60%);
}

.col-icon:hover {
    background-color: var(--bs-gray-200);
}

.draggable-ghost {
    background-color: var(--bs-cyan);
    opacity: 0.5;
}

.form-switch .form-check-input {
    transform: translateY(15%);
}

/* Markdown preview */

.markdown-preview__input,
.markdown-preview__output {
    display: flex;
    flex-flow: column nowrap;
}

.markdown-preview textarea,
.markdown-preview output {
    height: 100%;
}

.markdown-preview textarea {
    min-height: 120px;
    font-size: 0.95em;
}

/* Markdown rendered */

.markdown > *:last-child {
    margin-bottom: 0;
}

/* Utilities */

.pr-0 {
    padding-right: 0 !important;
}

/* Card */
.card,
.card-header {
    border-color: var(--bs-border-color);
}

.card-header {
    background-color: var(--bs-light);
}

/* Table */
.table {
    background-color: var(--bs-white);
}

.table-accent {
    background-color: var(--cia-light) !important;
}

.table-accent-alt {
    background-color: var(--cia-light-alt) !important;
}

.table tr:last-of-type th,
.table tr:last-of-type td {
    border-bottom: none;
}
</style>
