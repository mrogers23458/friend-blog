import { gql } from "@apollo/client";

export const GET_USER = gql `
query user($id: String) {
  user(id: $id) {
    _id
    email
    username
    password
    posts {
      _id
      title
      creatorId {
        _id
        username
      }
    }
    comments {
      _id
      commentContent
      postId {
        _id
        title
      }
    }
  }
}
`

export const GET_POSTS = gql `
query posts {
  posts {
    _id
    title
    postContent
    comments {
      commentContent
      commentorId {
        _id
        username
      }
    }
  }
}
`
export const GET_POST = gql `
query post($postId: ID) {
  post(postId: $postId) {
    _id
    title
    postContent
        comments {
            _id
            commentContent
            commentorId {
                username
            }
        }
  }
}
`