const { Schema, model} = require('mongoose')

const commentSchema = new Schema(
    {
        commentContent: {
            type: String
        },

        commentorId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    }
)

const Comment = model('Comment', commentSchema)
module.exports = Comment