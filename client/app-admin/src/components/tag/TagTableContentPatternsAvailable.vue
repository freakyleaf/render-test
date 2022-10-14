<template>
    <div class="mb-3">
        <div
            v-if="attributeContentPatterns.length"
            class="mb-3"
        >
            <h6>Attribute content patterns available:</h6>
            <ul class="list-unstyled">
                <li
                    v-for="contentPattern in attributeContentPatterns"
                    :key="contentPattern.reference"
                    class="content-patterns-available-list-item"
                >
                    <div class="button-code-combo">
                        <ButtonGeneric
                            class="button"
                            size="sm"
                            text="Add Pattern"
                            theme="dark"
                            @click="$emit('addContentPatternToNotes', `[pattern-attribute=${contentPattern.reference}]`)"
                        />
                        <code
                            role="button"
                            @click="$emit('addContentPatternToNotes', `[pattern-attribute=${contentPattern.reference}]`)"
                        >
                            [pattern-attribute={{ contentPattern.reference }}]
                        </code>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="tagContentPatterns.length">
            <h6>Tag content patterns available:</h6>
            <ul class="list-unstyled">
                <li
                    v-for="contentPattern in tagContentPatterns"
                    :key="contentPattern.reference"
                    class="content-patterns-available-list-item"
                >
                    <div class="button-code-combo">
                        <ButtonGeneric
                            class="button"
                            size="sm"
                            text="Add Pattern"
                            theme="dark"
                            @click="$emit('addContentPatternToNotes', `[pattern-tag=${contentPattern.reference}]`)"
                        />
                        <code
                            role="button"
                            @click="$emit('addContentPatternToNotes', `[pattern-tag=${contentPattern.reference}]`)"
                        >
                            [pattern-tag={{ contentPattern.reference }}]
                        </code>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ButtonGeneric from '@shared/components/form/ShButtonGeneric.vue';

export default {
    name: 'TagTableContentPatternsAvailable',
    components: {
        ButtonGeneric,
    },
    props: {
        attributeContentPatterns: {
            type: Array,
            default: () => [],
        },
        tagContentPatterns: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style scoped>
.content-patterns-available-list-item:not(:last-of-type) {
    margin-bottom: 0.5rem;
}

.button-code-combo {
    display: flex;
    align-items: center;
}

.button-code-combo .button {
    margin-right: 1rem;
}
</style>
