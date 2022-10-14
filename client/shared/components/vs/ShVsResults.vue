<template>
    <div
        class="vs-results mb-3 p-3"
        :class="`vs-results--${status}`"
        tabindex="0"
    >
        <div class="vs-results__header">
            <h2 class="h4">
                Can I use the attribute <code>{{ attribute.name }}</code> with the tag <code>{{ tag.name }}</code>?
            </h2>
        </div>
        <div class="vs-results__body">
            <div class="vs-results__body-main">
                <span class="vs-results__badge">
                    <BadgeStatus :status="status" />
                </span>
                <template v-if="status === 'danger'">
                    <span>This combination is not valid so should not be used.</span>
                </template>
                <template v-if="status === 'success'">
                    <span>You're all good to go!</span>
                </template>
                <template v-if="status === 'warning'">
                    <span>While this combination is technically valid <code>{{ attribute.name }}</code> has no day-to-day practical effect on <code>{{ tag.name }}</code>.</span>
                </template>
            </div>
            <div
                v-if="showNotes"
                class="vs-results__body-notes pt-3 mt-3"
            >
                <div
                    v-if="showNotesCombo"
                    class="note p-3"
                >
                    <h4 class="note__heading h5">
                        Notes on <code>{{ attribute.name }}</code> + <code>{{ tag.name }}</code>
                    </h4>
                    <BadgeOpinionated
                        v-if="tagAttribute.subform.notesOpinionated"
                        class="mb-3"
                    />
                    <!-- eslint-disable vue/no-v-html -->
                    <div
                        class="markdown"
                        v-html="renderMarkdown(markdownOutput)"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                    <p v-if="tagAttribute.subform.codepen">
                        For a real-world example of <code>{{ attribute.name }}</code> + <code>{{ tag.name }}</code> see
                        <a
                            v-if="isDedicatedPage"
                            class="note__link"
                            href="#code-pen-example"
                        >
                            this CodePen
                        </a>
                        <router-link
                            v-else
                            :to="`/vs/${attribute.name}/${tag.name}#code-pen-example`"
                        >
                            this CodePen
                        </router-link>
                        .
                    </p>
                    <div
                        v-if="env === 'development'"
                        class="mt-3"
                    >
                        <button
                            class="btn btn-primary"
                            @click.prevent="developmentEdit(`${appAdminUrl}/attributes/${attribute.name}/edit`)"
                        >
                            Edit attribute: '{{ attribute.name }}'
                        </button>
                        <button
                            class="btn btn-primary mx-3"
                            @click.prevent="developmentEdit(`${appAdminUrl}/tags/${tag.name}/edit`)"
                        >
                            Edit tag: '{{ tag.name }}'
                        </button>
                    </div>
                </div>
                <div
                    v-if="showNotesAttribute"
                    class="note p-3"
                >
                    <h4 class="note__heading h5">
                        Notes on <code>{{ attribute.name }}</code>
                    </h4>
                    <BadgeOpinionated
                        v-if="attribute.notesOpinionated"
                        class="mb-3"
                    />
                    <!-- eslint-disable vue/no-v-html -->
                    <div
                        class="markdown"
                        v-html="renderMarkdown(attribute.notes)"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                    <button
                        v-if="env === 'development'"
                        class="btn btn-primary my-3"
                        @click.prevent="developmentEdit(`${appAdminUrl}/attributes/${attribute.name}/edit`)"
                    >
                        Edit attribute: '{{ attribute.name }}'
                    </button>
                    <div
                        v-if="attribute.valueValues.length && status !== 'danger'"
                        class="note__box"
                    >
                        <h5 class="note__sub-heading mb-3">
                            Valid <code>{{ attribute.name }}</code> values
                        </h5>
                        <TableValidValues :item="attribute" />
                    </div>
                </div>
                <div
                    v-if="showNotesTag"
                    class="note p-3"
                >
                    <h4 class="note__heading h5">
                        Notes on <code>{{ tag.name }}</code>
                    </h4>
                    <BadgeOpinionated
                        v-if="tag.notesOpinionated"
                        class="mb-3"
                    />
                    <!-- eslint-disable vue/no-v-html -->
                    <div
                        class="markdown"
                        v-html="renderMarkdown(tag.notes)"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                    <button
                        v-if="env === 'development'"
                        class="btn btn-primary my-3"
                        @click.prevent="developmentEdit(`${appAdminUrl}/tags/${tag.name}/edit`)"
                    >
                        Edit tag: '{{ tag.name }}'
                    </button>
                </div>
                <div
                    class="note p-3"
                >
                    <h4 class="note__heading h5">
                        Read more
                    </h4>
                    <ul>
                        <li v-if="!isDedicatedPage">
                            <router-link
                                class="note__link"
                                :to="`/vs/${attribute.name}/${tag.name}`"
                            >
                                View the dedicated '{{ attribute.name }}' + '{{ tag.name }}' page
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                class="note__link"
                                :to="`/attributes/${attribute.name}`"
                            >
                                Read more on '{{ attribute.name }}'
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                class="note__link"
                                :to="`/tags/${tag.name}`"
                            >
                                Read more on '{{ tag.name }}'
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                v-if="hasSlotFooterContent"
                class="vs-results__footer d-grid pt-3 mt-3"
            >
                <slot name="footer" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import urlCodePen from '@shared/constants/urlCodePen';
