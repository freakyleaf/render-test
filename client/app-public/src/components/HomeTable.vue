<template>
    <div>
        <h3 class="mb-3">
            {{ title }}
        </h3>
        <table class="table table-striped table-bordered table-with-sticky-header">
            <thead>
                <tr>
                    <th />
                    <th
                        v-for="tag in tags"
                        :id="`tag-${tag.name}`"
                        :key="tag._id"
                        class="text-center"
                        scope="col"
                    >
                        <router-link
                            :to="`/tags/${tag.name}`"
                        >
                            {{ tag.name }}
                        </router-link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="attribute in attributes"
                    :key="attribute._id"
                >
                    <th
                        :id="`attribute-${attribute.name}`"
                        class="col-md-3"
                        scope="row"
                    >
                        <router-link
                            :to="`/attributes/${attribute.name}`"
                        >
                            {{ attribute.name }}
                        </router-link>
                    </th>
                    <td
                        v-for="tag in tags"
                        :key="tag._id"
                        class="cell p-0"
                        :class="`table-${badgeStatus(attribute, tag)}`"
                        :headers="`attribute-${attribute.name} tag-${tag.name}`"
                    >
                        <a
                            class="info"
                            href="#"
                            @click.prevent="$emit('tableItemClick', {
                                attribute: attribute,
                                tag: tag,
                            })"
                        >
                            Info
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import badgeStatus from '@shared/mixins/badgeStatus';

export default {
    name: 'HomeTable',
    mixins: [
        badgeStatus,
    ],
    props: {
        attributes: {
            type: Array,
            default: () => [],
            required: true,
        },
        tags: {
            type: Array,
            default: () => [],
            required: true,
        },
        title: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>

<style scoped>
.cell {
    position: relative;
}
.info {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: var(--bs-white);
    text-decoration: none;
}

.table-with-sticky-header {
    position: relative;
}

.table-with-sticky-header thead {
    z-index: 5;
    position: sticky;
    inset-block-start: 0; /* "top" */
    background-color: var(--bs-white);
}

.table-unacknowledged {
    color: var(--bs-white) !important;
    --bs-table-striped-bg: var(--bs-primary);
    --bs-table-accent-bg: var(--bs-primary);
}
</style>
