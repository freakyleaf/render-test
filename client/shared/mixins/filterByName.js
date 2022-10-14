export default {
    methods: {
        filterByName (filter, itemsToFilter) {
            this.filter = filter;

            if (this.filter.length > 1) {
                this.itemsLocal = itemsToFilter.filter(({ name }) => name.includes(this.filter));
            } else {
                this.itemsLocal = itemsToFilter;
            }
        },
    },
};
