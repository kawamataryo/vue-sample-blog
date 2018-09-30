import gql from 'graphql-tag'

// すべてのコメントを取得
export const ALL_COMMENTS = gql`
    query allComments {
        comments(where: {status: PUBLISHED}) {
            id
            title
            contents
            createdAt
        }
    }
`

// IDで1件取得
export const FEACH_COMMENT_BY_ID = gql`
    query feachCommentById($id: ID!) {
        comments(where: { id: $id }) {
            title
            contents
            createdAt
        }
    }
`

// commentモデルのレコード数を取得
export const MAX_COMMENT_COUNT = gql`
    query maxCommentCount{
        commentsConnection {
            aggregate {
                count
            }
        }
    }
`

// commentモデルのレコードの追加
export const CREATE_COMMENT = gql`
    mutation createComment($title: String, $contents: String) {
        createComment(data: {status: PUBLISHED, title: $title, contents: $contents}) {
            title: title
            contents: contents
        }
    }
`

// commentモデルのレコード削除
export const DELETE_COMMENT = gql`
    mutation deleteComment($id: ID) {
        deleteComment(where:{id: $id}){
            id
        }
    }
`

// commentモデルのレコード更新
export const UPDATE_COMMENT = gql`
    mutation updateComment($id: ID, $title: String, $contents: String) {
        updateComment(data: {title: $title, contents: $contents}, where:{id:$id}) {
            title
            contents
        }
    }
`