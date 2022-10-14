const toastTimeout = (callback) => setTimeout(callback, 2000);

const state = () => ({
    toasts: {
        active: null,
        queue: [],
        timeoutId: null,
    },
});

const actions = {
    createToast ({ commit, dispatch, state }, payload) {
        const toast = {
            text: payload.text,
            theme: payload.theme || 'success',
        };

        commit('enqueueToast', toast);

        if (!state.toasts.active) {
            dispatch('processToastQueue'); // Start the timeout
        }
    },
    processToastQueue ({ commit, dispatch, state }) {
        if (!state.toasts.queue.length && !state.toasts.active) {
            return;
        }

        if (!state.toasts.queue.length && state.toasts.active) {
            return toastTimeout(() => commit('resetToast'));
        }

        const timeoutId = toastTimeout(() => {
            commit('clearActiveToast');
            dispatch('processToastQueue');
        });

        commit('dequeueToast', { timeoutId });
    },
};

const getters = {
    activeToast: (state) => state.toasts.active,
};

const mutations = {
    clearActiveToast (state) {
        state.toasts.active = null; // Required to destroy the view and restart the transition
    },
    dequeueToast (state, { timeoutId }) {
        const [ active, ...queue ] = state.toasts.queue;
        state.toasts = {
            active,
            queue,
            timeoutId,
        };
    },
    enqueueToast (state, toast) {
        state.toasts.queue.push(toast);
    },
    resetToast (state, { timeoutId } = state.toasts) {
        if (timeoutId) clearTimeout(timeoutId);
        state.toasts = {
            active: null,
            queue: [],
            timeoutId: null,
        };
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
