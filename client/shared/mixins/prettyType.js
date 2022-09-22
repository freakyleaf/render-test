import attributeSubtypes from '@shared/constants/attributeSubtypes';
import attributeTypes from '@shared/constants/attributeTypes';
import attributeValueTypes from '@shared/constants/attributeValueTypes';
import tagTypes from '@shared/constants/tagTypes';

// Subtypes are nested so need some preparation before spreading
const attributeSubtypesValues = [];

attributeSubtypes.forEach(subtype => {
    subtype.values.forEach(value => {
        if (!attributeSubtypesValues.find(({ kebab }) => kebab === value.kebab)) {
            attributeSubtypesValues.push(value);
        }
    });
});

function prettyTypeHelper (type) {
    const allTypes = [
        ...attributeSubtypesValues,
        ...attributeTypes,
        ...attributeValueTypes,
        ...tagTypes,
    ];

    const typeIndex = allTypes.findIndex(({ kebab }) => kebab === type);

    if (typeIndex === -1) {
        return `Invalid type: ${type}`;
    }

    return allTypes[typeIndex].pretty;
}

export default {
    methods: {
        prettyType (type) {
            return prettyTypeHelper(type);
        },
    },
};
