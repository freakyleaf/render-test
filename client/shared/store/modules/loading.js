const state = () => ({
    loading: false,
});

const mutations = {
    setLoading (state, value) {
        state.loading = value;
    },
};

export default {
    namespaced: true,
    mutations,
    state,
};
