<template>
    <div class="mb-3">
        <label
            class="form-label"
            for="input-name"
        >
            Name <span class="text-danger">(required)</span>
        </label>
        <input
            id="input-name"
            ref="itemNameInput"
            v-model.trim="name"
            class="form-control"
            :class="{ 'is-invalid': v.$error }"
            spellcheck="false"
            type="text"
            @input="v.$touch()"
        >
        <div
            v-if="v.$error"
            class="invalid-feedback"
        >
            Name field is required
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputName',
    props: {
        v: {
            type: Object,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
    },
    computed: {
        name: {
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
