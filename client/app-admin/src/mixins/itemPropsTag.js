import { required, url } from 'vuelidate/lib/validators';

export default {
    methods: {
        tagAttributesSetup () {
            this.attributes.forEach((attribute, index) => {
                // Make referencing easier when we filter by `type`
                attribute.index = index;

                this.$set(attribute, 'subform',
                    {
                        codepen: '',
                        hasEffect: false,
                        isValid: false,
                        notes: '',
                        notesOpinionated: false,
                    }
                );
            });
        },
        toggleGlobalVisibility (value) {
            this.attributes.forEach(attribute => {
                this.$set(attribute, 'isVisible', value);
            });
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
            type: {
                required,
            },
        },
    },
};
