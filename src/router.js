import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// ルーティング
const routes = [
  {
    path: '/',
    name: "PostList",
    component: () => import('./views/PostList.vue')
  },
  {
    path: '/PagingDemo',
    name: "PagingDemo",
    component: () => import('./views/PagingDemo.vue')
  },
  {
    path: '/post/:id',
    name: "PostDetail",
    component: () => import('./views/PostDetail.vue')
  },
  {
    path: '/createComment',
    name: "CreateComment",
    component: () => import('./views/CreateComment.vue')
  },
  {
    path: '/infiniteScrollDemo',
    name: "InfiniteScrollDemo",
    component: () => import('./views/InfiniteScrollDemo.vue')
  },
]

const router = new VueRouter({
  routes: routes,
  base: process.env.BASE_URL,
  mode: 'history',
  // ページ遷移の際の位置指定 指定がない場合 ページトップへ
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
});

export default router;
