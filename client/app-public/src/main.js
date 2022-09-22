import Vue from 'vue';
import Vuelidate from 'vuelidate';

import App from '@/App.vue';
import router from '@/router';
import store from '@shared/store';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
