<template>
    <div>
        <PageTitle>
            Attribute: <code>{{ $route.params.name }}</code>
        </PageTitle>
        <ToolbarSticky>
            <ToolbarView
                :item="item"
                @click="editAttribute"
            />
        </ToolbarSticky>
        <ContainerGeneric :top-spacing="true">
            <AttributeTable
                :is-admin-app="true"
                :item="item"
            />
            <template v-if="item.codepen">
                <h2 class="h4">
                    CodePen Example
                </h2>
                <CodePenEmbed :code-pen-id="item.codepen" />
            </template>
            <hr>
            <ToolbarView
                :item="item"
                @click="editAttribute"
            />
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import router from '@/router';

import AttributeTable from '@shared/components/attribute/ShAttributeTable.vue';
import CodePenEmbed from '@shared/components/vs/ShCodePenEmbed.vue';
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';
import ToolbarSticky from '@/components/toolbar/ToolbarSticky.vue';
import ToolbarView from '@/components/toolbar/ToolbarView.vue';

export default {
    name: 'AttributesView',
    components: {
        AttributeTable,
        CodePenEmbed,
        ContainerGeneric,
        PageTitle,
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
            getAttributeByName: 'attribute/getAttributeByName',
        }),
    },
    created () {
        this.item = this.getAttributeByName(this.$route.params.name);
    },
    beforeDestroy () {
        this.item = {};
    },
    methods: {
        editAttribute () {
            router.push(`/attributes/${this.item.name}/edit`);
        },
    },
};
</script>
