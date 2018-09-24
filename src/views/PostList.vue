<template>
  <div>
    <HomeMainVisual/>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <PostCard
            v-for="post in posts"
            v-bind:key="post.id"
            :post=post
        ></PostCard>
      </v-layout>
      <div class="text-xs-center">
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
  import {FEACH_POST_BY_PAGE} from "../constants/graphql"
  import {MAX_POST_COUNT} from "../constants/graphql";

  const PAGE_DISPLAY_UNIT = 6

  export default {
    name: "PostList",
    components: {
      PostCard,
      HomeMainVisual
    },
    data: () => ({
      pageNumber: 1,
      maxPostCount: 0,
      posts: [],
    }),
    computed: {
      pageLength: function () {
        return Math.floor(this.maxPostCount / PAGE_DISPLAY_UNIT)
      }
    },
    apollo: {
      maxPostCount: {
        query: MAX_POST_COUNT,
        update (data) {
          return data.postsConnection.aggregate.count
        }
      },
      posts: {
        query: FEACH_POST_BY_PAGE,
        variables() {
          return {
            page: this.pageNumber * PAGE_DISPLAY_UNIT,
            displayUnit: PAGE_DISPLAY_UNIT
          }
        }
      },
    }

  }
</script>

