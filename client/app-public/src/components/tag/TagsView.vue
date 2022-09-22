<template>
    <TagTable :item="item" />
</template>

<script>
import { mapGetters } from 'vuex';

import TagTable from '@shared/components/tag/ShTagTable.vue';

export default {
    name: 'TagsView',
    components: {
        TagTable,
    },
    data () {
        return {
            item: {},
        };
    },
    computed: {
        ...mapGetters({
            getTagByName: 'tag/getTagByName',
        }),
    },
    created () {
        this.item = this.getTagByName(this.$route.params.name);
    },
};
</script>
