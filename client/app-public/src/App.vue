<template>
    <div id="app">
        <SiteNavigation />
        <div class="container">
            <AlertError
                v-if="errorMessage"
                :error-message="errorMessage"
            />
            <Loading v-if="!errorMessage && loading" />
            <router-view v-if="!loading" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import AlertError from '@shared/components/alert/ShAlertError.vue';
import Loading from '@shared/components/ShLoading.vue';
import SiteNavigation from '@/components/SiteNavigation.vue';

export default {
    components: {
        AlertError,
        Loading,
        SiteNavigation,
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
            errorMessage: state => state.error.errorMessage,
            loading: state => state.loading.loading,
            tags: state => state.tag.all,
        }),
    },
    watch: {
        $route () {
            this.unsetError();
        },
    },
    async created () {
        try {
            this.setLoading(true);
            await this.getAllAttributes();
            await this.getAllTags();
        } catch (error) {
            this.setError(error);
        } finally {
            this.setLoading(false);
        }
    },
    methods: {
        ...mapActions({
            getAllAttributes: 'attribute/getAllAttributes',
            getAllTags: 'tag/getAllTags',
        }),
        ...mapMutations({
            setError: 'error/setError',
            setLoading: 'loading/setLoading',
            unsetError: 'error/unsetError',
        }),
    },
};
</script>

<style>
* {
    line-height: 1.75; /* Allow `<code>` elements to exist happily */
}

th {
    white-space: nowrap;
}

td:last-child {
    width: 100%;
}

code {
    font-size: 1em;
    line-height: 1;
    white-space: nowrap;
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

table code {
    white-space: normal;
}

blockquote {
    border-left: 10px solid var(--bs-gray-300);
    padding-left: 1em;
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

/* VueDraggable */

.col-icon {
    cursor: grab;
}

.col-icon__icon {
    transform: translateY(-60%);
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

/* Utilities */

.pr-0 {
    padding-right: 0 !important;
}
</style>
