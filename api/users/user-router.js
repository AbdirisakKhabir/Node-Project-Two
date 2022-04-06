const express = require('express');

// You will need `users-model.js`
// The middleware functions also need to be required

const userModel = require('./user-model')

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await userModel.get(req.query)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({message: `Failed to get users ${error}` })
  }
});

router.get('/:id', validateUserId, async(req, res) => {
  // RETURN THE USER OBJECT
    // this needs a middleware to verify user id
  try {
    const user = await userModel.getById(req.params.id)
    if(user){
      res.status(200).json(user)
    } else{
      res.status(404).json({message:'Failed to get user'})
    }
  
    
  }
  catch (error) {
    res.status(500).json({message:'could not get One User'})
  }
 


});

router.post('/', validatePost, async(req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT

  // this needs a middleware to check that the request body is valid
  try {
    const user = await userModel.insert(req.body) 
    if(user){
      res.status(200).json(user)
    }else{
      res.status(404).json({message:'Failed To Add New User'})
    }
    
  } catch (error) {
    res.status(500).json({message:'Could not Add New User'})
  }
 
});

router.put('/:id',validateUserId, validatePost, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const post = await userModel.update()
    if(post) {
      res.status(200).json(post)
    }else{
      res.status(404).json({message:'Failed to update User'})
    }
    
  } catch (error) {
    res.status(500).json({message:'Could Not update User'})
  }
});

router.delete('/:id',validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const post = await userModel.remove(req.params.user_id)
  if(post) {
    res.status(200).json(post)
  }else{
    res.status(404).json({message:'Failed to Delete User'})
  }
} catch (error) {
  res.status(500).json({message:'Could Not delete User'})
}
});


// do not forget to export the router
module.exports = router;