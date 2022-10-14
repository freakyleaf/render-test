<template>
    <div>
        <PageTitle>
            Tag: <code>{{ $route.params.name }}</code>
        </PageTitle>
        <ToolbarSticky>
            <ToolbarView
                :item="item"
                @click="editTag"
            />
        </ToolbarSticky>
        <ContainerGeneric :top-spacing="true">
            <TagTable
                :is-admin-app="true"
                :item="item"
            />
            <TagAttributes :item="item" />
            <hr>
            <ToolbarView
                :item="item"
                @click="editTag"
            />
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import router from '@/router';

import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';
import TagAttributes from '@shared/components/tag/ShTagAttributes.vue';
import TagTable from '@shared/components/tag/ShTagTable.vue';
import ToolbarSticky from '@/components/toolbar/ToolbarSticky.vue';
import ToolbarView from '@/components/toolbar/ToolbarView.vue';

export default {
    name: 'TagsView',
    components: {
        ContainerGeneric,
        PageTitle,
        TagAttributes,
        TagTable,
        ToolbarSticky,
        ToolbarView,
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
    beforeDestroy () {
        this.item = {};
    },
    methods: {
        editTag () {
            router.push(`/tags/${this.item.name}/edit`);
        },
    },
};
</script>
