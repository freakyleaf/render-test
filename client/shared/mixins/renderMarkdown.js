import { marked } from 'marked';

export default {
    methods: {
        renderMarkdown (text, inline) {
            if (inline) {
                return marked.parseInline(text);
            }
            return marked.parse(text);
        },
    },
};
