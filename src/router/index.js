import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo01 from '../views/Demo01.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/demo01',
    name: 'demo01',
    component: Demo01
  },
  {
    path: '/demo_worker',
    name: 'demo_worker',
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoWorker.vue')
  },
  {
    path: '/demo_worker2',
    name: 'demo_worker2',
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoWorker2.vue')
  },
  {
    path: '/demo_deferred_after',
    name: 'demo_deferred_after',
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoDeferredAfter.vue')
  },
  {
    path: '/demo_deferred_before',
    name: 'demo_deferred_before',
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoDeferredBefore.vue')
  },
  {
    path: '/demo_time_slicing',
    name: 'demo_time_slicing',
    component: () => import(/* webpackChunkName: "about" */ '../views/DemoTimeSlicing.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
