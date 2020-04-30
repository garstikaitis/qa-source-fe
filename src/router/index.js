import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '@/views/Dashboard.vue';
import Projects from '@/views/Projects.vue';
import NewListing from '@/views/NewListing.vue';
import Companies from '@/views/Companies.vue';
import Register from '@/views/Register.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies,
  },
  {
    path: '/listings/new',
    name: 'NewListing',
    component: NewListing,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
