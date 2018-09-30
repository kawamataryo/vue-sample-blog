<template>
  <v-flex xs12 sm6 md4>
    <section>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="Name"
            required
        ></v-text-field>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>
        <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Item"
            required
        ></v-select>
        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
        ></v-checkbox>

        <v-btn
            :disabled="!valid"
            @click="submit"
        >
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </section>
  </v-flex>
</template>

<script>
  export default {
    name: "PostForm"
  }
</script>

