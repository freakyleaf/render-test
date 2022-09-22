function scrollToAnchor (item) {
    const el = document.getElementById(item);
    let scrollTimeout = 0;

    addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function () {
            el.classList.add('flash');
        }, 100);
    });

    el.scrollIntoView();
}

export default {
    methods: {
        anchorScroll (item) {
            scrollToAnchor(item);
        },
        scrollToItemOnUpdate () {
            if (this.$route.query.create || this.$route.query.update) {
                this.anchorScroll(this.$route.query.item);
            }
        },
    },
};
