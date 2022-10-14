<template>
    <div class="mb-3">
        <label
            class="form-label"
            for="input-type"
        >
            Type <span class="text-danger">(required)</span>
        </label>
        <select
            id="input-type"
            v-model="type"
            class="form-select"
            :class="{ 'is-invalid': v.$error }"
            @input="v.$touch()"
        >
            <template v-for="categoryType in types[category]">
                <option
                    :key="categoryType.kebab"
                    :value="categoryType.kebab"
                >
                    {{ categoryType.pretty }}
                </option>
            </template>
        </select>
        <div
            v-if="v.$error"
            class="invalid-feedback"
        >
            Type field is required
        </div>
    </div>
</template>

<script>
import attributeTypes from '@shared/constants/attributeTypes';
import tagTypes from '@shared/constants/tagTypes';

export default {
    name: 'InputType',
    props: {
        category: {
            type: String,
            default: '',
            required: true,
            validator: (value) => {
                return [ 'attribute', 'tag' ].includes(value);
            },
        },
        v: {
            type: Object,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
    },
    data () {
        return {
            types: {
                attribute: attributeTypes,
                tag: tagTypes,
            },
        };
    },
    computed: {
        type: {
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
