const models = require('../models')

const videosController = {}


//add a video and create de association with user

videosController.userCreateVideo = async(req, res)=>{ 

    try{
        const user = await models.user.findOne({where: {id: req.params.userId} })

        const userVideo = await models.video.create({
            videoLink:req.body.videoLink
        })
        
        await user.addVideos(userVideo)
        await res.json(userVideo)
    }
    catch(error){
        console.log(error)
        res.status(400).json({error: 'video not loaded'})
    }


}

//function to delete a video if the user is logged in

videosController.userDeleteVideo = async (req, res)=>{

    try{
        const user = await models.user.findOne({where: {id: req.headers.authorization} })
        const video = await models.video.findOne({where: {id: req.params.id} })

        if(user.id === video.userId){
            const removeVideo = await video.destroy()
            res.json({message: 'user post deleted sucessfully', removeVideo})
        }

    }

    catch(error){
      console.log(error)
        res.status(400).json({error: error})
    }

}

videosController.userGetVideo = async(req, res)=>{

    try{
        const user = await models.user.findOne({where: {id: req.headers.authorization} })
        let videos = await user.getVideos()
        res.json(videos)
    }

    catch(error){
        res.status(400).json({error: error})
    }

}



module.exports = videosController