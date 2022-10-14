import Vue from 'vue';
import Vuex from 'vuex';

import attribute from './modules/attribute';
import error from './modules/error';
import loading from './modules/loading';
import modal from './modules/modal';
import tag from './modules/tag';
import toast from './modules/toast';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        attribute,
        error,
        loading,
        modal,
        tag,
        toast,
    },
});
