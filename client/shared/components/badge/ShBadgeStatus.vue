<template>
    <span>
        <BadgeError v-if="status === 'danger'" />
        <BadgeSuccess v-if="status === 'success'" />
        <BadgeUnacknowledged v-if="status === 'unacknowledged'" />
        <BadgeWarning v-if="status === 'warning'" />
    </span>
</template>

<script>
import BadgeError from '@shared/components/badge/ShBadgeError.vue';
import BadgeSuccess from '@shared/components/badge/ShBadgeSuccess.vue';
import BadgeUnacknowledged from '@shared/components/badge/ShBadgeUnacknowledged.vue';
import BadgeWarning from '@shared/components/badge/ShBadgeWarning.vue';

export default {
    name: 'ShBadgeStatus',
    components: {
        BadgeError,
        BadgeSuccess,
        BadgeUnacknowledged,
        BadgeWarning,
    },
    props: {
        status: {
            type: String,
            required: true,
            validator: (value) => {
                return [ 'danger', 'success', 'unacknowledged','warning' ].includes(value);
            },
        },
    },
};
</script>
