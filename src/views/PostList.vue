<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <PostCard
          v-for="post in posts"
          v-bind:key="post.id"
          :post=post
      ></PostCard>
    </v-layout>
  </v-container>
</template>

<script>
  import PostCard from '../components/PostCard'
  import {ALL_POSTS} from "../constants/graphql";

  export default {
    name: "PostList",
    components: {
      PostCard,
    },
    data: () => ({
      posts: [],
    }),
    apollo: {
      posts: ALL_POSTS
    }

  }
</script>

