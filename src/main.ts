import { createApp } from 'vue';
const VueGravatar = require('vue3-gravatar'); ;
const litepieDatepicker = require('vue-litepie-datepicker');
import router from './router/index';
import store from './store/index';
import App from './App.vue';
import axios from './api/index';
import './index.css';
const app = createApp(App);

router.beforeEach(async (to, from) => {
    if (to.meta.requireAuth) {
        if (store.getters.isLogin) {
            return true;
        } else {
            return '/login';
        }
    }
});

app.config.globalProperties.axios = axios;
app.use(VueGravatar)
    .use(litepieDatepicker)
    .use(router)
    .use(store)
    .mount('#app');
