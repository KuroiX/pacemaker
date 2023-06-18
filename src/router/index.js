import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComposablesView from "@/views/ComposablesView.vue";
import CustomNodeView from "@/views/CustomNodeView.vue";
import CustomNodeExampleView from "@/views/CustomNodeExampleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/composables',
      name: 'composables',
      component: ComposablesView
    },
    {
      path: '/customnodes',
      name: 'customnodes',
      component: CustomNodeView
    },
    {
      path: '/customnodesexample',
      name: 'customnodesexample',
      component: CustomNodeExampleView
    },
    {
      path: '/theming',
      name: 'theming',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ThemingView.vue')
    }
  ]
})

export default router
