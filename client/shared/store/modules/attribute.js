import AttributeService from '@shared/services/attributeService';

const state = () => ({
    all: [],
});

const actions = {
    async getAllAttributes ({ commit }) {
        try {
            const allAttributes = await AttributeService.getAttributes();
            commit('setAllAttributes', allAttributes);
        } catch (error) {
            commit('error/setError', error, { root: true });
        }
    },
};

const getters = {
    getAttributeByName: (state) => (attributeName) => {
        return state.all.find(({ name }) => name === attributeName);
    },
    getAttributesByType: (state) => (attributeType) => {
        return state.all.filter(({ type }) => type === attributeType);
    },
};

const mutations = {
    setAllAttributes (state, allAttributes) {
        state.all = allAttributes;
    },
};

export default {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
};
