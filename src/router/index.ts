import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/new/',
    redirect: '/new/idol',
  },
  {
    path: '/',
    redirect: '/home/illust',
  },
  {
    path: '/home/',
    redirect: '/home/illust',
  },
  // {
  //   path:'/search/',
  //   redirect: '/search/illust'
  // },
  //home
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/Home.vue'),
    children: [
      {
        path: '/home/',
        component: () => import('../views/Home/illust.vue'),
      },
      {
        path: '/home/illust',
        component: () => import('../views/Home/illust.vue'),
      },
      {
        path: '/home/manga',
        component: () => import('../views/Home/manga.vue'),
      },
      {
        path: '/home/novel',
        component: () => import('../views/Home/novel.vue'),
      },
    ],
  },
  //search
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search/Search.vue'),
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
    component: () => import('../views/Artworks/artworks.vue'),
  },
  {
    path: '/users/:id',
    name: 'users',
    component: () => import('../views/User/Users.vue'),
  },
  {
    path: '/artworks/:id',
    name: 'artworks',
    component: () => import('../views/Artworks/artworks.vue'),
  },
  {
    path: '/searchResults',
    name: 'searchResults',
    component: () => import('../views/Search/searchResults.vue'),
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('../views/Rank/Rank.vue'),
  },
  // {
  //   path: '/searchTag',
  //   name: 'searchTag',
  //   component: () => import( '../views/Search/searchTag.vue')
  // },
]
const scrollBehavior = function(to, from, savedPosition) {
  // savedPosition 会在你使用浏览器前进或后退按钮时候生效
  // 这个跟你使用 router.go() 或 router.back() 效果一致
  // 这也是为什么我在 tab 栏结构中放入了一个 点击回退 的按钮
  if (savedPosition) {
    return savedPosition
  } else {
    // 如果不是通过上述行为切换组件，就会让页面回到顶部
    document.documentElement.scrollTop = document.body.scrollTop = 0
    return { x: 0, y: 0 }
  }
}
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior,
})

export default router
