export default {
    methods: {
        indefiniteArticleSwitch (value) {
            if (!value) return '';

            const startsWithVowel = /^[aieou].*/;

            value = value.toString();
            return value.match(startsWithVowel) ? 'an' : 'a';
        },
    },
};
