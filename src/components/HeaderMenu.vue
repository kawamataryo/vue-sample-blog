<template>
  <v-navigation-drawer
      temporary
      :right=true
      v-model="rightDrawer"
      app
  >
    <v-list>

      <v-list-tile to="/">
        <v-list-tile-action>
          <v-icon>fa-home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>

      <v-list-tile to="/pagingDemo">
        <v-list-tile-action>
          <v-icon>fa-sticky-note</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Paging demo</v-list-tile-title>
      </v-list-tile>

      <v-list-tile to="/addPost">
        <v-list-tile-action>
          <v-icon>fa-comments</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Add post</v-list-tile-title>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "HeaderMenu"
  }
</script>

<style scoped>

</style>