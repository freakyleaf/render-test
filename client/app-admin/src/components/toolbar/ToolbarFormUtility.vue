<template>
    <div
        class="btn-toolbar justify-content-between"
        role="toolbar"
    >
        <div>
            <button
                class="btn btn-primary"
                :disabled="v.$invalid"
                @click.prevent="$emit(`${action}${capitalizeCategory}`)"
            >
                {{ capitalizeAction }} {{ capitalizeCategory }}
            </button>
            <!-- eslint-disable vue/max-attributes-per-line -->
            <code v-if="item?.name" class="mx-3">{{ item.name }}</code>
            <!-- eslint-enable vue/max-attributes-per-line -->
        </div>
        <div>
            <ButtonPlusMinus
                v-if="category === 'tag'"
                class="mx-3"
                :is-plus="globalVisibility"
                text-minus="Show all"
                text-plus="Hide all"
                @click="toggleGlobalVisibility"
            />
            <button
                v-if="action === 'update'"
                class="btn btn-danger"
                @click.prevent="confirmRemove"
            >
                Remove {{ capitalizeCategory }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

import capitalize from '@shared/mixins/capitalize';

import ButtonPlusMinus from '@/components/form/ButtonPlusMinus.vue';

export default {
    name: 'ToolbarFormUtility',
    components: {
        ButtonPlusMinus,
    },
    mixins: [
        capitalize,
    ],
    props: {
        action: {
            type: String,
            default: '',
            required: true,
            validator: (value) => {
                return [ 'add', 'update' ].includes(value);
            },
        },
        category: {
            type: String,
            default: '',
            required: true,
            validator: (value) => {
                return [ 'attribute', 'tag' ].includes(value);
            },
        },
        item: {
            type: Object,
            default: () => {},
        },
        v: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            globalVisibility: false,
        };
    },
    computed: {
        capitalizeAction () {
            return this.capitalize(this.action);
        },
        capitalizeCategory () {
            return this.capitalize(this.category);
        },
    },
    methods: {
        ...mapActions({
            openModal: 'modal/openModal',
        }),
        confirmRemove () {
            this.openModal({
                component: 'ToolbarFormUtilityConfirmRemoveModal',
                meta: {
                    name: this.item.name,
                },
            });
        },
        toggleGlobalVisibility () {
            this.globalVisibility = !this.globalVisibility;
            this.$emit('globalVisibility', this.globalVisibility);
        },
    },
};
</script>
