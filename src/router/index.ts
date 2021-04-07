import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/new/',
    redirect: '/new/idol'
  },
  {
    path: '/',
    redirect: '/home/illust'
  },
  {
    path: '/home/',
    redirect: '/home/illust'
  },
  {
    path:'/search/',
    redirect: '/search/illust'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import( '../views/Home/Home.vue'),
    children:[
      {
        path:'/home/',
        component: () => import("../views/Home/illust.vue"),
      },
      {
        path:'/home/illust',
        component: () => import("../views/Home/illust.vue"),
      }, 
      {
        path:'/home/manga',
        component: () => import("../views/Home/manga.vue"),
      },
      {
        path:'/home/novel',
        component: () => import("../views/Home/novel.vue"),
      }, 
    ]
  },
  {
    path: '/new',
    name: 'new',

    component: () => import( '../views/New/New.vue'),
    children:[
      {
        path:'/new/',
        component: () => import("../views/New/idol.vue"),
      },
      {
        path:'/new/idol',
        component: () => import("../views/New/idol.vue"),
      }, 
      {
        path:'/new/image',
        component: () => import("../views/New/image.vue"),
      },
      {
        path:'/new/friend',
        component: () => import("../views/New/friend.vue"),
      }, 
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import( '../views/Search/Search.vue'),
    children:[

      {
        path:'/search/illust',
        component: () => import("../views/Search/illust.vue"),
      }, 
      {
        path:'/search/novel',
        component: () => import("../views/Search/novel.vue"),
      },
      {
        path:'/search/user',
        component: () => import("../views/Search/user.vue"),
      }, 
    ]
  },
  {
    path: '/artworks/:id',
    name: 'artworks',
    component: () => import( '../views/Artworks/artworks.vue')
  },
  {
    path: '/users/:id',
    name: 'users',
    component: () => import( '../views/User/Users.vue') 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
