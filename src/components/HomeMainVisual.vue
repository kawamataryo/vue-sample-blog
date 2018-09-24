<template>
  <section>
    <v-parallax :src="require('@/assets/home-cover.jpg')" height="600">
      <v-layout
          column
          align-center
          justify-center
          class="white--text"
      >
        <h1><img src="../assets/logo.png" alt="Vuetify.js" height="200"></h1>
        <div class="subheading mb-3 text-xs-center ">Practice HeadlessCMS, Vue.js, GraphQL</div>
        <v-btn
            class="blue lighten-2 mt-5"
            dark
            large
            href="/pre-made-themes"
        >
          Read posts
        </v-btn>
      </v-layout>
    </v-parallax>
  </section>
</template>

<script>
  export default {
    name: "homeMainVisual"
  }
</script>

