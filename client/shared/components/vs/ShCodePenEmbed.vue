<template>
    <div
        id="code-pen-example"
        class="code-pen-embed"
    >
        <div class="mb-3">
            <div v-code-pen="codePenOptions" />
        </div>
        <a
            :href="`${urlCodePen}${codePenId}`"
            target="_blank"
        >
            Edit this example on CodePen
        </a>
        <IconExternalLink />
    </div>
</template>

<script>
import urlCodePen from '@shared/constants/urlCodePen';

import IconExternalLink from '@shared/components/icons/IconExternalLink.vue';

export default {
    name: 'ShCodePenEmbed',
    components: {
        IconExternalLink,
    },
    props: {
        codePenId: {
            type: String,
            default: '',
        },
    },
    data () {
        return {
            urlCodePen: urlCodePen,
            codePenOptions: {
                'class': 'codepen',
                'data-default-tab': 'html,result',
                'data-embed-version': '2',
                'data-height': 500,
                'data-slug-hash': this.codePenId,
                'data-theme-id': 0,
                'data-user': 'caniattribute',
            },
        };
    },
};
</script>
