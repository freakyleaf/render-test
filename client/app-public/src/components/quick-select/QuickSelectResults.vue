<template>
    <div
        class="quick-select-results row mb-3 px-2 py-3"
        :class="`quick-select-results--${results.status}`"
        tabindex="0"
    >
        <div class="quick-select-results__header">
            <h3 class="h4">
                Can I use the attribute <code>{{ results.attribute.name }}</code> with the tag <code>{{ results.tag.name }}</code>?
            </h3>
        </div>
        <div class="quick-select-results__body">
            <div class="quick-select-results__body-main">
                <span class="quick-select-results__badge">
                    <BadgeStatus :status="results.status" />
                </span>
                <template v-if="results.status === 'danger'">
                    <span>This combination is not valid so should not be used.</span>
                </template>
                <template v-if="results.status === 'success'">
                    <span>You're all good to go!</span>
                </template>
                <template v-if="results.status === 'warning'">
                    <span>While this combination is technically valid <code>{{ results.attribute.name }}</code> has no day-to-day practical effect on <code>{{ results.tag.name }}</code>.</span>
                </template>
            </div>
            <div
                v-if="showNotes"
                class="quick-select-results__body-notes pt-3 mt-3"
            >
                <div
                    v-if="showNotesAttribute"
                    class="note p-3"
                >
                    <h4 class="note__heading h5">
                        Notes on <code>{{ results.attribute.name }}</code>
                    </h4>
                    <BadgeOpinionated
                        v-if="results.attribute.notesOpinionated"
                        class="mb-3"
                    />
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <div v-html="renderMarkdown(results.attribute.notes)" />
                </div>
                <div
                    v-if="showNotesTag"
                    class="note p-3"
                >
                    <h4 class="note__heading h5">
                        Notes on <code>{{ results.tag.name }}</code>
                    </h4>
                    <BadgeOpinionated
                        v-if="results.tag.notesOpinionated"
                        class="mb-3"
                    />
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <div v-html="renderMarkdown(results.tag.notes)" />
                </div>
                <div
                    v-if="showNotesCombo"
                    class="note p-3"
                >
                    <h4 class="note__heading h5">
                        Notes on <code>{{ results.attribute.name }}</code> + <code>{{ results.tag.name }}</code>
                    </h4>
                    <BadgeOpinionated
                        v-if="results.tagAttribute.subform.notesOpinionated"
                        class="mb-3"
                    />
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <div v-html="renderMarkdown(markdownOutput)" />
                    <p v-if="results.tagAttribute.subform.codepen">
                        For a real-world example of <code>{{ results.attribute.name }}</code> + <code>{{ results.tag.name }}</code> see
                        <a
                            class="note__link"
                            :href="`${codePenUrl}${ results.tagAttribute.subform.codepen}`"
                            target="_blank"
                        >
                            this CodePen
                        </a>.
                    </p>
                </div>
                <div
                    class="note p-3"
                >
                    <h4 class="note__heading h5">
                        Read more
                    </h4>
                    <ul>
                        <li>
                            <router-link
                                class="note__link"
                                :to="`/attributes/view/${ results.attribute.name}`"
                            >
                                Read more on '{{ results.attribute.name }}'
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                class="note__link"
                                :to="`/tags/view/${ results.tag.name}`"
                            >
                                Read more on '{{ results.tag.name }}'
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="quick-select-results__footer d-grid pt-3 mt-3">
                <button
                    class="btn btn-primary"
                    @click.prevent="$emit('tryAnotherSearch')"
                >
                    Try another Search
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import codePenUrl from '@shared/constants/codePenUrl';

import contentPatternInject from '@shared/mixins/contentPatternInject';
import renderMarkdown from '@shared/mixins/renderMarkdown';

import BadgeOpinionated from '@shared/components/badge/ShBadgeOpinionated.vue';
import BadgeStatus from '@shared/components/badge/ShBadgeStatus.vue';

