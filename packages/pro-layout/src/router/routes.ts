import { RouterView } from 'vue-router'

const routes = [
  {
    name: 'test1',
    path: '/',
    meta: { title: 'test1', icon: 'icon-label_fill' },
    component: RouterView,
    redirect: { path: '/test1/1' },
    children: [
      {
        name: 'test11',
        path: '/test1/1',
        meta: { title: 'test11', icon: 'icon-label_fill' },
        component: () => import('../components/Test.vue'),
      },
      {
        name: 'test12',
        path: '/test1/2',
        meta: { title: 'test12', icon: 'icon-label_fill' },
        component: () => import('../components/Test.vue'),
      },
    ],
  },
  {
    name: 'test2',
    path: '/test2',
    meta: { title: 'test2', icon: 'icon-label_fill' },
    component: () => import('../components/Test.vue'),
    children: [
      {
        name: 'test21',
        path: '/test2/1',
        meta: { title: 'test21', icon: 'icon-label_fill' },
        component: () => import('../components/Test.vue'),
      },
      {
        name: 'test22',
        path: '/test2/2',
        meta: { title: 'test22', icon: 'icon-label_fill' },
        component: () => import('../components/Test.vue'),
      },
    ],
  },
  {
    name: 'test3',
    path: '/test3',
    meta: { title: 'test3', icon: 'icon-calendar2' },
    component: () => import('../components/Test.vue'),
  },
]

export default routes
