const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema(
    {
        id: {
            type: Number
        },
        username: {
            type: String,
        },
        displayName: {
            type: String,
        },
        provider: {
            type: String,
        },
        profile_image: {
            type: String,
        },
        thumbnail_image: {
            type: String,
        },
        accessToken: {
            type: String,
        },
        refreshToken: {
            type: String
        }
    },
    { versionKey: false }
)

module.exports = mongoose.model("user", userSchema)
