import { createRouter, createWebHistory } from "vue-router";
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import Accueil from './pages/Accueil.vue';
import Account from './pages/Account.vue';
import PageNotFound from './pages/pageNotFound.vue';
import adminDashboard from './pages/adminDashboard.vue';

const routes = [
    {
        path: '/accueil',
        component: Accueil,
    },
    {
        path: '/adminDashboard',
        component: adminDashboard,
    },
    {
        path: '/',
        component: Signup,
    },
    {
        path: '/account',
        component: Account,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/signup',
        component: Signup,
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: PageNotFound,
        meta: {
          requiresAuth: false
        }
      },  
      
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;