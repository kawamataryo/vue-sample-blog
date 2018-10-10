(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d2fa2"],{"5b98":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:"",sm6:"","offset-sm3":""}},[n("section",[n("v-alert",{attrs:{value:t.alertDisplay,type:"success",transition:"slide-y-transition",outline:""}},[t._v("\n          Comment was successful\n        ")]),n("v-card",[n("v-container",[n("h1",[t._v("CommentForm")]),n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-text-field",{attrs:{rules:t.titleRules,counter:20,label:"Title",required:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),n("v-textarea",{attrs:{rules:t.contentsRules,label:"Contents",required:"",flat:"",counter:""},model:{value:t.contents,callback:function(e){t.contents=e},expression:"contents"}}),n("v-btn",{attrs:{disabled:!t.valid},on:{click:t.createPost}},[t._v("\n                submit\n              ")]),n("v-btn",{on:{click:t.clear}},[t._v("clear")])],1)],1)],1)],1)])],1),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.comments,"hide-actions":"",loading:t.progress},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",[t._v(t._s(t._f("moment")(e.item.createdAt,"YYYY-MM-DD HH:MM:SS")))]),n("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.title))]),n("td",{staticClass:"text-xs-right"},[t._v(t._s(e.item.contents))])]}}])},[n("v-progress-linear",{attrs:{slot:"progress",color:"blue",indeterminate:""},slot:"progress"})],1)],1)},r=[],o=n("ab48"),a=n("9530"),i=n.n(a);function l(){var t=Object(o["a"])(["\n    mutation createComments($title: String, $contents: String) {\n        createComment(data: {status: PUBLISHED, title: $title, contents: $contents}) {\n            title: title\n            contents: contents\n        }\n    }\n"]);return l=function(){return t},t}function c(){var t=Object(o["a"])(["\n    query maxCommentCount{\n        commentsConnection {\n            aggregate {\n                count\n            }\n        }\n    }\n"]);return c=function(){return t},t}function u(){var t=Object(o["a"])(["\n    query feachCommentById($id: ID!) {\n        comments(where: { id: $id }) {\n            title\n            contents\n            createdAt\n        }\n    }\n"]);return u=function(){return t},t}function m(){var t=Object(o["a"])(["\n    query allComments {\n        comments(where: {status: PUBLISHED}) {\n            id\n            title\n            contents\n            createdAt\n        }\n    }\n"]);return m=function(){return t},t}var d=i()(m()),f=(i()(u()),i()(c()),i()(l())),v={name:"CreatePost",data:function(){return{valid:!0,title:"",titleRules:[function(t){return!!t||"Title is required"},function(t){return t&&t.length<=20||"Title must be less than 20 characters"}],contents:"",contentsRules:[function(t){return!!t||"Content is required"}],comments:[],headers:[{text:"createdAt",value:"createdAt"},{text:"title",value:"title"},{text:"contents",value:"contents"}],error:"desu",progress:!1,alertDisplay:!1}},methods:{createPost:function(){var t=this;this.$refs.form.validate()&&(this.progress=!0,this.$apollo.mutate({mutation:f,variables:{title:this.title,contents:this.contents}}).then(function(e){t.$apollo.queries.comments.fetchMore({updateQuery:function(e,n){var s=n.fetchMoreResult;return t.clear(),t.showAlert(),t.progress=!1,{comments:s.comments}}})}).catch(function(e){t.error=e}))},clear:function(){this.$refs.form.reset()},showAlert:function(){this.alertDisplay=!0;var t=this;setTimeout(function(){t.alertDisplay=!1},3e3)}},apollo:{comments:d}},h=v,p=n("2877"),b=Object(p["a"])(h,s,r,!1,null,null,null);b.options.__file="CreateComment.vue";e["default"]=b.exports}}]);
//# sourceMappingURL=chunk-2d0d2fa2.872d5fd9.js.map