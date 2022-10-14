const state = () => ({
    modals: [],
});

const actions = {
    openModal ({ commit }, payload) {
        const modal = {
            component: payload.component,
            meta: payload.meta,
        };
        commit('addModal', modal);
    },
    closeModal ({ commit, getters }) {
        if (getters.activeModal === null) return;
        commit('removeModal');
    },
};

const getters = {
    activeModal: (state) => {
        if (!state.modals) return null;
        return state.modals.at(-1);
    },
};

const mutations = {
    addModal (state, modal) {
        state.modals.push(modal);
    },
    removeModal (state) {
        state.modals.pop();
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
