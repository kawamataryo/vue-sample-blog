<template>
  <v-flex xs12 sm6 md4>
    <article>
      <v-hover>
        <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
        >
          <a v-bind:href="'/post/' + post.id">
            <v-img
                class="white--text"
                height="170px"
                :src=post.thumbnail.url
            >
            </v-img>
          </a>
          <v-card-title>
            <div>
              <h2>{{ post.title }}</h2>
              <span class="grey--text">{{ post.createdAt}}</span><br>
              <span>{{ post.description }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn icon class="red--text">
              <v-icon medium>fa-reddit</v-icon>
            </v-btn>
            <v-btn icon class="light-blue--text">
              <v-icon medium>fa-twitter</v-icon>
            </v-btn>
            <v-btn icon class="blue--text text--darken-4">
              <v-icon medium>fa-facebook</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="blue" :to="'/post/' + post.id">Read more</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </article>
  </v-flex>
</template>

<script>

  export default {
    name: "PostCard",
    props: ["post"]
  }
</script>
