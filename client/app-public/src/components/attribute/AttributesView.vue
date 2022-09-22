<template>
    <AttributeTable :item="item" />
</template>

<script>
import { mapGetters } from 'vuex';

import AttributeTable from '@shared/components/attribute/ShAttributeTable.vue';

export default {
    name: 'AttributesView',
    components: {
        AttributeTable,
    },
    data () {
        return {
            item: {},
        };
    },
    computed: {
        ...mapGetters({
            getAttributeByName: 'attribute/getAttributeByName',
        }),
    },
    created () {
        this.item = this.getAttributeByName(this.$route.params.name);
    },
};
</script>
