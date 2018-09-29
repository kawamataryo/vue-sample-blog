<template>
  <div>
    <HomeMainVisual/>
    <v-container grid-list-xl>
      <div class="text-xs-center" v-if="loading">
        <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
        ></v-progress-circular>
      </div>
      <v-layout row wrap>
        <PostCard
            v-for="post in posts"
            v-bind:key="post.id"
            :post=post
        ></PostCard>
      </v-layout>
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
      pageNumber: 1,
      pageDisplayUnit: 12,
      maxPostCount: 0,
      posts: [],
      loading: 0,
    }),
    mounted() {
      let page = this.$route.query.page
      this.pageNumber = page != null ? parseInt(page) : 1
    },
    computed: {
      pageLength: function () {
        return Math.ceil(this.maxPostCount / this.pageDisplayUnit)
      }
    },
    watch: {
      pageNumber: function (newNumber) {
        this.$router.push({ name: 'PostList', query: { page: newNumber }})
      }
    },
    apollo: {
      maxPostCount: {
        query: MAX_POST_COUNT,
        update(data) {
          return data.postsConnection.aggregate.count
        }
      },
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