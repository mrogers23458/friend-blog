const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        email: String
        username: String
        password: String
        posts: [Post]
        comments: [Comment]

    }

    type Auth {
    token: ID!
    user: User
    }

    type Post {
        _id: ID
        title: String
        postContent: String
        creatorId: User
        comments: [Comment]
    }

    type Comment {
        _id: ID
        commentContent: String
        postId: Post
        commentorId: User
    }

    type Query {
        users: [User]
        user(username: String): User
        posts: [Post]
        post(postId: ID): Post
        comments: [Comment]
        comment(id: ID): Comment
        me: Auth
    }

    type Mutation {
        addUser(
            email: String
            username: String
            password: String
        ): Auth

        login(
            username: String!
            password: String!
        ): Auth

        addPost(
            title: String
            postContent: String
            creatorId: String
        ): Post

        addComment(
            commentContent: String
            postId: String
            commentorId: String
        ): Comment

        deleteUser(
            userId: ID
        ): User

        deletePost(
            postId: ID
        ): Post

        deleteComment(
            commentId: ID
        ): Comment
    }

`

module.exports = typeDefs