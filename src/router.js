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
    path: '/addPost',
    name: "AddPost",
    component: () => import('./views/AddPost.vue')
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
