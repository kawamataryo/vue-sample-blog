<template>
  <header>
    <v-toolbar
        app
        inverted-scroll="true"
    >
      <router-link to="/" class="black--text">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>fa-bars</v-icon>
      </v-btn>
      <HeaderMenu/>
    </v-toolbar>
  </header>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {
        title: "Sample Blog",
        rightDrawer: false,
      }
    }
  }
</script>

