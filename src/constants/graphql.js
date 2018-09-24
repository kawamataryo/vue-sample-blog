import gql from 'graphql-tag'

// すべての投稿を取得
export const ALL_POSTS = gql`
    query allPosts {
        posts {
            id
            title
            content
            description
            createdAt
            thumbnail {
                url
            }
        }
    }
`

// IDで1件取得
export const FEACH_POST_BY_ID = gql`
    query feachPostById($id: ID!) {
        post(where: { id: $id }) {
            title
            content
            description
            createdAt
            thumbnail {
                url
            }
        }
    }
`

// ページ単位で取得
export const FEACH_POST_BY_PAGE = gql`
    query feachPostByPage($displayUnit: Int, $page: Int) {
        posts(first: $displayUnit, skip: $page, orderBy: createdAt_DESC) {
            id
            title
            content
            description
            createdAt
            thumbnail {
                url
            }
        }
    }
`

// postモデルのレコード数を取得
export const MAX_POST_COUNT = gql`
    query maxPostCount{
        postsConnection {
            aggregate {
                count
            }
        }
    }
`