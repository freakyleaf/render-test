import { mapState } from 'vuex';
import { helpers, required, url } from 'vuelidate/lib/validators';

import attributeSubtypes from '@shared/constants/attributeSubtypes';
import attributeValueTypes from '@shared/constants/attributeValueTypes';

const atLeastOneChecked = helpers.withParams({ type: 'atLeastOneChecked' },
    function () {
        return this.item.valueTypesInflated.some(({ checked }) => checked);
    }
);

export default {
    methods: {
        subtypesDeflate () {
            if (!this.subtypesActive) return [];

            const subtypeTypeIndex = this.item.subtypesInflated.findIndex(({ type }) => type === this.item.type);
            return this.item.subtypesInflated[subtypeTypeIndex].values.flatMap(({ checked, kebab }) => checked ? [ kebab ] : []);
        },
        subtypesInflate () {
            attributeSubtypes.forEach(attributeSubtype => {
                attributeSubtype.values.forEach(el => el.checked = false); // Initial state
            });

            if (this.item.subtypes?.length) { // Not on 'add' journey
                const typeIndex = attributeSubtypes.findIndex(({ type }) => type === this.item.type);

                this.item.subtypes.forEach(subtype => {
                    const subtypeIndex = attributeSubtypes[typeIndex].values.findIndex(({ kebab }) => kebab === subtype);
                    attributeSubtypes[typeIndex].values[subtypeIndex].checked = true;
                });
            }

            return attributeSubtypes;
        },
        subtypesUpdateSelected (value) {
            const subtypeTypeIndex = this.item.subtypesInflated.findIndex(({ type }) => type === this.item.type);
            const subtypeValueIndex = this.item.subtypesInflated[subtypeTypeIndex].values.findIndex(({ kebab }) => kebab === value.kebab);
            this.item.subtypesInflated[subtypeTypeIndex].values[subtypeValueIndex].checked = value.checked;
        },
        valueTypesDeflate () {
            return this.item.valueTypesInflated.flatMap(({ checked, kebab }) => checked ? [ kebab ] : []);
        },
        valueTypesInflate () {
            attributeValueTypes.forEach(el => el.checked = false); // Initial state

            if (this.item.valueTypes?.length) { // Not on 'add' journey
                this.item.valueTypes.forEach(valueType => {
                    const typeIndex = attributeValueTypes.findIndex(({ kebab }) => kebab === valueType);
                    attributeValueTypes[typeIndex].checked = true;
                });
            }

            return attributeValueTypes;
        },
        valueTypesUpdateSelected (value) {
            const typeIndex = this.item.valueTypesInflated.findIndex(({ kebab }) => kebab === value.kebab);
            this.item.valueTypesInflated[typeIndex].checked = value.checked;
        },
        valueValueAdd () {
            this.item.valueValues.push({
                name: '',
                example: '',
                notes: '',
            });
        },
        valueValueRemove (index) {
            this.item.valueValues.splice(index, 1);
        },
    },
    computed: {
        ...mapState({
            loading: state => state.loading.loading,
        }),
        subtypesActive () {
            // Can't do anything before `this.valueTypesInflate()` has done its thing
            if (this.loading) return false;

            return this.typesWithSubtypes.includes(this.item.type);
        },
        subtypesFilteredByType () {
            if (!this.subtypesActive) return [];

            const subtypeTypeIndex = this.item.subtypesInflated.findIndex(({ type }) => type === this.item.type);
            return this.item.subtypesInflated[subtypeTypeIndex].values;
        },
        typeIsAriaRegular () {
            return this.item.type === 'aria-regular';
        },
        typesWithSubtypes () {
            return attributeSubtypes.map(({ type }) => type);
        },
        valueValuesActive () {
            // Can't do anything before `this.valueTypesInflate()` has done its thing
            if (this.loading) return false;

            // Can't do `return this.item.valueTypes.includes('string')` as `this.item.valueTypes` doesn't exist on the 'add' journey
            const valueTypeIndex = this.item.valueTypesInflated.findIndex(({ kebab }) => kebab === 'string');
            return this.item.valueTypesInflated[valueTypeIndex].checked === true;
        },
    },
    validations: {
        item: {
            contentPatterns: {
                $each: {
                    reference: {
                        required,
                    },
                    content: {
                        required,
                    },
                },
            },
            name: {
                required,
            },
            references: {
                $each: {
                    name: {
                        required,
                    },
                    url: {
                        required,
                        url,
                    },
                },
            },
            since: {
                required,
            },
            type: {
                required,
            },
            valueTypesInflated: {
                $each: {
                    checked: {
                        atLeastOneChecked,
                    },
                    kebab: {},
                    pretty: {},
                },
            },
            valueValues: {
                $each: {
                    name: {
                        required,
                    },
                    example: {},
                    notes: {},
                },
            },
        },
    },
};
