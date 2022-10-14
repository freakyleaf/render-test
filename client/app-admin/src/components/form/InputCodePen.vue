<template>
    <div>
        <label
            class="form-label"
            for="input-code-pen"
        >
            CodePen link
        </label>
        <div class="input-group">
            <span class="input-group-text">
                codepen.io/caniattribute/pen/
            </span>
            <input
                id="input-code-pen"
                v-model.trim="codepen"
                class="form-control"
                spellcheck="false"
                type="text"
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'InputCodePen',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    computed: {
        codepen: {
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
