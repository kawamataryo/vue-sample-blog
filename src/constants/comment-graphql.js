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

// postモデルのレコード数を取得
export const MAX_COMMENT_COUNT = gql`
    query maxCommentCount{
        commentsConnection {
            aggregate {
                count
            }
        }
    }
`

// postモデルのレコードの追加
export const CREATE_COMMENT = gql`
    mutation createComments($title: String, $contents: String) {
        createComment(data: {status: PUBLISHED, title: $title, contents: $contents}) {
            title: title
            contents: contents
        }
    }
`