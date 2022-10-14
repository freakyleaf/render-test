<template>
    <ul class="list-unstyled list-unstyled__striped mb-3">
        <h3 class="h6 mb-3">
            {{ title }}
        </h3>
        <li
            v-for="attribute in attributes"
            :key="attribute._id"
            class="list-item p-3 mb-3"
        >
            <InputAttributeIsActive
                :checked="attribute.isActive"
                :name="attribute.name"
                :visible="attribute.isVisible"
                @attributeIsActive="(value) => {
                    $emit('attributeIsActive', {
                        index: attribute.index,
                        value: value,
                    });
                    if (value === true) {
                        $emit('attributeIsVisible', {
                            index: attribute.index,
                        });
                    }
                }"
                @attributeIsVisible="$emit('attributeIsVisible', {
                    index: attribute.index,
                })"
            >
                <TagSharedAttributesItem
                    v-show="attribute.isVisible"
                    :attribute="attribute"
                    :tag="tag"
                    @attributeSubformInput="(value) => $emit('attributeSubformInput', value)"
                />
            </InputAttributeIsActive>
        </li>
    </ul>
</template>

<script>
import InputAttributeIsActive from '@/components/form/InputAttributeIsActive.vue';
import TagSharedAttributesItem from '@/components/tag/TagsSharedAttributesItem.vue';

export default {
    name: 'TagsEditAttributes',
    components: {
        InputAttributeIsActive,
        TagSharedAttributesItem,
    },
    props: {
        attributes: {
            type: Array,
            default: () => [],
            required: true,
        },
        tag: {
            type: Object,
            default: () => {},
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
