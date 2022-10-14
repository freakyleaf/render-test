<template>
    <div class="mb-3">
        <label class="form-label">
            Value Values
        </label>
        <VueDraggable
            class="list-unstyled list-unstyled__striped"
            ghost-class="draggable-ghost"
            handle=".col-icon"
            :list="valueValues"
            tag="ul"
        >
            <li
                v-for="(valueValue, valueValueIndex) in v.$each.$iter"
                :key="valueValueIndex"
                class="list-item g-3 p-3 pb-0 mb-3"
            >
                <div class="row">
                    <div class="col col-auto col-icon">
                        <IconArrowsMove class="col-icon__icon" />
                    </div>
                    <div class="col">
                        <div class="row mb-3">
                            <div class="col">
                                <label
                                    class="form-label"
                                    :for="`attributeValueName-${valueValueIndex}`"
                                >
                                    Value Name <span class="text-danger">(required)</span>
                                </label>
                                <input
                                    :id="`attributeValueName-${valueValueIndex}`"
                                    ref="attributeValueName"
                                    v-model.trim="valueValue.name.$model"
                                    class="form-control"
                                    :class="{ 'is-invalid': valueValue.name.$error }"
                                    type="text"
                                >
                                <div
                                    v-if="!valueValue.name.required"
                                    class="invalid-feedback"
                                >
                                    Value Name field is required
                                </div>
                            </div>
                            <div class="col">
                                <label
                                    class="form-label"
                                    :for="`attributeValueExample-${valueValueIndex}`"
                                >
                                    Value Example
                                </label>
                                <input
                                    :id="`attributeValueExample-${valueValueIndex}`"
                                    v-model.trim="valueValue.example.$model"
                                    class="form-control"
                                    type="text"
                                >
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <MarkdownPreviewGeneric
                                    :id="`attributeValueNotes-${valueValueIndex}`"
                                    label="Value Notes"
                                    :value="valueValue.notes.$model"
                                    @markdownPreviewInput="(value) => {
                                        valueValue.notes.$model = value;
                                    }"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-end mb-3">
                            <div class="col col-auto">
                                <button
                                    class="btn btn-danger"
                                    @click.prevent="valueValueRemove(valueValueIndex)"
                                >
                                    Remove Value
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </VueDraggable>
        <div class="mb-3">
            <AlertInfo
                v-if="!valueValues.length"
                info-message="No values to display"
            />
            <button
                class="btn btn-primary"
                @click.prevent="valueValueAdd"
            >
                Add Value
            </button>
        </div>
    </div>
</template>

<script>
import VueDraggable from 'vuedraggable';

import AlertInfo from '@shared/components/alert/ShAlertInfo.vue';
import MarkdownPreviewGeneric from '@shared/components/markdown/ShMarkdownPreviewGeneric.vue';

import IconArrowsMove from '@shared/components/icons/IconArrowsMove.vue';

export default {
    name: 'InputValueValues',
    components: {
        AlertInfo,
        IconArrowsMove,
        MarkdownPreviewGeneric,
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
            required: true,
        },
    },
    computed: {
        valueValues: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            },
        },
        valuesCount () {
            return Object.keys(this.v.$each.$iter).length;
        },
    },
    methods: {
        async focusInput () {
            // Input isn't focusable after one tick :/
            await this.$nextTick();
            await this.$nextTick();
            if (this.valuesCount > 0) {
                this.$refs.attributeValueName[this.valuesCount - 1].focus();
            }
        },
        valueValueAdd () {
            this.$emit('valueValueAdd');
            this.focusInput();
        },
        valueValueRemove (valueIndex) {
            this.$emit('valueValueRemove', valueIndex);
            this.focusInput();
        },
    },
};
</script>
