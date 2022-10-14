<template>
    <div class="mb-3">
        <label
            class="form-label"
            for="input-subtype"
        >
            Subtype <span class="text-danger">(required)</span>
        </label>
        <select
            id="input-subtype"
            v-model="subtype"
            class="form-select"
            :class="{ 'is-invalid': v.$error }"
            @input="v.$touch()"
        >
            <template v-for="categorySubtype in categorySubtypes">
                <option
                    :key="categorySubtype.kebab"
                    :value="categorySubtype.kebab"
                >
                    {{ categorySubtype.pretty }}
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
import attributeSubtypes from '@shared/constants/attributeSubtypes';

export default {
    name: 'InputSubtype',
    props: {
        category: {
            type: String,
            default: '',
            required: true,
            validator: (value) => {
                return [ 'attribute', 'tag' ].includes(value);
            },
        },
        type: {
            type: String,
            default: '',
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
            subtypes: {
                attribute: attributeSubtypes,
            },
        };
    },
    computed: {
        categorySubtypes () {
            return this.subtypes[this.category].filter(({ type }) => type === this.type)[0].values;
        },
        subtype: {
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
