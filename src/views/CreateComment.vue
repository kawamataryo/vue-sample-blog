<template>
  <v-container>
    <!--コメントフォーム-->
    <v-dialog v-model="dialog" max-width="500px">
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
                @click="createComment"
            >
              save
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>


    <!--ツールバー-->
    <v-toolbar flat color="white">
      <v-toolbar-title>CRUD demo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="showDialog">New Item</v-btn>
    </v-toolbar>

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
        <td class="justify-center layout px-0">
          <v-btn
              color="success"
              small
              outline
              flat
              @click="updateComment(props.item)"
          >
            <v-icon small>
              fa-edit
            </v-icon>
          </v-btn>
          <v-btn
              color="error"
              small
              outline
              flat
              @click="deleteComment(props.item.id)"
          >
            <v-icon small>
              fa-trash
            </v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
  import {ALL_COMMENTS, CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT} from "../constants/comment-graphql";

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
        {text: 'contents', value: 'contents'},
        {text: 'Actions', value: 'name', sortable: false}
      ],
      error: "desu",
      progress: false,
      dialog: false,
    }),
    methods: {
      createComment: function () {
        if (this.$refs.form.validate()) {
          this.progress = true
          this.$apollo.mutate({
            mutation: CREATE_COMMENT,
            variables: {
              title: this.title,
              contents: this.contents,
            }
          }).then(() => {
            this.$apollo.queries.comments.fetchMore({
              updateQuery: (previousResult, {fetchMoreResult}) => {
                this.clear()
                this.showAlert()
                return {
                  comments: fetchMoreResult.comments
                }
              }
            })
            this.dialog = false
            this.progress = false
          }).catch((error) => {
            this.error = error
          })
        }
      },
      deleteComment: function (id) {
        if (!confirm('Are you sure you want to delete this comment?')) {
          return
        }
        this.progress = true
        this.$apollo.mutate({
          mutation: DELETE_COMMENT,
          variables: {
            id: id
          }
        }).then(() => {
          this.$apollo.queries.comments.fetchMore({
            updateQuery: (previousResult, {fetchMoreResult}) => {
              return {
                comments: fetchMoreResult.comments
              }
            }
          })
          this.progress = false
        }).catch((error) => {
          this.error = error
        })
      },
      updateComment: function (item) {
        let id = item.id
        let title = item.title
        let contents = item.contents
        this.$apollo.mutate({
          mutation: UPDATE_COMMENT,
          variables: {
            id: id,
            title: title,
            contents: contents
          }
        }).then(() => {
          this.$apollo.queries.comments.fetchMore({
            updateQuery: (previousResult, {fetchMoreResult}) => {
              return {
                comments: fetchMoreResult.comments
              }
            }
          })
          this.progress = false
        }).catch((error) => {
          this.error = error
        })
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
      showDialog: function () {
        this.dialog = true
      }
    },
    apollo: {
      comments: ALL_COMMENTS
    }
  }
</script>
