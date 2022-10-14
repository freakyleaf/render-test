<template>
    <div class="mb-3">
        <label
            class="form-label"
            :for="id"
        >
            {{ label }}
            <span
                v-if="hasValidation"
                class="text-danger"
            >
                (required)
            </span>
            <FormHelper v-if="helperText">
                {{ helperText }}
            </FormHelper>
        </label>
        <input
            :id="id"
            ref="input"
            v-model.trim="input"
            class="form-control"
            :class="{ 'is-invalid': hasValidation && v.$error }"
            :disabled="disabled"
            :readonly="readonly"
            type="email"
            @input="v.$touch()"
        >
        <div
            v-if="hasValidation && !v.email"
            class="invalid-feedback"
        >
            {{ label }} field requires a valid email address
        </div>
        <div
            v-if="hasValidation && !v.required"
            class="invalid-feedback"
        >
            {{ label }} field is required
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputEmailGeneric',
    props: {
        autofocus: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        helperText: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: '',
            required: true,
        },
        label: {
            type: String,
            default: '',
            required: true,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        v: {
            type: Object,
            default: () => {},
        },
        value: {
            type: String,
            default: '',
        },
    },
    computed: {
        hasValidation () {
            return this.v && !!Object.keys(this.v.$params).length;
        },
        input: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            },
        },
    },
    mounted () {
        if (this.autofocus) {
            this.$refs.input.focus();
        }
    },
};
</script>
