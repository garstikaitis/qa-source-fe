import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
import Login from '../views/Login.vue'
import Dashboard from '@/views/Dashboard.vue';
import Projects from '@/views/Projects.vue';
import NewListing from '@/views/NewListing.vue';
import Companies from '@/views/Companies.vue';
import Register from '@/views/Register.vue';
import Tasks from '@/views/Tasks.vue';
import TesterProjects from '@/views/TesterProjects.vue'
import TesterDashboard from '@/views/TesterDashboard.vue'
import TesterTasks from '@/views/TesterTasks.vue'
import TesterTask from '@/views/TesterTask.vue'
import ClientProjects from '@/views/ClientProjects.vue'
import ClientDashboard from '@/views/ClientDashboard.vue'
import ClientTasks from '@/views/ClientTasks.vue'
import { Notification } from 'element-ui';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
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
    meta: {
      allowedRole: 'admin'
    }
  },
  {
    path: '/tester/projects',
    name: 'TesterProjects',
    component: TesterProjects,
    meta: {
      allowedRole: 'tester'
    }
  },
  {
    path: '/tester/dashboard',
    name: 'TesterDashboard',
    component: TesterDashboard,
    meta: {
      allowedRole: 'tester'
    }
  },
  {
    path: '/tester/tasks',
    name: 'TesterTasks',
    component: TesterTasks,
    meta: {
      allowedRole: 'tester'
    }
  },
  {
    path: '/tester/tasks/:taskId',
    name: 'TesterTask',
    component: TesterTask,
    meta: {
      allowedRole: 'tester'
    }
  },
  {
    path: '/client/projects',
    name: 'ClientProjects',
    component: ClientProjects,
    meta: {
      allowedRole: 'client'
    },
  },
  {
    path: '/client/dashboard',
    name: 'ClientDashboard',
    component: ClientDashboard,
    meta: {
      allowedRole: 'client'
    }
  },
  {
    path: '/client/tasks',
    name: 'ClientTasks',
    component: ClientTasks,
    meta: {
      allowedRole: 'client'
    }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: {
      allowedRole: 'admin'
    }
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies,
    meta: {
      allowedRole: 'admin'
    }
  },
  {
    path: '/listings/new',
    name: 'NewListing',
    component: NewListing,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: {
      allowedRole: 'admin'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  const allowedRole = routeTo.matched.length ? routeTo.matched[0].meta.allowedRole : null;
  const user = store.getters["auth/user"];
  if(!allowedRole) next();
  else if(!user && routeTo.path !== '/login') {
    next({ name: 'Login' });
  } else if(user && user.role !== allowedRole) {
    Notification({
      title: 'Access denied',
      type: 'error',
      message: 'You don\'t have access to this page. Aborting',
    });
    next(false); 
  } else {
    next();
  }
});


export default router
