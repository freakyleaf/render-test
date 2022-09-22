import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewHome from '@/views/ViewHome.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ViewHome,
    },
    {
        path: '/attributes',
        name: 'Attributes',
        component: () => import(/* webpackChunkName: "attributes" */ '@/views/ViewAttributesList.vue'),
        meta: {
            category: 'attribute',
        },
    },
    {
        path: '/attributes/view/:name',
        name: 'View Attribute',
        component: () => import(/* webpackChunkName: "attributes" */ '@/views/ViewAttributesView.vue'),
        meta: {
            category: 'attribute',
        },
    },
    {
        path: '/tags',
        name: 'Tags',
        component: () => import(/* webpackChunkName: "tags" */ '@/views/ViewTagsList.vue'),
        meta: {
            category: 'tag',
        },
    },
    {
        path: '/tags/view/:name',
        name: 'View Tag',
        component: () => import(/* webpackChunkName: "tags" */ '@/views/ViewTagsView.vue'),
        meta: {
            category: 'tag',
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes,
    scrollBehavior () {
        window.scrollTo(0, 0);
    },
});

router.beforeEach((to, from, next) => {
    document.title = to.params.name
        ? `${to.name}: ${to.params.name} | Can I Attribute`
        : `${to.name} | Can I Attribute`;
    next();
});

export default router;
