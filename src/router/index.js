//import vue router
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
//define a routes
const routes = [
  
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
    },

    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "login" */ '../views/Dashboard.vue'),
        meta: {
            //chek is loggedIn
            requiresAuth: true
        }
    },

    {
        path: '/order',
        name: 'order',
        component: () => import( /* webpackChunkName: "login" */ '../views/Order.vue'),
        meta: {
            //chek is loggedIn
            requiresAuth: true
        }
    },

    {
        path: '/history-transaksi',
        name: 'transaksi',
        component: () => import( /* webpackChunkName: "login" */ '../views/HistoryTransaksi.vue'),
        meta: {
            //chek is loggedIn
            requiresAuth: true
        }
    }

]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

//define route for handle authentication
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //cek nilai dari getters isLoggedIn di module auth
        if (store.getters['auth/isLoggedIn']) {
        next()
        return
      }
      next('/login')
    } else {
      next()
    }
})

export default router