<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <section>
          <!--アラート-->
          <v-alert
              :value="alertDisplay"
              type="success"
              transition="slide-y-transition"
              outline
          >
            Comment was successful
          </v-alert>

          <!--コメントフォーム-->
          <v-card>
            <v-container>
              <h1>CommentForm</h1>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="title"
                    :rules="titleRules"
                    :counter="20"
                    label="Title"
                    required
                ></v-text-field>
                <v-textarea
                    v-model="contents"
                    :rules="contentsRules"
                    label="Contents"
                    required
                    flat
                    counter
                ></v-textarea>
                <v-btn
                    :disabled="!valid"
                    @click="createPost"
                >
                  submit
                </v-btn>
                <v-btn @click="clear">clear</v-btn>
              </v-form>
            </v-container>
          </v-card>
        </section>
      </v-flex>
    </v-layout>

    <!--コメント一覧-->

    <v-data-table
        :headers="headers"
        :items="comments"
        hide-actions
        class="elevation-1"
        :loading="progress"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.createdAt | moment("YYYY-MM-DD HH:MM:SS") }}</td>
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.contents }}</td>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
  import {ALL_COMMENTS, CREATE_COMMENT} from "../constants/comment-graphql";

  export default {
    name: "CreatePost",
    data: () => ({
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 20) || 'Title must be less than 20 characters'
      ],
      contents: '',
      contentsRules: [
        v => !!v || 'Content is required',
      ],
      comments: [],
      headers: [
        {text: 'createdAt', value: 'createdAt'},
        {text: 'title', value: 'title'},
        {text: 'contents', value: 'contents'}
      ],
      error: "desu",
      progress: false,
      alertDisplay: false,
    }),
    methods: {
      createPost: function () {
        if (this.$refs.form.validate()) {
          this.progress = true
          this.$apollo.mutate({
            mutation: CREATE_COMMENT,
            variables: {
              title: this.title,
              contents: this.contents,
            }
          }).then((data) => {
            this.$apollo.queries.comments.fetchMore({
              updateQuery: (previousResult, {fetchMoreResult}) => {
                this.clear()
                this.showAlert()
                this.progress = false
                return {
                  comments: fetchMoreResult.comments
                }
              }
            })
          }).catch((error) => {
            this.error = error
          })
        }
      },
      clear: function () {
        this.$refs.form.reset()
      },
      showAlert: function () {
        this.alertDisplay = true
        let self = this
        setTimeout(function () {
          self.alertDisplay = false
        }, 3000);
      },
    },
    apollo: {
      comments: ALL_COMMENTS
    }
  }
</script>