export default {
    name: 'QuickSelectResults',
    components: {
        BadgeOpinionated,
        BadgeStatus,
    },
    mixins: [
        contentPatternInject,
        renderMarkdown,
    ],
    props: {
        results: {
            type: Object,
            default: () => {},
        },
    },
    data () {
        return {
            codePenUrl: codePenUrl,
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
        }),
        contentPatterns () {
            return [
                { attribute: [ ...this.results.attribute.contentPatterns ] },
                { tag: [ ...this.results.tag.contentPatterns ] },
            ];
        },
        markdownOutput () {
            return this.contentPatternInject({
                attributeName: this.results.attribute.name,
                contentPatterns: this.contentPatterns,
                contentRaw: this.results.tagAttribute.subform.notes,
                tagName: this.results.tag.name,
            });
        },
        showNotes () {
            return this.showNotesAttribute || this.showNotesTag || this.showAttributesCombo;
        },
        showNotesAttribute () {
            return this.results.attribute.notes;
        },
        showNotesCombo () {
            return this.results.tagAttribute?.subform && (this.results.tagAttribute.subform.notes || this.results.tagAttribute.subform.codepen);
        },
        showNotesTag () {
            return this.results.tag.notes;
        },
    },
    mounted () {
        this.results.tag.attributes.forEach(tagAttribute => {
            const attributeIndex = this.attributes.findIndex(({ name }) => name === tagAttribute.name);
            if (this.attributes[attributeIndex].contentPatterns.length) {
                tagAttribute.contentPatterns = this.attributes[attributeIndex].contentPatterns;

            } else {
                tagAttribute.contentPatterns = [];
            }
        });
    },
};
</script>

<style>
.quick-select-results {
    border-style: solid;
    border-width: 3px;
}

.quick-select-results--danger {
    border-color: var(--bs-danger);
    background-color: #f7e6e3;
}

.quick-select-results--success {
    border-color: var(--bs-success);
    background-color: #e9f4f1;
}

.quick-select-results--warning {
    border-color: var(--bs-warning);
    background-color: #faf1e2;
}

.quick-select-results__body-notes,
.quick-select-results__footer {
    border-top-style: solid;
    border-top-width: 1px;
}

.quick-select-results--danger .quick-select-results__body-notes,
.quick-select-results--danger .quick-select-results__footer {
    border-color: var(--bs-danger);
}

.quick-select-results--success .quick-select-results__body-notes,
.quick-select-results--success .quick-select-results__footer {
    border-color: var(--bs-success);
}

.quick-select-results--warning .quick-select-results__body-notes,
.quick-select-results--warning .quick-select-results__footer {
    border-color: var(--bs-warning);
}

.quick-select-results .note {
    border-left-style: solid;
    border-left-width: 1rem;
}

.quick-select-results .note:not(:last-of-type) {
    margin-bottom: 1rem;
}

.quick-select-results--danger .note {
    background-color: #edc5be;
    border-left-color: var(--bs-danger);
}

.quick-select-results--success .note {
    background-color: #cbe6dd;
    border-left-color: var(--bs-success);
}

.quick-select-results--warning .note {
    background-color: #f3ddbb;
    border-left-color: var(--bs-warning);
}

.quick-select-results .note__heading {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom-style: solid;
    border-bottom-width: 1px;
}

.quick-select-results--danger .note__heading {
    border-bottom-color: var(--bs-danger);
}

.quick-select-results--success .note__heading {
    border-bottom-color: var(--bs-success);
}

.quick-select-results--warning .note__heading {
    border-bottom-color: var(--bs-warning);
}

.quick-select-results__badge {
    margin-right: 0.25em;
}

.quick-select-results a {
    text-decoration: underline;
}

.quick-select-results--danger a {
    color: var(--bs-danger);
}

.quick-select-results--success a {
    color: var(--bs-success);
}

.quick-select-results--warning a {
    color: var(--bs-warning);
}
</style>
