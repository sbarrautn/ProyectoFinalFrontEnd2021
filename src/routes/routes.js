import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      {
        path: '/proceed',
        name: 'proceed',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Proceed.vue')
      },
      {
        path: '/confirm',
        name: 'confirm',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Confirm.vue')
      },
      {
        path: '/students',
        name: 'students',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Students.vue')
      },
      {
        path: '/task/new',
        name: 'new-task',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Tasks/NewTask.vue')
      },
      {
        path: '/task/edit',
        name: 'edit-task',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Tasks/EditTask.vue')
      },
      {
        path: '/tasks',
        name: 'tasks',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Tasks/TasksTable.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
