<template>
    <nav
        id="nav"
        class="navbar navbar-expand-lg navbar-light bg-light-alt mb-3"
    >
        <ContainerGeneric>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        to="/"
                    >
                        Home
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        to="/attributes"
                    >
                        Attributes
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        to="/tags"
                    >
                        Tags
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        to="/attributes/add"
                    >
                        Add Attribute
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        to="/tags/add"
                    >
                        Add Tag
                    </router-link>
                </li>
            </ul>
            <span>Admin</span>
        </ContainerGeneric>
    </nav>
</template>

<script>
import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';

export default {
    name: 'SiteNavigation',
    components: {
        ContainerGeneric,
    },
};
</script>

<style scoped>
.navbar {
    z-index: 1;
    position: sticky;
    top: 0;
    border-bottom: 1px solid var(--cia-border-color-alt);
}

.navbar-nav {
    margin-left: calc(var(--bs-navbar-nav-link-padding-x) * -1);
}

.router-link-exact-active {
    font-weight: 700;
}
</style>
