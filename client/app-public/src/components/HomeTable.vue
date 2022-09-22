<template>
    <div class="table-responsive">
        <h3>{{ title }}</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th />
                    <th
                        v-for="tag in tags"
                        :key="tag._id"
                        scope="col"
                    >
                        <router-link
                            :to="`tags/view/${tag.name}`"
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
                        class="col-md-3"
                        scope="row"
                    >
                        <router-link
                            :to="`attributes/view/${attribute.name}`"
                        >
                            {{ attribute.name }}
                        </router-link>
                    </th>
                    <td
                        v-for="tag in tags"
                        :key="tag._id"
                        class="cell p-0"
                        :class="`table-${badgeStatus(attribute, tag)}`"
                    >
                        <span
                            class="info"
                            @click="$emit('doInfo', {
                                attribute: attribute,
                                tag: tag,
                            })"
                        >
                            Info
                        </span>
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
}
</style>

<style scoped>
.table-unacknowledged {
    color: var(--bs-white) !important;
    --bs-table-striped-bg: var(--bs-primary);
    --bs-table-accent-bg: var(--bs-primary);
}
</style>
