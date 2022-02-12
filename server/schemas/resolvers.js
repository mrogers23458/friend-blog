const { User, Post, Comment } = require ("../models")

const resolvers = {
    Query: {
        users: async () => {
            const users = User.find().populate({path:'posts', populate:{path: 'comments', populate:'commentorId'}}).populate('comments')
            console.log(users.getPopulatedPaths())
            return users
        },

        user: async(parent, { id } ) => {
            const user = User.findOne({ id }).populate('posts')
            console.log(user)
            return user
        },

        posts: async () => {
            const posts = Post.find().populate('creatorId').populate('comments')
            return posts
        },

        post: async (parent, { id }) => {
            const post = Post.findOne({ id }).populate('creatorId').populate('comments')
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
        addUser: async(parent, {first, last, username, email, password}) => {
            const user = await User.create({ first, last, username, email, password})
            return user
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
        }
    }
}

module.exports = resolvers