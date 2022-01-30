const models = require('../models')

const domController = {}

domController.createBg = async (req,res)=>{
    try{
        const user = await models.user.findOne({where: {id: req.headers.authorization} })
        createDom = user.createDom({
            post: 'SlateGray',
            page: 'BlueViolet',
            video: 'Aqua',
            font: "'Lucida Console', 'Courier New', monospace",
            body: "skyblue"

        })
        res.json({message: 'ok', createDom})

    }
    catch(error){
        console.log(error)
        let message = error
        res.status(400).json(message)
    }
}

domController.domUpdate = async(req, res)=>{

    try{
        const user = await models.user.findOne({where: {id: req.headers.authorization} })
        const dom = await models.dom.findOne({where: {userId: user.id} })

        let update = req.body
        const updateDom = await dom.update(update)
        res.json({update: updateDom})

    }

    catch(error){
        console.log(error)
        res.status(400).json({error: error})
    }
}

domController.getDom = async(req, res)=>{

    try{
        const user = await models.user.findOne({where: {id: req.headers.authorization} })

        let dom = await user.getDom()
        res.json({dom})

    }

    catch(error){
        console.log(error)
        res.status(400).json({error: error})
    }
}

module.exports = domController