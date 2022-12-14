const mongoose = require("mongoose");
const Post = mongoose.model(
    "Post",
    mongoose.Schema({
        name: { type: String },
        pic:{type: String},
        percentageWaste:{type: Number},
        locality: { type: String },
        city: { type: String },//0 for user and 1 for worker
        pin: { type: String },
        state: { type: String },
        country:{type: String},
        worker:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }],
    })
);
module.exports = Post;
