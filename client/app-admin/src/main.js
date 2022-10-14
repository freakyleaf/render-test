import Vue from 'vue';
import Vuelidate from 'vuelidate';

import App from '@/App.vue';
import router from '@/router';
import store from '@shared/store';

import codePen from '@shared/directives/codePen';

// const env = import.meta.env.PUBLIC_ENV;

Vue.use(codePen);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

// if (env === 'development') {
//     Vue.config.errorHandler = function (error) {
//         store.commit('error/setError', error);
//         throw new Error(error);
//     };

//     window.onerror = function (message, url, line, column, error) {
//         store.commit('error/setError', error);
//         throw new Error(error);
//     };
// }

import ToolbarFormUtilityConfirmRemoveModal from '@/components/toolbar/ToolbarFormUtilityConfirmRemoveModal.vue';

Vue.component('ToolbarFormUtilityConfirmRemoveModal', ToolbarFormUtilityConfirmRemoveModal);

// Modal body scroll lock setup
window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
