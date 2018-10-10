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

  const DISPLAY_UNIT = 3

  export default {
    name: "InfinityScrollDemo",
    components: {
      PostCard,
    },
    data: () => ({
      loading: false,
      page: 0,
      posts: {},
      loadEnable: true,
    }),
    apollo: {
      posts: {
        query: FEACH_POST_BY_PAGE,
        variables: {
          displayUnit: DISPLAY_UNIT,
          page: 0
        },
        update(data) {
          return data.posts
        }
      }
    },
    methods: {
      showMore() {
        this.page++
        let self = this
        this.$apollo.queries.posts.fetchMore({
          variables: {
            displayUnit: DISPLAY_UNIT,
            page: self.page * DISPLAY_UNIT
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            const prePosts = previousResult.posts
            const newPosts = fetchMoreResult.posts

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
          let bottomPosition = document.documentElement.offsetHeight - 10 // なぜか最下部まで行っても5px程たりなかったので

          if (self.loadEnable && !self.loading && scrollingPosition >= bottomPosition ) {
            self.loading = true
            setTimeout(this.showMore, 1000)
          }
        }
      }
    },
    mounted() {
      this.watchScroll()
    }
  }
</script>

<style scoped>

</style>