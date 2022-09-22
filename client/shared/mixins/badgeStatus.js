export default {
    methods: {
        badgeStatus (attribute, tag) {
            const attributeInTagData = tag.attributes.find(({ name }) => name == attribute.name);
            if (!attributeInTagData) return 'unacknowledged';
            if (!attributeInTagData.subform.isValid) return 'danger';
            if (attributeInTagData.subform.isValid && attributeInTagData.subform.hasEffect === false) return 'warning';
            return 'success';
        },
    },
};
