import Vue from 'vue';
import VueRouter from 'vue-router';

import urlFragmentDedicatedPage from '@shared/constants/urlFragmentDedicatedPage';
import urlFragmentQuickSearch from '@shared/constants/urlFragmentQuickSearch';

import HomePage from '@/views/HomePage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            mode: 'home',
        },
    },
    {
        path: `/${urlFragmentQuickSearch}/:attribute/:tag`,
        name: 'HomeQuickSearch',
        component: HomePage,
        meta: {
            mode: 'home-quick-search',
        },
    },
    {
        path: '/attributes',
        name: 'Attributes',
        component: () => import(/* webpackChunkName: "attributes" */ '@/views/attribute/AttributesList.vue'),
        meta: {
            category: 'attribute',
            mode: 'list',
        },
    },
    {
        path: '/attributes/add',
        name: 'Add Attribute',
        component: () => import(/* webpackChunkName: "attributes" */ '@/views/attribute/AttributesAdd.vue'),
        meta: {
            category: 'attribute',
            mode: 'add',
        },
    },
    {
        path: '/attributes/:name/edit',
        name: 'Edit Attribute',
        component: () => import(/* webpackChunkName: "attributes" */ '@/views/attribute/AttributesEdit.vue'),
        meta: {
            category: 'attribute',
            mode: 'edit',
        },
    },
    {
        path: '/attributes/:name',
        name: 'Attribute',
        component: () => import(/* webpackChunkName: "attributes" */ '@/views/attribute/AttributesView.vue'),
        meta: {
            category: 'attribute',
            mode: 'view',
        },
    },
    {
        path: '/tags',
        name: 'Tags',
        component: () => import(/* webpackChunkName: "tags" */ '@/views/tag/TagsList.vue'),
        meta: {
            category: 'tag',
            mode: 'list',
        },
    },
    {
        path: '/tags/add',
        name: 'Add Tag',
        component: () => import(/* webpackChunkName: "tags" */ '@/views/tag/TagsAdd.vue'),
        meta: {
            category: 'tag',
            mode: 'add',
        },
    },
    {
        path: '/tags/:name/edit',
        name: 'Edit Tag',
        component: () => import(/* webpackChunkName: "tags" */ '@/views/tag/TagsEdit.vue'),
        meta: {
            category: 'tag',
            mode: 'edit',
        },
    },
    {
        path: '/tags/:name',
        name: 'Tag',
        component: () => import(/* webpackChunkName: "tags" */ '@/views/tag/TagsView.vue'),
        meta: {
            category: 'tag',
            mode: 'view',
        },
    },
    {
        path: `/${urlFragmentDedicatedPage}/:attribute/:tag`,
        name: 'Attribute + Tag',
        component: () => import(/* webpackChunkName: "vs" */ '@/views/VsPage.vue'),
        meta: {
            mode: urlFragmentDedicatedPage,
        },
    },
    {
        path: '/notes',
        name: 'Notes',
        component: () => import(/* webpackChunkName: "notes" */ '@/views/NotesPage.vue'),
        meta: {
            mode: 'notes',
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes,
    scrollBehavior: function (to) {
        if (to.hash) {
            setTimeout(() => {
                const element = document.getElementById(to.hash.replace(/#/, ''));
                if (element && element.scrollIntoView) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                    });
                }
            }, 500);
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behaviour: 'instant',
        });
    },
});

const appName = 'Can I Attribute';

function buildTitle (to) {
    if (to.meta.mode === 'edit' || to.meta.mode === 'view') {
        return `${to.name}: ${to.params.name} | ${appName}`;
    }

    if (to.meta.mode === urlFragmentDedicatedPage) {
        return `${to.params.attribute} + ${to.params.tag} | ${appName}`;
    }

    return `${to.name} | ${appName}`;
}

router.beforeEach((to, from, next) => {
    document.title = buildTitle(to);
    next();
});

export default router;
