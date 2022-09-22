<template>
    <nav
        id="nav"
        class="navbar navbar-expand-lg navbar-light bg-light mb-3"
    >
        <div class="container">
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
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'SiteNavigation',
};
</script>

<style scoped>
    .router-link-exact-active {
        font-weight: 700;
    }
</style>
