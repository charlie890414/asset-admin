import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default new Vuex.Store({
    state: {
        auth: false,
        user: null,
        sideBarOpen: false,
    },
    getters: {
        isLogin: (state) => {
            return state.auth;
        },
        getUser: (state) => {
            return state.user;
        },
        sideBarOpen: (state) => {
            return state.sideBarOpen;
        },
    },
    mutations: {
        setauth(state, user) {
            state.auth = true;
            state.user = user;
        },
        unauth(state) {
            state.auth = false;
        },
        toggleSidebar(state) {
            state.sideBarOpen = !state.sideBarOpen;
        },
    },
    plugins: [createPersistedState()],
});
