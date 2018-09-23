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

