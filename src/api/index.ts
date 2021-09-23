import axios from 'axios';
import router from '../router';
import store from '../store/index';

axios.defaults.baseURL = '/api/';
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    store.commit('setauth');
                    router.replace({
                        path: '/login',
                    });
                    break;
                case 404:
                    router.replace({
                        path: '/404',
                    });
                    break;
            }
        } else {
            router.replace({
                path: '/404',
            });
        }
        return Promise.reject(error.response);
    }
);
export default axios;
