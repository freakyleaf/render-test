import { mapActions, mapMutations, mapState } from 'vuex';

export default {
    data () {
        return {
            focusItemName: false,
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
        }),
    },
    methods: {
        ...mapActions({
            getAllAttributes: 'attribute/getAllAttributes', // Required to fetch updated data once an edit has been saved
        }),
        ...mapMutations({
            setError: 'error/setError',
            setLoading: 'loading/setLoading',
        }),
        attributeIsActive ({ index, value }) {
            this.$set(this.attributes[index], 'isActive',  value);
        },
        attributeIsVisible ({ index }) {
            this.$set(this.attributes[index], 'isVisible', !this.attributes[index].isVisible);
        },
        attributeSubformInput ({ attribute, key, value }) {
            this.attributes.find(({ name }) => name === attribute).subform[key] = value;
        },
        buildTagAttributes () {
            const activeAttributes = this.attributes.filter(({ isActive }) => isActive === true);

            return activeAttributes.map(attribute => {
                return {
                    _id: attribute._id,
                    isActive: attribute.isActive,
                    isVisible: attribute.isVisible,
                    name: attribute.name,
                    subform: attribute.subform,
                    type: attribute.type,
                };
            });
        },
        contentPatternAdd () {
            this.item.contentPatterns.push({
                reference: '',
                content: '',
            });
        },
        contentPatternRemove (index) {
            this.item.contentPatterns.splice(index, 1);
        },
        async focusItemNameInput () {
            await this.$nextTick();
            this.$refs.InputName.$refs.itemNameInput.focus();
        },
        referenceAdd () {
            this.item.references.push({
                name: '',
                url: '',
            });
        },
        referenceRemove (index) {
            this.item.references.splice(index, 1);
        },
    },
    watch: {
        focusItemName () {
            if (this.focusItemName) {
                this.focusItemNameInput();
            }
        },
    },
};
