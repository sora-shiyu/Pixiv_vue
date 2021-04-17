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
  // {
  //   path:'/search/',
  //   redirect: '/search/illust'
  // },
  //home
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
  //search
  {
    path: '/search',
    name: 'search',
    component: () => import( '../views/Search/Search.vue'),
    // children:[

    //   {
    //     path:'/search/illust',
    //     component: () => import("../views/Search/illust.vue"),
    //   }, 
    //   {
    //     path:'/search/novel',
    //     component: () => import("../views/Search/novel.vue"),
    //   },
    //   {
    //     path:'/search/user',
    //     component: () => import("../views/Search/user.vue"),
    //   }, 
    // ]
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
  {
    path: '/artworks/:id',
    name: 'artworks',
    component: () => import( '../views/Artworks/artworks.vue')
  },
  {
    path: '/searchResults',
    name: 'searchResults',
    component: () => import( '../views/Search/searchResults.vue') 
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import( '../views/Rank/Rank.vue') 
  },
  // {
  //   path: '/searchTag',
  //   name: 'searchTag',
  //   component: () => import( '../views/Search/searchTag.vue') 
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
