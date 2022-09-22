import TagService from '@shared/services/tagService';

const state = () => ({
    all: [],
});

const actions = {
    async getAllTags ({ commit }) {
        try {
            const allTags = await TagService.getTags();
            commit('setAllTags', allTags);
        } catch (error) {
            commit('error/setError', error, { root: true });
        }
    },
};

const getters = {
    getTagByName: (state) => (tagName) => {
        return state.all.find(({ name }) => name === tagName);
    },
    getTagsByType: (state) => (tagType) => {
        return state.all.filter(({ type }) => type === tagType);
    },
};

const mutations = {
    setAllTags (state, allTags) {
        state.all = allTags;
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
