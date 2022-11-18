
const express = require('express');
const Post = require("../models/post");
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const { v4: uuidv4 } = require('uuid')

// const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint,
//   credentials: {
//     accessKeyId: 'DO00NP8HKYPAADAX4CRP',
//     secretAccessKey: 'meYUTXAbP67jEXQsc289rQXXf0KzYL/lvtAwbvUbARA',
//   },
// });




module.exports.login_get = async (req, res) => {
  res.send("Signup")
}
module.exports.login_post = async (req, res) => {
  const name = req.body.name
  const password = req.body.password
  if (name === "admin" && password === "admin") {
    await res.cookie('admin', "admin", { httpOnly: true })
    await res.send({"message":"Logged In"})
    return
  }
  await res.send({"message":"Failed to Access"})
}
module.exports.profile_get = async (req, res) => {
  const token=req.cookies.admin
  console.log(token)
  if(token===undefined){
    await res.send({"message":"Failed to Access"}) 
    return 
  }
  res.send("admin profile")
}
module.exports.allpost_get = async (req, res) => {
  if(req.cookies.admin===undefined){
    await res.send({"message":"Failed to Access"})
    return  
  }
  const post= await Post.find({})
  res.json(post)
}
module.exports.deletepost_get = async (req, res) => {
  if(req.cookies.admin===undefined){
    await res.send({"message":"Failed to Access"})  
    return
  }
  try {
    const id=req.params.id;
    await Post.findByIdAndDelete(id)
    return res.status(200).json({"message":"Deleted Post"});
  } catch (err) {
    return res.status(400).send(e.toString());
  }
}

module.exports.logout_get = async (req, res) => {
    await res.clearCookie('admin')
    return res.status(200).json({"message":"logged out"});
}