<template>
    <div>
        <h3 class="h6 mt-1 mb-3">
            {{ title }}
        </h3>
        <table class="table table-light">
            <thead>
                <tr>
                    <th>
                        Attribute Name
                    </th>
                    <th>
                        Has effect
                    </th>
                    <th>
                        Notes
                    </th>
                </tr>
            </thead>
            <tbody>
                <TagTableAttributesRow
                    v-for="attribute in attributes"
                    :key="attribute.name"
                    :attribute="attribute"
                    :tag="tag"
                />
            </tbody>
        </table>
    </div>
</template>

<script>
import TagTableAttributesRow from '@shared/components/tag/ShTagTableAttributesRow.vue';

export default {
    name: 'ShTagTableAttributes',
    components: {
        TagTableAttributesRow,
    },
    props: {
        attributes: {
            type: Array,
            default: () => [],
        },
        tag: {
            type: Object,
            default: () => {},
        },
        title: {
            type: String,
            default: '',
        },
    },
};
</script>
