export default {
    methods: {
        contentPatternInject ({
            attributeName,
            contentPatterns,
            contentRaw,
            tagName,
        }) {
            // Swap out `[a|an]` in attribute content patterns for 'a' or 'an' depending on whether the tag starts with a vowel
            function indefiniteArticleSwitch (content) {
                const startsWithVowel = /^[aieou].*/;
                const indefiniteArticlePattern = '[a|an]';
                return tagName.match(startsWithVowel) ? content.replaceAll(indefiniteArticlePattern, 'an') : content.replaceAll(indefiniteArticlePattern, 'a');
            }

            const patterns = [];

            contentPatterns.forEach(contentPattern => {
                for (const [ category, values ] of Object.entries(contentPattern)) {
                    values.forEach(({ content, reference }) => {
                        patterns.push({
                            content: category === 'attribute' ? indefiniteArticleSwitch(content) : content,
                            reference: `[pattern-${category}=${reference}]`,
                        });
                    });
                }
            });

            function doContentPatternInject (output, patternCount) {
                if (output.includes(patterns[patternCount].reference)) {
                    const content = patterns[patternCount].content
                        .replaceAll('[attribute]', attributeName)
                        .replaceAll('[tag]', tagName);

                    output = output.replaceAll(patterns[patternCount].reference, content);
                }

                patternCount ++;

                if (patternCount === patterns.length) return output;
                return doContentPatternInject(output, patternCount);
            }

            if (contentRaw.length === 0 || patterns.length === 0) return; // Exit early for `/tag/add` journeys

            return doContentPatternInject(contentRaw, 0);
        },
    },
};
