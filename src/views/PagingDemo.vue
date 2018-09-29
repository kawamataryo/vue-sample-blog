<template>
  <div>
    <v-container grid-list-xl>
      <!-- ローディングアイコン-->
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
        ></v-progress-circular>
      </div>
      <!--投稿一覧-->
      <v-layout row wrap v-if="!loading">
        <PostCard
            v-for="post in posts"
            v-bind:key="post.id"
            :post=post
        ></PostCard>
      </v-layout>
      <!--ページネーション-->
      <div class="text-xs-center mt-5">
        <v-pagination
            v-model="pageNumber"
            :length="pageLength"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
  import HomeMainVisual from '../components/HomeMainVisual'
  import PostCard from '../components/PostCard'
  import {FEACH_POST_BY_PAGE, MAX_POST_COUNT} from "../constants/graphql"

  export default {
    name: "PostList",
    components: {
      PostCard,
      HomeMainVisual
    },
    data: () => ({
      pageNumber: 1, // 表示するページ番号
      pageDisplayUnit: 3, // 1ページの表示件数
      maxPostCount: 0, // 投稿総数（初期化で0）
      posts: [], // 投稿一覧
      loading: 0, // 通信の状態 apolloで制御
    }),
    mounted() {
      // マウント後に、vue-routerでクエリーパラムを取得
      // 取得したクエリーパラムを表示ページに設定
      let queryPage = this.$route.query.page
      this.pageNumber = queryPage != null ? parseInt(queryPage) : 1
    },
    watch: {
      // watchでpageNumberの状態を監視
      // pageNumberがページネーションのクリックで変化したときに、
      // vue-routerでページを変化させる
      pageNumber: function (newNumber) {
        this.$router.push({name: 'PagingDemo', query: {page: newNumber}})
      }
    },
    computed: {
      // 投稿総数を、1ページの表示件数で割ることで総ページ数を計算
      pageLength: function () {
        return Math.ceil(this.maxPostCount / this.pageDisplayUnit)
      }
    },
    apollo: {
      // 投稿総数の取得
      maxPostCount: {
        query: MAX_POST_COUNT,
        update(data) {
          return data.postsConnection.aggregate.count
        }
      },
      // ページごとの投稿を取得
      posts: {
        query: FEACH_POST_BY_PAGE,
        variables() {
          return {
            page: (this.$route.query.page - 1) * this.pageDisplayUnit,
            displayUnit: this.pageDisplayUnit
          }
        }
      },
    }

  }
</script>

<style>
  .v-pagination__navigation .v-icon {
    font-size: 1rem !important;
  }
</style>