const { Schema, model} = require('mongoose')

const commentSchema = new Schema(
    {
        content: {
            type: String
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Comment = model('Comment', postSchema)
module.exports = Comment