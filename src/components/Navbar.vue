<template>
  <header>
    <v-toolbar
        app
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>fa-bars</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
        temporary
        :right=true
        v-model="rightDrawer"
        fixed
        app
    >
      <v-list>
        <v-list-tile
            to="/"
        >
          <v-list-tile-action>
            <v-icon>fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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

<style scoped>
  header {
    height: 56px;
  }
</style>