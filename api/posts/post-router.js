const express = require('express');

// You will need `posts-model.js`
// The middleware functions also need to be required

const {validateUserId }= require('../middleware/index')
const {validatePost} = require('../middleware/index');

const postsModel = require('./post-model');
const userModel = require('../users/user-model')

const router = express.Router();

router.get('/', async (req, res) => {
    // RETURN AN ARRAY WITH ALL THE POSTS
   
      try{
const posts = await postsModel.get(req.query)
res.status(200).json(posts)
      }
      catch(err){
res.status(500).json({message: "Failed to get all Posts"})
      }
    
  });

  // Get single Post
  router.get('/:id', async (req, res) => {
    // RETURN THE POST OBJECT
    try{
    
      const post = await postsModel.getById(req.params.id)
      if(post){
        
        res.status(200).json(post);
      }else{
        res.status(404).json({message: 'Post Not Found'})
      }
    }
    catch(err){
      res.status(500).json({message:'Failed To get Post'})
    }
  });

//Get User Posts
  router.get('/:id/posts', validateUserId , async (req, res) => {
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
    try{
      const posts = await userModel.getUserPosts(req.params.id);
      if(posts){
        res.status(200).json(posts)
      }
    }
    catch(err) {
      res.status(500).json({ message: `Failed to Get User Posts' ${err}`});
  }
  });

//   //Add New Post
  router.post('/:id/posts',validatePost, async (req, res) => {
    // RETURN THE NEWLY CREATED USER POST
      // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    try{
      const post = await postsModel.insert(req.body, req.params.user_id );
      if(post){
        
        res.status(200).json(post)
      }else{
        res.status(404).json({ message: 'Post Not Found' });
      }

    }
    catch{
      res.status(500).json({ message: 'Failed to Add New Posts' });
    }
 
  });

//Update Post
   router.put('/:id', validatePost, async (req, res) => {
    // RETURN THE FRESHLY UPDATED POST OBJECT
    // and another middleware to check that the request body is valid
    try {
    const post = await postsModel.update(req.params.user_id)
    if(post){
      res.status(200).json(post)
    }
    else{
      res.status(404).json({message:'Post Update not Found'})
    }
  }
  catch(err){
    res.status(500).json({ message: `Failed to Update Post ${err}` });
  }
  });

 //Delete Post
    router.delete('/:id',async(req, res) => {
    // RETURN DELETED POST OBJECT
    try{
      const post = await postsModel.remove(req.params.id)
      if (post) {
        res.status(200).json(post)
      }
      else{
        res.status(404).json({message:'failed to Delete Post'})
      }
    }
    catch(err){
      res.status(500).json({message:'could Not delete post'})
    }
  });


  module.exports = router;