const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID,
        first: String
        last: String
        email: String
        username: String
        password: String
        posts: [Post]
        comments: [Comment]

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
        user(id: ID): User
        posts: [Post]
        post(postId: ID): Post
        comments: [Comment]
        comment(id: ID): Comment
    }

    type Mutation {
        addUser(
            first: String
            last: String
            email: String
            username: String
            password: String
        ): User

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