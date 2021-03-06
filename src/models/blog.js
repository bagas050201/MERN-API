const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema dibawah didapat dari controllers.blog
const blogPost = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    author:{
        type:Object,
        required:true,
    }
},{
    //generate fungsi create at and update at
    timestamps:true
});

module.exports = mongoose.model('blogPost', blogPost);