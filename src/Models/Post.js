const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Post = model("Post", PostSchema);

module.exports = Post;
