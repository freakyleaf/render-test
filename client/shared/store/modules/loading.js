const state = () => ({
    loading: false,
    loadingGlobal: false,
});

const mutations = {
    setLoading (state, value) {
        state.loading = value;
    },
    setLoadingGlobal (state, value) {
        state.loadingGlobal = value;
    },
};

export default {
    namespaced: true,
    mutations,
    state,
};
