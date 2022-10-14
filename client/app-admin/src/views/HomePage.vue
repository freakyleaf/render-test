<template>
    <div class="view-home">
        <PageTitle>
            Home
        </PageTitle>
        <ContainerGeneric>
            <h2>Vital Stats</h2>
            <table class="table">
                <tbody>
                    <tr>
                        <th
                            class="table-accent"
                            scope="row"
                        >
                            Total Attributes
                        </th>
                        <td>
                            {{ totalAttributes }}
                        </td>
                        <td>
                            <div class="bar-chart">
                                <span
                                    v-for="attribute in totalAttributesByType"
                                    :key="attribute.typeName"
                                    class="bar-chart_item"
                                    :style="`width: ${attribute.typePercent}%`"
                                    :title="`${attribute.typeName}: ${attribute.typeCount} (${attribute.typePercent}%)`"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th
                            class="table-accent"
                            scope="row"
                        >
                            Total Tags
                        </th>
                        <td>
                            {{ totalTags }}
                        </td>
                        <td>
                            <div class="bar-chart">
                                <span
                                    v-for="tag in totalTagsByType"
                                    :key="tag.typeName"
                                    class="bar-chart_item"
                                    :style="`width: ${tag.typePercent}%`"
                                    :title="`${tag.typeName}: ${tag.typeCount} (${tag.typePercent}%)`"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th
                            class="table-accent"
                            scope="row"
                        >
                            Total Vs
                        </th>
                        <td>
                            {{ totalVs }}
                        </td>
                        <td>
                            <div class="bar-chart">
                                <span
                                    class="bar-chart_item"
                                    style="width: 100%"
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th
                            class="table-accent"
                            scope="row"
                        >
                            Total Acknowledged
                        </th>
                        <td>
                            {{ vsAcknowledged }}
                        </td>
                        <td class="col-6">
                            <div class="bar-chart">
                                <span
                                    class="bar-chart_item"
                                    :style="`width: ${vsAcknowledgedPercent}%`"
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ContainerGeneric>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import attributeTypes from '@shared/constants/attributeTypes';
import tagTypes from '@shared/constants/tagTypes';

import ContainerGeneric from '@shared/components/layout/ShContainerGeneric.vue';
import PageTitle from '@shared/components/layout/ShPageTitle.vue';

export default {
    name: 'ViewHome',
    components: {
        ContainerGeneric,
        PageTitle,
    },
    data () {
        return {
            types: {
                attribute: attributeTypes,
                tag: tagTypes,
            },
        };
    },
    computed: {
        ...mapState({
            attributes: state => state.attribute.all,
            tags: state => state.tag.all,
        }),
        totalAttributes () {
            return this.attributes.filter(({ type }) => type === 'global' || type === 'regular').length;
        },
        totalAttributesByType () {
            return this.types.attribute.map(({ kebab, pretty }) => {
                const typeCount = this.typeCount(kebab, 'attributes');
                return {
                    typeCount: typeCount,
                    typeName: pretty,
                    typePercent: ((typeCount / this.totalAttributes) * 100).toFixed(2),
                };
            }).filter(el => el.typePercent > 0);
        },
        totalTags () {
            return this.tags.length;
        },
        totalTagsByType () {
            return this.types.tag.map(({ kebab, pretty }) => {
                const typeCount = this.typeCount(kebab, 'tags');
                return {
                    typeCount: typeCount,
                    typeName: pretty,
                    typePercent: ((typeCount / this.totalTags) * 100).toFixed(2),
                };
            }).filter(el => el.typePercent > 0);
        },
        totalAcknowledged () {
            let counter = 0;

            this.tags.forEach(tag => {
                if (tag.attributes) {
                    tag.attributes.forEach(attribute => {
                        if (attribute.isActive) {
                            counter ++;
                        }
                    });
                }
            });

            return counter;
        },
        totalVs () {
            return this.totalAttributes * this.totalTags;
        },
        vsAcknowledgedPercent () {
            return ((this.totalAcknowledged / this.totalVs) * 100).toFixed(2);
        },
        vsAcknowledged () {
            return `${this.totalAcknowledged} (~${this.vsAcknowledgedPercent}%)`;
        },
    },
    methods: {
        typeCount (type, category) {
            return this[category].reduce((n, tag) => {
                return n + (tag.type === type);
            }, 0);
        },
    },
};
</script>

<style scoped>
.bar-chart {
    display: flex;
    width: 100%;
    height: 1.5em;
    border: 1px solid var(--bs-border-color);
}

.bar-chart_item {
    height: 100%;
}

.bar-chart_item:nth-child(1) {
    background-color: #0284C7;
}

.bar-chart_item:nth-child(2) {
    background-color: #7C3AED;
}

.bar-chart_item:nth-child(3) {
    background-color: #DB2777;
}

.bar-chart_item:nth-child(4) {
    background-color: #EA580C;
}

.bar-chart_item:nth-child(5) {
    background-color: #65A30D;
}

.bar-chart_item:nth-child(6) {
    background-color: #0D9488;
}

.bar-chart_item:nth-child(7) {
    background-color: #2563EB;
}

.bar-chart_item:nth-child(8) {
    background-color: #9333EA;
}

.bar-chart_item:nth-child(9) {
    background-color: #E11D48;
}

.bar-chart_item:nth-child(10) {
    background-color: #D97706;
}

.bar-chart_item:nth-child(11) {
    background-color: #16A34A;
}

.bar-chart_item:nth-child(12) {
    background-color: #0891B2;
}

.bar-chart_item:nth-child(13) {
    background-color: #4F46E5;
}

.bar-chart_item:nth-child(14) {
    background-color: #C026D3;
}

.bar-chart_item:nth-child(15) {
    background-color: #DC2626;
}
</style>
