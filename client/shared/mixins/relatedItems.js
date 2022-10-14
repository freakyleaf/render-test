import { mapState } from 'vuex';

export default {
    data () {
        return {
            relatedItems: {
                attribute: [],
                tag: [],
            },
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
            tags: state => state.tag.all,
        }),
        namesOnlyAttributes () {
            return this.attributes.map(({ name }) => name);
        },
        namesOnlyTags () {
            return this.tags.map(({ name }) => name);
        },
    },
    methods: {
        getRelatedItems () {
            const copyRaw = `${this.itemContentDescription} ${this.itemContentNotes}`;
            const itemsBetweenCodeTagsRegex = /<code>(.*?)<\/code>/g;
            const itemsBetweenLtGtRegex = /&lt;(.*?)&gt;/;
            const itemsStripEqualsValueRegex = /(.*?)=/;
            const itemsStripSpaceValueRegex = /(.*?)\s/;

            const itemsBetweenCodeTags = [ ...copyRaw.matchAll(itemsBetweenCodeTagsRegex) ].map(m => m[1]);

            const itemsBetweenLtGt = itemsBetweenCodeTags.map(item => {
                return item.match(itemsBetweenLtGtRegex) ? item.match(itemsBetweenLtGtRegex)[1] : item;
            });

            const itemsStripEqualsValue = itemsBetweenLtGt.map(item => {
                return item.match(itemsStripEqualsValueRegex) ? item.match(itemsStripEqualsValueRegex)[1] : item;
            });

            const itemsStripSpaceValue = itemsStripEqualsValue.map(item => {
                return item.match(itemsStripSpaceValueRegex) ? item.match(itemsStripSpaceValueRegex)[1] : item;
            });

            const filteredItems = Array.from(new Set(itemsStripSpaceValue.filter(item => item !== this.item.name)));

            this.relatedItems = {
                attribute: filteredItems.filter(item => this.namesOnlyAttributes.includes(item)).sort((a, b) => a.localeCompare(b)),
                tag: filteredItems.filter(item => this.namesOnlyTags.includes(item)).sort((a, b) => a.localeCompare(b)),
            };
        },
    },
    mounted () {
        this.getRelatedItems();
    },
};
