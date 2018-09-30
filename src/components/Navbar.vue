<template>
  <header>
    <v-toolbar
        app
        inverted-scroll
    >
      <router-link to="/" class="black--text">
        <v-toolbar-title v-text="title"></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>fa-bars</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
        temporary
        :right=true
        v-model="rightDrawer"
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

        <v-list-tile
            to="/pagingDemo"
        >
          <v-list-tile-action>
            <v-icon>fa-sticky-note</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>pagingDemo</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
            to="/createComment"
        >
          <v-list-tile-action>
            <v-icon>fa-comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>createComment</v-list-tile-title>
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

