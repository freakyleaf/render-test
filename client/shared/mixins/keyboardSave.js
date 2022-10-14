export default {
    mounted () {
        document.addEventListener('keydown', event => this.doKeyboardSave(event, this.keyboardSave));
    },
    beforeDestroy () {
        document.removeEventListener('keydown', this.doKeyboardSave);
    },
    methods: {
        doKeyboardSave (event, doAction) {
            if (!(event.keyCode === 83 && (event.ctrlKey || event.metaKey))) { // ctrl + s
                return;
            }

            event.preventDefault();
            doAction();
        },
    },
};
