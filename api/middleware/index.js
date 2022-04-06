  function validateUserId(req, res, next) {
      // DO YOUR MAGIC
      const userPosts = req.params.user_id;
      if(!userPosts){
        return res.status(400).json({ message: 'User Id is Required' });
      }
      next(); 
    
    }
  
  
    function validateUser(req, res, next) {
      // DO YOUR MAGIC
      const id = req.body.id;
  
      if(!id) {
          return res.status(400).json({ message: 'name Is Required' });
      }
  
      next();
    }
  
  
  function validatePost(req, res, next) {
      // DO YOUR MAGIC
      const text = req.body.text;
  
      if(!text) {
          return res.status(400).json({ message: 'Post Is Required' });
      }
  
      next();
    };
  
  
    
  
    
    // do not forget to expose these functions to other modules
   
  
  
  
  // do not forget to expose these functions to other modules
  module.exports = {
    validateUserId,
    validateUser,
    validatePost
  }