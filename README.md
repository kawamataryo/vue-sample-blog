# GraphCMSとvue.jsの学習用リポジトリ


以下モジュールの学習を行っています。

* vue.js
* vue-apollo
* vue-router
* vuetify
* GraphCMS

こちらのqiita記事で紹介しています。  
https://qiita.com/ryo2132/items/75ed2e3dcb6a1bec91a1

可動中のアプリはこちら。  
https://graphcms-sampleblog.herokuapp.com/



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

## Authentication configuration

Copy `.env.example` to `.env.local` to configure the GraphQL endpoint.
`apollo-token` is the localStorage item name; it is not an API credential.
Supply a per-user, appropriately scoped token through `onLogin`, or use a
public read-only endpoint. Never embed a shared CMS management token in source,
`VUE_APP_*` environment variables, or the generated `dist` bundle.
