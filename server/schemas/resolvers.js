const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment } = require ("../models")
const { signToken } = require('../utils/auth.js')
const resolvers = {
    Query: {
        users: async () => {
            const users = User.find().populate({path:'posts', populate:{path: 'comments', populate:'commentorId'}}).populate('comments')
            return users
        },

        user: async(parent, {username} ) => {
            const user = User.findOne({ username: username }).populate({path:'posts', populate:{path: 'comments', populate:'commentorId'}}).populate({path: 'comments', populate:{path: 'postId'}})
            return user
        },

        posts: async () => {
            const posts = Post.find().populate('creatorId').populate({path: 'comments', populate:'commentorId'})
            return posts
        },

        post: async (parent, { postId }) => {
            const post = Post.findOne({ _id: postId }).populate('creatorId').populate({path: 'comments', populate:'commentorId'})
            return post
        },

        comments: async (parent) => {
            const comments = Comment.find().populate('commentorId').populate('postId')
            return comments
        },

        comment: async (parent, {id}) => {
            const comment = Comment.findOne({ id }).populate('commentorId').populate('postId')
            return comment
        }
    },

    Mutation: {
        addUser: async(parent, {username, email, password}) => {
            const user = await User.create({email, username, password})
            const token = signToken(user)
            return { token, user }
        },

        addPost: async(parent, {title, postContent, creatorId}) => {
            const post = await Post.create({title, postContent, creatorId})
            const user = await User.findOneAndUpdate({_id: creatorId}, {$addToSet: {posts: post.id}})
            return post
        },

        addComment: async(parent, {commentContent, postId, commentorId}) => {
            const comment = await Comment.create({ commentContent, postId, commentorId})
            const post = await Post.findOneAndUpdate({_id: postId}, {$addToSet: {comments: comment.id}})
            const user = await User.findOneAndUpdate({_id: commentorId}, {$addToSet: {comments: comment.id}})
            return comment
        },

        deleteUser: async(parent, { userId }) => {
            const deletedUserPosts = await Post.deleteMany({creatorId: userId})
            const deletedUserComments = await Comment.deleteMany({commentorId: userId})
            const deletedUser = User.findOneAndDelete({_id: userId})
            return deletedUser
        },

        deletePost: async(parent, {postId}) => {
            const deletedPost = Post.findOneAndDelete({_id: postId})
            return deletedPost
        },

        deleteComment: async(parent, {commentId}) => {
            const deletedComment = Comment.findOneAndDelete({_id: commentId})
            return deletedComment
        },

        login: async (parent, {username, password}) => {
            console.log(username, password)
            const user = await User.findOne({ username: username});
            console.log(user)
            if (!user) {
                throw new AuthenticationError('No account with this e-mail found')
                
            }

            console.log(password)
            const checkPass = await user.isCorrectPassword(password)

            if (!checkPass) {
                throw new AuthenticationError('Incorrect Password test test test')
            }

            const token = signToken(user)
            console.log(token)
            return { token, user }
        }
    }
}

module.exports = resolvers