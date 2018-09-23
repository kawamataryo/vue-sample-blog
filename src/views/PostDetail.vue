<template>
  <div>
    <section>
      <v-parallax :src="post.thumbnail.url" height="600">
        <v-layout
            column
            align-center
            justify-center
            class="white--text"
        >
          <h1 class="white--text mb-2 display-2 text-xs-center">{{post.title}}</h1>
          <p class="white-text text-xs-center subheading">{{ post.description }}</p>
        </v-layout>
      </v-parallax>
    </section>
    <v-content>
      <v-container>
        <v-layout row wrap justify-center>
          <v-flex xs12 md8>
            <p>{{ post.content }}</p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
  import {FEACH_POST_BY_ID} from "../components/graphql";

  export default {
    name: 'PostDetail',
    data: () => ({
      post: []
    }),
    apollo: {
      post: {
        query: FEACH_POST_BY_ID,
        variables() {
          return {
            id: this.$route.params.id,
          }
        },
      }
    }
  }
</script>

<style>
  .v-parallax__image {
    opacity: 1!important;
  }
</style>
