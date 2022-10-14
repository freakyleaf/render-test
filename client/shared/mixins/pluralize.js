export default {
    methods: {
        pluralize (value) {
            if (!value) return '';
            value = value.toString();
            return `${value}s`;
        },
    },
};
