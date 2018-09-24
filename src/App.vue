<template>
  <v-app>
    <nav-bar/>
    <transition name="fade">
      <router-view/>
    </transition>
    <footer-bar/>
  </v-app>
</template>

<script>
  import navBar from "./components/Navbar"
  import footerBar from "./components/Fotter"
  export default {
    name: 'App',
    components: {
      navBar,
      footerBar
    },

  }
</script>

