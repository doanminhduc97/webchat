import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const HomeMessage = defineAsyncComponent(() => import('./pages/chat/HomeMessage.vue'))
const LoginPage = defineAsyncComponent(() => import('./pages/auth/UserAuth.vue'))

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', 
            redirect: '/homeMessage'
        },
        { 
            path: '/homeMessage',
            component: HomeMessage 
        },
        { 
            path: '/login',
            component: LoginPage 
        }
    ]
})
export default router;