import urlFragmentDedicatedPage from '@shared/constants/urlFragmentDedicatedPage';

import badgeStatus from '@shared/mixins/badgeStatus';
import contentPatternInject from '@shared/mixins/contentPatternInject';
import renderMarkdown from '@shared/mixins/renderMarkdown';

import BadgeOpinionated from '@shared/components/badge/ShBadgeOpinionated.vue';
import BadgeStatus from '@shared/components/badge/ShBadgeStatus.vue';
import TableValidValues from '@shared/components/table/ShTableValidValues.vue';

const env = import.meta.env.PUBLIC_ENV;
const envBaseUrl = import.meta.env.PUBLIC_BASE_URL;
const envAppAdminPortNumber = import.meta.env.PUBLIC_APP_ADMIN_PORT_NUMBER;

export default {
    name: 'ShVsResults',
    components: {
        BadgeOpinionated,
        BadgeStatus,
        TableValidValues,
    },
    mixins: [
        badgeStatus,
        contentPatternInject,
        renderMarkdown,
    ],
    props: {
        attribute: {
            type: Object,
            default: () => {},
            required: true,
        },
        tag: {
            type: Object,
            default: () => {},
            required: true,
        },
    },
    data () {
        return {
            env: env,
            envBaseUrl: envBaseUrl,
            envAppAdminPortNumber: envAppAdminPortNumber,
            urlCodePen: urlCodePen,
            urlFragmentDedicatedPage: urlFragmentDedicatedPage,
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
        }),
        appAdminUrl () {
            return `${this.envBaseUrl}:${this.envAppAdminPortNumber}`;
        },
        contentPatterns () {
            return [
                { attribute: [ ...this.attribute.contentPatterns ] },
                { tag: [ ...this.tag.contentPatterns ] },
            ];
        },
        hasSlotFooterContent () {
            return !!this.$slots.footer;
        },
        isDedicatedPage () {
            return this.$route.path === `/${urlFragmentDedicatedPage}/${this.attribute.name}/${this.tag.name}`;
        },
        markdownOutput () {
            return this.contentPatternInject({
                attributeName: this.attribute.name,
                contentPatterns: this.contentPatterns,
                contentRaw: this.tagAttribute.subform.notes,
                tagName: this.tag.name,
            });
        },
        showNotes () {
            return this.showNotesAttribute || this.showNotesTag || this.showAttributesCombo;
        },
        showNotesAttribute () {
            // return this.attribute.notes;
            return true;
        },
        showNotesCombo () {
            return this.tagAttribute?.subform && (this.tagAttribute.subform.notes || this.tagAttribute.subform.codepen);
        },
        showNotesTag () {
            return this.tag.notes;
        },
        status () {
            return this.badgeStatus(this.attribute, this.tag);
        },
        tagAttribute () {
            return this.tag.attributes.find(({ name }) => name === this.attribute.name);
        },
    },
    mounted () {
        this.tag.attributes.forEach(tagAttribute => {
            const attributeIndex = this.attributes.findIndex(({ name }) => name === tagAttribute.name);

            if (attributeIndex === -1) {
                this.setError(`Cannot find attribute '${tagAttribute.name}' in tag '${this.tag.name}'`);
            }

            if (this.attributes[attributeIndex].contentPatterns.length) {
                tagAttribute.contentPatterns = this.attributes[attributeIndex].contentPatterns;

            } else {
                tagAttribute.contentPatterns = [];
            }
        });
    },
    methods: {
        ...mapMutations({
            setError: 'error/setError',
        }),
        developmentEdit (url) {
            return window.open(url, '_blank');
        },
    },
};
</script>

