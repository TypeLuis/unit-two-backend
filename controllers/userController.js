const models = require('../models')

const userController = {}


userController.newUser = async (req,res)=>{

    try{
  
      const user = await models.user.create({
        userName: req.body.userName,
        password: req.body.password
      })
  
      res.json({message: 'ok', user})
  
    }
  
    catch(error){
        console.log(error)
      res.status(400).json({error: 'userName already taken'})
    }
  
}

userController.login = async (req,res)=>{
    try{
  
      const user = await models.user.findOne({where: {userName: req.body.userName} })
  
      if(user.password === req.body.password){
        res.json({message: 'login successful', user})
      }
      else{
        res.status(401).json({error: 'wrong password'})
      }
  
  
    }
    catch(error){
      res.status(400).json({error: 'login failed'})
    }
  
}


userController.userSearch = async (req, res)=>{

  console.log(req)
  try{
    const user = await models.user.findOne({where: {userName: req.body.userName} })
    let posts = await user.getPosts()
    res.json(posts)
  }

  catch(error){
    console.log(error)
    res.status(400).json({error: 'user not found'})
  }
}


// finds if username exist when form is typed
userController.findProfile = async (req, res)=>{

    try{
      const user = await models.user.findOne({where: {userName: req.headers.userName} })
  
      if (user === null){
        res.status(401).json({error: 'user not found'})
      }
      else{
        res.json({message: 'user looked up sucessfully', user})
      }
    }
  
    catch(error){
      console.log(error)
      res.status(400).json({error: 'user not found'})
    }
}


//function that user creates post
userController.userCreatePost = async(req, res)=>{ 

    try{
        const user = await models.user.findOne({where: {id: req.params.userId} })

        const userPost = await user.createPost({
            post: req.body.post
        })

        res.json({message: 'post created sucessfully', userPost})

        // let post = await models.post.create({
        //     post: req.body.post
        // })
        // let join = user.addPost(post)
        // res.json(join)
    }
    catch(error){
      console.log(error)
        res.status(400).json({error: 'user not logged'})
    }


}


//function that gets all post from user
userController.userGetPosts = async(req, res)=>{

    try{
        const user = await models.user.findOne({where: {id: req.headers.authorization} })
        let posts = await user.getPosts()
        res.json(posts)
    }

    catch(error){
        res.status(400).json({error: error})
    }
}


//function that deletes user post
userController.userDeletePost = async (req, res)=>{

    try{
        const user = await models.user.findOne({where: {id: req.headers.authorization} })
        const post = await models.post.findOne({where: {id: req.params.id} })

        if(user.id === post.userId){
            const removePost = await post.destroy()
            res.json({message: 'user post deleted sucessfully', removePost})
        }

    }

    catch(error){
      console.log(error)
        res.status(400).json({error: error})
    }

}



/// funxtion that updates user post
userController.userUpdatePost = async(req, res)=>{

    try{
        const user = await models.user.findOne({where: {id: req.headers.authorization} })
        const post = await models.post.findOne({where: {id: req.params.id} })

        if(user.id === post.userId){
            let update = req.body
            const updatePost = post.update(update)
            res.json({update: updatePost})
        }
    }

    catch(error){
        res.status(400).json({error: error})
    }


}







module.exports = userController