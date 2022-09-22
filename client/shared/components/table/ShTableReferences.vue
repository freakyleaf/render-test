<template>
    <table class="table table-light mb-0">
        <thead>
            <tr>
                <th>
                    Reference Name
                </th>
                <th>
                    Reference URL
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="reference in references"
                :key="reference.name"
            >
                <td>
                    {{ reference.name }}
                </td>
                <td>
                    <a
                        class="reference-url"
                        :href="reference.url"
                        target="_blank"
                    >
                        {{ reference.url }}
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'ShTableReferences',
    props: {
        references: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style scoped>
.reference-url {
    word-break: break-word;
}
</style>
