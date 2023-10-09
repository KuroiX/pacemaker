import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/examples/HomeView.vue'
import ComposablesView from "@/views/examples/ComposablesView.vue";
import CustomNodeView from "@/views/examples/CustomNodeView.vue";
import CustomNodeExampleView from "@/views/examples/CustomNodeExampleView.vue";
import MainView from "@/views/MainView.vue";
import ModalView from "@/views/examples/ModalView.vue";
import PlaygroundView from "@/views/PlaygroundView.vue";
import ComponentTester from "@/components/ComponentTester.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/flowexample',
      name: 'flowexample',
      component: HomeView
    },
    {
      path: '/playground',
      name: 'playground',
      component: PlaygroundView
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
      path: '/componentTester',
      name: 'componentTester',
      component: ComponentTester
    },
    {
      path: '/theming',
      name: 'theming',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/examples/ThemingView.vue')
    }
  ]
})

export default router