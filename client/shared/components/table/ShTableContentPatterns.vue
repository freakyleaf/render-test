<template>
    <table class="table mb-0">
        <thead>
            <tr class="table-accent-alt">
                <th scope="col">
                    Reference
                </th>
                <th scope="col">
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
                <td class="font-monospace">
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
