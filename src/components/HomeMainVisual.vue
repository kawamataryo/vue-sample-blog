<template>
  <section>
    <v-parallax :src="require('@/assets/home-cover.jpg')" height="549">
      <v-layout
          column
          align-center
          justify-center
          class="white--text"
      >
        <h1><img src="../assets/logo.png" alt="Vuetify.js" height="200"></h1>
        <div class="subheading mb-3 text-xs-center ">Practice HeadlessCMS, Vue.js, GraphQL</div>
      </v-layout>
    </v-parallax>
  </section>
</template>

<script>
  export default {
    name: "homeMainVisual"
  }
</script>

