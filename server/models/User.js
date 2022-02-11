const { Schema, model} = require('mongoose')

const userSchema = new Schema(
    {
        first: {
            type: String
        },

        last: {
            type: String
        },

        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        } 
    }
)

const User = model('User', userSchema)
module.exports = User