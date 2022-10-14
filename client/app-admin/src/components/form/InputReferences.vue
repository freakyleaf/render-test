<template>
    <div>
        <label class="form-label">
            References
        </label>
        <VueDraggable
            ghost-class="draggable-ghost"
            handle=".col-icon"
            :list="references"
        >
            <div
                v-for="(reference, referenceIndex) in v.$each.$iter"
                :key="referenceIndex"
                class="row align-items-end g-3 mb-3"
            >
                <div class="col col-auto col-icon">
                    <IconArrowsMove class="col-icon__icon" />
                </div>
                <div class="col">
                    <label
                        class="form-label"
                        :for="`attributeReferenceName-${referenceIndex}`"
                    >
                        Reference Name <span class="text-danger">(required)</span>
                    </label>
                    <input
                        :id="`attributeReferenceName-${referenceIndex}`"
                        ref="attributeReferenceName"
                        v-model.trim="reference.name.$model"
                        class="form-control"
                        :class="{ 'is-invalid': reference.name.$error }"
                        type="text"
                    >
                    <div
                        v-if="!reference.name.required"
                        class="invalid-feedback"
                    >
                        Reference Name field is required
                    </div>
                </div>
                <div class="col">
                    <label
                        class="form-label"
                        :for="`attributeReferenceUrl-${referenceIndex}`"
                    >
                        Reference URL <span class="text-danger">(required)</span>
                    </label>
                    <input
                        :id="`attributeReferenceUrl-${referenceIndex}`"
                        v-model.trim="reference.url.$model"
                        class="form-control"
                        :class="{ 'is-invalid': reference.url.$error }"
                        type="text"
                    >
                    <div
                        v-if="!reference.url.required"
                        class="invalid-feedback"
                    >
                        Reference URL field is required
                    </div>
                    <div
                        v-if="!reference.url.url"
                        class="invalid-feedback"
                    >
                        Valid URL is required
                    </div>
                </div>
                <div class="col col-auto">
                    <button
                        class="btn btn-danger"
                        @click.prevent="referenceRemove(referenceIndex)"
                    >
                        Remove Reference
                    </button>
                </div>
            </div>
        </VueDraggable>
        <div class="mb-3">
            <AlertInfo
                v-if="!references.length"
                info-message="No references to display"
            />
            <button
                class="btn btn-primary"
                @click.prevent="referenceAdd"
            >
                Add Reference
            </button>
        </div>
    </div>
</template>

<script>
import VueDraggable from 'vuedraggable';

import AlertInfo from '@shared/components/alert/ShAlertInfo.vue';

import IconArrowsMove from '@shared/components/icons/IconArrowsMove.vue';

export default {
    name: 'InputReferences',
    components: {
        AlertInfo,
        IconArrowsMove,
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
        references: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            },
        },
        referencesCount () {
            return Object.keys(this.v.$each.$iter).length;
        },
    },
    methods: {
        async focusInput () {
            // Input isn't focusable after one tick :/
            await this.$nextTick();
            await this.$nextTick();
            this.$refs.attributeReferenceName[this.referencesCount - 1].focus();
        },
        referenceAdd () {
            this.$emit('referenceAdd');
            this.focusInput();
        },
        referenceRemove (referenceIndex) {
            this.$emit('referenceRemove', referenceIndex);
            this.focusInput();
        },
    },
};
</script>
