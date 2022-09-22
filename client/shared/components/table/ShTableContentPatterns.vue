<template>
    <table class="table table-light mb-0">
        <thead>
            <tr>
                <th>
                    Reference
                </th>
                <th>
                    Content
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="contentPattern in contentPatterns"
                :key="contentPattern.reference"
            >
                <td>
                    <code>[pattern-{{ category }}={{ contentPattern.reference }}]</code>
                </td>
                <td>
                    {{ contentPattern.content }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'ShTableContentPatterns',
    props: {
        contentPatterns: {
            type: Array,
            default: () => [],
        },
    },
    data () {
        return {
            category: this.$route.meta.category,
        };
    },
};
</script>
