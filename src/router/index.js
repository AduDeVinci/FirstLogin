import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import SuccessPage from '../views/SuccessPage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/success', component: SuccessPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;