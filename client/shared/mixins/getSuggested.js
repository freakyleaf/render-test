import Matcher from 'did-you-mean';
import { mapState } from 'vuex';

export default {
    data () {
        return {
            matchers: undefined,
        };
    },
    created () {
        this.matchers = {
            attribute: new Matcher(this.namesOnlyAttributes.join(' ')),
            tag: new Matcher(this.namesOnlyTags.join(' ')),
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
        getSuggestedItem (itemName, category) {
            return this.matchers[category].get(itemName);
        },
        isValidItem (item) {
            return item !== undefined;
        },
    },
};
