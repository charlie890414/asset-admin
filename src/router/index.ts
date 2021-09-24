import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: { name: 'DashboardHome' } },
        {
            path: '/login',
            name: 'Login',
            component: () => import('/src/pages/Login.vue'),
        },
        {
            path: '/signup',
            name: 'Signup',
            component: () => import('/src/pages/Signup.vue'),
        },
        {
            path: '/dashboard',
            component: () => import('/src/components/Dashboard.vue'),
            meta: {
                requireAuth: true,
            },
            children: [
                {
                    path: 'home',
                    name: 'DashboardHome',
                    component: () => import('/src/pages/Home.vue'),
                },
            ],
        },
        {
            path: '/404',
            name: '404',
            component: () => import('/src/pages/404.vue'),
        },
        { path: '/:pathMatch(.*)*', redirect: { name: '404' } },
    ],
});

export default router;
