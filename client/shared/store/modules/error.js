const state = () => ({
    errorMessage: '',
});

const mutations = {
    setError (state, error) {
        state.errorMessage = error;
        throw new Error(error);
    },
    unsetError (state) {
        state.errorMessage = '';
    },
};

export default {
    namespaced: true,
    mutations,
    state,
};
