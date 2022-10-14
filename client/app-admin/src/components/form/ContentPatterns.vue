<template>
    <div class="content-patterns mb-3">
        <label class="form-label">
            Content Patterns
        </label>
        <VueDraggable
            class="list-unstyled list-unstyled__striped"
            ghost-class="draggable-ghost"
            handle=".col-icon"
            :list="contentPatterns"
            tag="ul"
        >
            <li
                v-for="(contentPattern, contentPatternIndex) in v.$each.$iter"
                :key="contentPatternIndex"
                class="list-item g-3 p-3 pb-0 mb-3"
            >
                <div class="row">
                    <div class="col col-auto col-icon">
                        <IconArrowsMove class="col-icon__icon" />
                    </div>
                    <div class="col">
                        <div class="row mb-3">
                            <h3 class="h5">
                                <code>[pattern-{{ category }}={{ contentPattern.reference.$model }}]</code>
                            </h3>
                        </div>
                        <div class="row mb-3">
                            <div>
                                <label
                                    class="form-label"
                                    :for="`contentPatternReference-${contentPatternIndex}`"
                                >
                                    Content Pattern Reference <span class="text-danger">(required)</span>
                                </label>
                                <input
                                    :id="`contentPatternReference-${contentPatternIndex}`"
                                    ref="contentPatternReference"
                                    v-model.trim="contentPattern.reference.$model"
                                    class="form-control"
                                    :class="{ 'is-invalid': contentPattern.reference.$error }"
                                    type="text"
                                >
                                <div
                                    v-if="!contentPattern.reference.required"
                                    class="invalid-feedback"
                                >
                                    Content Pattern Reference field is required
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <MarkdownPreviewContentPatterns
                                :id="`contentPatternContent-${contentPatternIndex}`"
                                :v="contentPattern.content"
                                :value="contentPattern.content.$model"
                                @markdownPreviewInput="(value) => {
                                    contentPattern.content.$model = value;
                                }"
                            />
                        </div>
                        <div class="row mb-3">
                            <div class="d-flex justify-content-end">
                                <button
                                    class="btn btn-danger"
                                    @click.prevent="contentPatternRemove(contentPatternIndex)"
                                >
                                    Remove Content Pattern
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </VueDraggable>
        <div>
            <AlertInfo
                v-if="!contentPatterns.length"
                info-message="No Content Patterns to display"
            />
            <button
                class="btn btn-primary"
                @click.prevent="contentPatternAdd"
            >
                Add Content Pattern
            </button>
        </div>
    </div>
</template>

<script>
import VueDraggable from 'vuedraggable';

import AlertInfo from '@shared/components/alert/ShAlertInfo.vue';
import MarkdownPreviewContentPatterns from '@shared/components/markdown/ShMarkdownPreviewContentPatterns.vue';

import IconArrowsMove from '@shared/components/icons/IconArrowsMove.vue';

export default {
    name: 'ContentPatterns',
    components: {
        AlertInfo,
        IconArrowsMove,
        MarkdownPreviewContentPatterns,
        VueDraggable,
    },
    props: {
        v: {
            type: Object,
            required: true,
        },
        value: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        category () {
            return this.$route.meta.category;
        },
        contentPatterns: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            },
        },
        contentPatternsCount () {
            return Object.keys(this.v.$each.$iter).length;
        },
    },
    methods: {
        async focusInput () {
            // Input isn't focusable after one tick :/
            await this.$nextTick();
            await this.$nextTick();
            this.$refs.contentPatternReference[this.contentPatternsCount - 1].focus();
        },
        contentPatternAdd () {
            this.$emit('contentPatternAdd');
            this.focusInput();
        },
        contentPatternRemove (contentPatternIndex) {
            this.$emit('contentPatternRemove', contentPatternIndex);

            if (this.contentPatternsCount > 0) {
                this.focusInput();
            }
        },
    },
};
</script>

<style scoped>
.content-patterns {
    margin-left: -50vw;
    margin-right: -50vw;
    padding-left: 50vw;
    padding-right: 50vw;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: var(--bs-gray-300);
}
</style>
