  function validateUserId(req, res, next) {
      // DO YOUR MAGIC
      const id = req.params.id;
      if(!id){
        return res.status(400).json({ message: 'User Id is Required' });
      }
      next(); 
    
    }
  
  
    function validateUser(req, res, next) {
      // DO YOUR MAGIC
      const name = req.body.name;
  
      if(!name) {
          return res.status(400).json({ message: 'name Is Required' });
      }
  
      next();
    }
  
  
  function validatePost(req, res, next) {
      // DO YOUR MAGIC
      const text = req.body.text;
      const userId = req.body.user_id;
      // const myId = req.params.id;
  
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