<template>
  <div>
    <v-container grid-list-xl>
      <!--投稿一覧-->
      <v-layout row wrap>
        <PostCard
            v-for="post in posts"
            v-bind:key="post.id"
            :post=post
        ></PostCard>
      </v-layout>
      <!-- ローディングアイコン-->
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
        ></v-progress-circular>
      </div>
    </v-container>
  </div>
</template>

<script>
  import {FEACH_POST_BY_PAGE} from "../constants/post-graphql";
  import PostCard from '../components/PostCardSingleLine'

  const DISPLAY_UNIT = 3 // 一度に読み込む記事の単位

  export default {
    name: "InfinityScrollDemo",
    components: {
      PostCard,
    },
    data: () => ({
      posts: [], // postの配列
　　　 page: 0, // ページ位置（skipの値）
      loading: false, // ローディングアイコン表示可否のフラグ
      loadEnable: true, // 次のローディングが可能化どうかのフラグ
    }),
    apollo: { // 以下は最初のページロード時に実行される
      posts: {
        query: FEACH_POST_BY_PAGE,
        variables: {
          displayUnit: DISPLAY_UNIT,
          page: 0
        }
      }
    },
    methods: {
      showMore() {
        this.page++ //呼ばれるごとにpageの値をインクリメント
        let self = this // 関数内でthisが参照できないので、selfに移し替える
        this.$apollo.queries.posts.fetchMore({
          variables: {
            displayUnit: DISPLAY_UNIT,
            page: self.page * DISPLAY_UNIT
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            const prePosts = previousResult.posts // 前取得済みのpostsの値
            const newPosts = fetchMoreResult.posts // 追加取得のpostsの値

            // 残された投稿が、表示単位より少ない場合はローディング可能のフラグをfalseに
            if (newPosts.length < DISPLAY_UNIT) {
              self.loadEnable = false
            }

            // loadingを終了
            self.loading = false
            return {
              posts: [...prePosts, ...newPosts] // 配列の結合。prePosts.concat(newPosts)と同意
            }
          }
        })
      },
      watchScroll() {
        let self = this
        window.onscroll = () => {
          let scrollingPosition = document.documentElement.scrollTop + window.innerHeight
          let bottomPosition = document.documentElement.offsetHeight - 10 // なぜか最下部まで行っても5px程たりなかったので。cssの問題？

          // 次の投稿があり、ロード中の状態ではなく、最下部までスクロールされた場合に実行
          if (self.loadEnable && !self.loading && scrollingPosition >= bottomPosition ) {
            self.loading = true
            setTimeout(this.showMore, 1000)
          }
        }
      }
    },
    mounted() {
      // watchScrollの実行登録
      this.watchScroll()
    }
  }
</script>
<style scoped>

</style>