<style>
:root {
    --bs-danger-mid-lo: #db8b7d;
    --bs-success-mid-lo: #96cdbb;
    --bs-warning-mid-lo: #e8bc77;
    --bs-danger-mid-hi: #e5aca2;
    --bs-success-mid-hi: #b4dccf;
    --bs-warning-mid-hi: #efcf9e;
    --bs-danger-light: #edc5be;
    --bs-success-light: #cbe6dd;
    --bs-warning-light: #f3ddbb;
    --bs-danger-super-light: #f7e6e3;
    --bs-success-super-light: #e9f4f1;
    --bs-warning-super-light: #faf1e2;
}

.vs-results {
    border-style: solid;
    border-width: 3px;
}

.vs-results--danger {
    border-color: var(--bs-danger);
    background-color: var(--bs-danger-super-light);
}

.vs-results--success {
    border-color: var(--bs-success);
    background-color: var(--bs-success-super-light);
}

.vs-results--warning {
    border-color: var(--bs-warning);
    background-color: var(--bs-warning-super-light);
}

.vs-results--unacknowledged {
    background-color: var(--bs-light);
}

.vs-results__body-notes,
.vs-results__footer {
    border-top-style: solid;
    border-top-width: 1px;
}

.vs-results--danger .vs-results__body-notes,
.vs-results--danger .vs-results__footer {
    border-color: var(--bs-danger);
}

.vs-results--success .vs-results__body-notes,
.vs-results--success .vs-results__footer {
    border-color: var(--bs-success);
}

.vs-results--warning .vs-results__body-notes,
.vs-results--warning .vs-results__footer {
    border-color: var(--bs-warning);
}

.vs-results .note {
    border-left-style: solid;
    border-left-width: 1rem;
}

.vs-results .note > :last-child {
    margin-bottom: 0 !important;
}

.vs-results .note:not(:last-of-type) {
    margin-bottom: 1rem;
}

.vs-results--danger .note {
    background-color: var(--bs-danger-light);
    border-left-color: var(--bs-danger);
}

.vs-results--success .note {
    background-color: var(--bs-success-light);
    border-left-color: var(--bs-success);
}

.vs-results--warning .note {
    background-color: var(--bs-warning-light);
    border-left-color: var(--bs-warning);
}

.vs-results .note__heading {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom-style: solid;
    border-bottom-width: 1px;
}

.vs-results--danger .note__heading {
    border-bottom-color: var(--bs-danger);
}

.vs-results--success .note__heading {
    border-bottom-color: var(--bs-success);
}

.vs-results--warning .note__heading {
    border-bottom-color: var(--bs-warning);
}

.vs-results .note__box {
    padding: 1rem;
}

.vs-results--danger .note__box {
    background-color: var(--bs-danger-mid-hi);
}

.vs-results--success .note__box {
    background-color: var(--bs-success-mid-hi);
}

.vs-results--warning .note__box {
    background-color: var(--bs-warning-mid-hi);
}

.vs-results__badge {
    margin-right: 0.25em;
}

.vs-results a {
    text-decoration: underline;
}

.vs-results--danger a {
    color: var(--bs-danger);
}

.vs-results--success a {
    color: var(--bs-success);
}

.vs-results--warning a {
    color: var(--bs-warning);
}

.vs-results--danger .table {
    background-color: var(--bs-danger-super-light);
}

.vs-results--success .table {
    background-color: var(--bs-success-super-light);
}

.vs-results--warning .table {
    background-color: var(--bs-warning-super-light);
}

.vs-results--danger .table td {
    border-color: var(--bs-danger-mid-hi);
}

.vs-results--success .table td {
    border-color: var(--bs-success-mid-hi);
}

.vs-results--warning .table td {
    border-color: var(--bs-warning-mid-hi);
}

.vs-results--danger .table-accent {
    background-color: var(--bs-danger-mid-lo) !important;
}

.vs-results--success .table-accent {
    background-color: var(--bs-success-mid-lo) !important;
}

.vs-results--warning .table-accent {
    background-color: var(--bs-warning-mid-lo) !important;
}

/* .markdown > :last-child {
    margin-bottom: 0;
} */

</style>
