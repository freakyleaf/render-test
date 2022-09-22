function dateParseHelper (str, printTime = false) {
    if (str) { // Sometimes we don't have anything to slice
        const parts = str.slice(0, -1).split('T');
        const [ dateComponent, timeComponent ] = parts;
        const [ timeComponentHourMinuteSecond ] = timeComponent.split('.');

        if (printTime) {
            return `${dateComponent} - ${timeComponentHourMinuteSecond}`;
        }
        return dateComponent;
    }
    return '';
}

export default {
    methods: {
        dateParse (date) {
            return dateParseHelper(date);
        },
    },
};
