import { createRouter, createWebHistory } from "vue-router";
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import PageNotFound from './pages/pageNotFound.vue';


const routes = [
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