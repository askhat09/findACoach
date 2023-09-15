import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      component: () => import('./pages/coaches/CoachesList.vue'),
    },
    {
      path: '/coaches/:id',
      component: () => import('./pages/coaches/CoachDetail.vue'),
      props: true,
      children: [
        {
          path: 'contact',
          component: () => import('./pages/requests/ContactCoach.vue'),
        }, // /coaches/c1/contact
      ],
    },
    {
      path: '/register',
      component: () => import('./pages/coaches/CoachRegistration.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: () => import('./pages/requests/RequestsReceived.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      component: () => import('./pages/auth/UserAuth.vue'),
      meta: { requiresUnAuth: true },
    },
    { path: '/:notFound(.*)', component: () => import('./pages/NotFound.vue') },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/auth');
  } else if (to.meta.requiresUnAuth && store.getters.isAuth) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
