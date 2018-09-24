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
    </v-container>
  </div>
</template>

<script>
  import HomeMainVisual from '../components/HomeMainVisual'
  import PostCard from '../components/PostCard'
  import {ALL_POSTS} from "../constants/graphql";

  export default {
    name: "PostList",
    components: {
      PostCard,
      HomeMainVisual
    },
    data: () => ({
      posts: [],
    }),
    apollo: {
      posts: ALL_POSTS
    }

  }
</script>

