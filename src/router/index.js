import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import AddBlog from "@/views/AddBlog.vue";
import ViewBlog from "@/views/ViewBlog.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },

  {
    path: '/add-blog',
    name: 'add-blog',
    component: AddBlog
  },

  {
    path: '/blogs/:id',
    name: 'blog',
    component: ViewBlog
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes
})

export default router
