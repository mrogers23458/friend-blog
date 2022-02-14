import {gql} from '@apollo/client'

export const ADD_USER = gql `

mutation addUser ($username: String, $email:String, $password:String) {
  addUser (username: $username, email: $email password: $password) {
    user {
      _id
      email
      username
    }
    token
  }
}
`

export const DELETE_USER = gql `
mutation deleteUser ($userId: ID) {
  deleteUser(userId: $userId) {
    _id
  }
}
`

export const ADD_POST = gql `
mutation addPost ($title: String, $postContent: String, $creatorId:String) {
  addPost (title: $title, postContent:$postContent, creatorId: $creatorId) {
    _id
    title
    postContent
  }
}
`