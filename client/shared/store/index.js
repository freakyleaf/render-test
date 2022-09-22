import Vue from 'vue';
import Vuex from 'vuex';

import attribute from './modules/attribute';
import error from './modules/error';
import loading from './modules/loading';
import tag from './modules/tag';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        attribute,
        error,
        loading,
        tag,
    },
});
