<template>
    <div class="mb-3">
        <label
            class="form-label"
            for="input-since"
        >
            Since <span class="text-danger">(required)</span>
        </label>
        <select
            id="input-since"
            v-model="since"
            class="form-select"
            :class="{ 'is-invalid': v.$error }"
            @input="v.$touch()"
        >
            <option value="Unknown">
                Unknown
            </option>
            <option value="HTML 1.0">
                HTML 1.0
            </option>
            <option value="HTML 2.0">
                HTML 2.0
            </option>
            <option value="HTML 3.2">
                HTML 3.2
            </option>
            <option value="HTML 4.0">
                HTML 4.0
            </option>
            <option value="HTML 4.01">
                HTML 4.01
            </option>
            <option value="HTML 5.0">
                HTML 5.0
            </option>
            <option value="HTML 5.1">
                HTML 5.1
            </option>
            <option value="HTML 5.2">
                HTML 5.2
            </option>
        </select>
        <div
            v-if="v.$error"
            class="invalid-feedback"
        >
            Since field is required
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputSince',
    props: {
        v: {
            type: Object,
            required: true,
        },
        value: {
            type: String,
            default: '',
            required: true,
        },
    },
    computed: {
        since: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            },
        },
    },
};
</script>
